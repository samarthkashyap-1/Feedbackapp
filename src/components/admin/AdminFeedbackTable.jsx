import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import feedbackService from "../../services/feedbackService";
import helper from "../../services/helper";

// eslint-disable-next-line react/prop-types
const FeedbackTable = ({ setfeedback }) => {
	const [feedbacks, setFeedbacks] = useState([]);
	const [counter, setCounter] = useState(0);
	const [loader, setLoader] = useState(false);
	const [update, setUpdate] = useState();

	const [filter, setFilter] = useState({
		teacherName: "",
		student: "",
		date: "",
	});

	const filterFeedbacks = () => {
		console.log(filter);

		const filteredFeedbacks = feedbacks.filter(feedback => {
			return (
				feedback.teacherName.toLowerCase().startsWith(filter.teacherName) &&
				feedback.student.toLowerCase().startsWith(filter.student)
			);
		});

		if (filter.date) {
			const filteredFeedbacksByDate = filteredFeedbacks.filter(
				feedback => feedback.createdAt === convertDateFormat(filter.date),
			);
			return filteredFeedbacksByDate;
		}

		console.log(filteredFeedbacks);
		return filteredFeedbacks;
	};

	const ActionButtons = ({ params }) => {
		return (
			<div className="flex  w-fit  gap-2">
				<button
					className="bg-green-500 text-white px-2  rounded-md w-fit "
					onClick={() => {
						setUpdate(params);
					}}
				>
					Edit
				</button>
				<button
					className="bg-red-500 text-white px-2  rounded-md w-fit "
					onClick={async () => {
						if (confirm("Are you sure you want to delete this feedback?")) {
							try {
								await feedbackService.deleteFeedback(params.id,helper.extractToken());
								alert("Feedback Deleted");
								setCounter(counter + 1);
							} catch (error) {
								alert("Error deleting feedback");
							}
						}
					}}
				>
					Delete
				</button>
			</div>
		);
	};

	function convertDateFormat(inputDate) {
		// Create a new Date object from the input string
		const dateObject = new Date(inputDate);

		// Extract day, month, and year components
		const day = String(dateObject.getUTCDate()).padStart(2, "0");
		const month = String(dateObject.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
		const year = String(dateObject.getUTCFullYear()).slice(-2); // Get the last two digits of the year

		// Concatenate the components to form the DDMMYY format
		const result = `${day}/${month}/${year}`;

		return result;
	}

	const converter = feedbacks => {
		const data = feedbacks
			.map(row => {
				return {
					...row,
					createdAt: convertDateFormat(row.createdAt),
					updatedAt: convertDateFormat(row.updatedAt),
				};
			})
			.toReversed();
		setFeedbacks([...data]);
		setfeedback([...data]);
	};

	useEffect(() => {
		const getFeedbacks = async () => {
			try {
				const { data } = await feedbackService.getAllFeedbacks(helper.extractToken());
				console.log(data);
				converter(data);
			} catch (error) {
				console.log(error);
			}
		};
		getFeedbacks();
	}, [counter]);

	const columnDefs = [
		{ headerName: "Teacher Name", field: "teacherName", width: 150 },
		{ headerName: "Student", field: "student", width: 150 },
		{ headerName: "Topic", field: "topic", width: 150 },
		{ headerName: "Created At", field: "createdAt", width: 150 },
		{ headerName: "Updated At", field: "updatedAt", width: 150 },
		{ headerName: "Weekday", field: "weekday", width: 125 },
		{ headerName: "Month", field: "month", width: 125 },
		{ headerName: "Subject", field: "subject", width: 125 },
		{ headerName: "Duration", field: "duration", width: 125 },
		{ headerName: "Test Score", field: "testScore", width: 125 },

		{
			headerName: "Feedback",
			field: "feedback",
			wrapText: true,
			width: 500,
			autoHeight: true,
		},
		{
			headerName: "Actions",
			field: "actions",
			cellRenderer: params => <ActionButtons params={params.data} />,

			width: 200,
		},
	];

	const defaultColDef = {
		sortable: true,
		filter: true,
	};

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit = async data => {
		try {
			setLoader(true);
			const feedbackData = {
				teacherName: update.teacherName,
				student: data.student,
				subject: data.subject,
				topic: data.topic,
				duration: parseInt(data.duration),
				hours: data.hours,
				testScore: parseInt(data.testScore),
				feedback: data.feedback,
				updatededAt: data.updatedAt,
			};
			console.log(feedbackData);
			const postFeedback = await feedbackService.updateFeedback(
				update.id,
				feedbackData,
				helper.extractToken(),
			);
			console.log(postFeedback);
			setLoader(false);

			reset();
			setCounter(counter + 1);
			alert("Feedback Updated");
			setUpdate(null);
		} catch (error) {
			console.log(error);
			alert("Something went wrong");
		}
	};
	const Updateform = ({ data }) => {
		console.log(data);
		return (
			<>
				<form className="grid grid-cols-2 gap-6 font-primary  w-full p-10">
					<div className="flex flex-col gap-6">
						<div>
							<label className="font-semibold" htmlFor="student">
								Student Name
							</label>
							<input
								{...register("student", { required: true })}
								defaultChecked="Select Student"
								id="student"
								className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block py-3 px-6 border-r-[24px] border-transparent"
								type="text"
								defaultValue={data.student}
							/>

							{
								errors.student && (
									<p className="text-red-500">{errors.student.message}</p>
								) // error message
							}
						</div>
						<div>
							<label className="font-semibold" htmlFor="subject">
								Subject
							</label>
							<input
								{...register("subject")}
								id="subject"
								required
								className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block py-3 px-6 border-r-[24px] border-transparent focus:outline-none"
								type="text"
								defaultValue={data.subject}
							/>

							{
								errors.subject && (
									<p className="text-red-500">{errors.subject.message}</p>
								) // error message
							}
						</div>
						<div>
							<label className="font-semibold" htmlFor="topics">
								Topics Covered
							</label>
							<input
								{...register("topic")}
								id="topic"
								placeholder="Topics Covered"
								required
								type="text"
								className="w-full outline-none bg-gray-50 focus:outline-none p-3 rounded-lg text-sm border"
								defaultValue={data.topic}
							/>
							{
								errors.topic && (
									<p className="text-red-500">{errors.topic.message}</p>
								) // error message
							}
						</div>
						<div className="flex gap-6">
							<div>
								<label className="font-semibold" htmlFor="duration">
									Duration
								</label>
								<div className="flex gap-4">
									<input
										{...register("duration", {
											required: "Hours is required.",
											type: "number",
										})}
										id="hours"
										required
										placeholder="hours"
										className="w-1/2 p-2 bg-gray-50 rounded-lg  border outline-none focus:outline-none flex-grow"
										type="number"
										defaultValue={data.duration}
									/>
								</div>
								{
									errors.duration && (
										<p className="text-red-500">{errors.duration.message}</p>
									) // error message
								}
							</div>
							<div>
								<label className="font-semibold" htmlFor="test score">
									Test Score
								</label>
								<input
									{...register("testScore", {
										type: "number",
									})}
									id="testScore"
									placeholder=" Test Score"
									required
									className="w-full bg-gray-50 p-2 rounded-lg border outline-none focus:outline-none"
									type="number"
									defaultValue={data.testScore}
								/>
								{
									errors.testScore && (
										<p className="text-red-500">{errors.testScore.message}</p>
									) // error message
								}
							</div>
						</div>
					</div>
					<div>
						<label className="font-semibold" htmlFor="feedback">
							Feedback
						</label>
						<textarea
							{...register("feedback", {
								required: "Feedback is required.",
								type: "text",
							})}
							placeholder="Submit your feedback here"
							className="border-2 border-gray-00 w-full p-4 focus:outline-none bg-gray-50 rounded-lg"
							id="feedback"
							cols="30"
							rows="12"
							defaultValue={data.feedback}
						></textarea>
						{
							errors.feedback && (
								<p className="text-red-500">{errors.feedback.message}</p>
							) // error message
						}
					</div>
				</form>
				<div className="flex">
					<button
						onClick={handleSubmit(onSubmit)}
						className={`bg-sec_dark w-1/5 rounded-md p-2 mx-auto  text-white font-semibold ${
							loader ? " cursor-not-allowed" : " cursor-pointer"
						}}`}
						type="submit"
						disabled={loader}
					>
						{" "}
						Submit{" "}
					</button>
				</div>
			</>
		);
	};

	return (
		<>
			<div className="">{update && <Updateform data={update} />}</div>
			<div className="flex my-4 gap-10">
				<h1>Filters</h1>
				<input
					onChange={e => {
						setFilter({ ...filter, teacherName: e.target.value.toLowerCase() });
					}}
					value={filter.teacherName}
					type="text"
					placeholder="Search by Teacher name"
					className=" border-b-2 w-1/6  focus:outline-0"
				/>
				<input
					onChange={e => {
						setFilter({ ...filter, student: e.target.value.toLowerCase() });
					}}
					value={filter.student}
					type="text"
					placeholder="Search by Student name"
					className=" border-b-2 w-1/6  focus:outline-0"
				/>
				<input
					onChange={e => {
						setFilter({ ...filter, date: e.target.value.toLowerCase() });
					}}
					max={new Date().toISOString().split("T")[0]}
					value={filter.date}
					type="date"
					placeholder="Filter by date"
					className="border-b-2  focus:outline-none"
				/>
				<button
					onClick={() => {
						setFilter({
							teacherName: "",
							student: "",
							date: "",
						});
					}}
					className="bg-red-500 text-white px-2  rounded-md w-fit "
				>
					Reset Filters
				</button>
			</div>
			<div className="ag-theme-alpine h-screen w-full">
				<AgGridReact
					rowData={
						// eslint-disable-next-line react/prop-types
						filterFeedbacks()
					}
					columnDefs={columnDefs}
					defaultColDef={defaultColDef}
					pagination={true}
					paginationPageSize={15}
				/>
			</div>
			{/* <ActionButtons/> */}
		</>
	);
};

export default FeedbackTable;
