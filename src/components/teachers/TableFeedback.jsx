import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import feedbackService from "../../services/feedbackService";
import teacherService from "../../services/teacherService";
import helper from "../../services/helper";

const TableFeedback = () => {
	const [inputRow, setInputRow] = useState(false);
	const gridRef = useRef();
	const [feedbackCount, setFeedbackCount] = useState(0);
	const [loader, setLoader] = useState(false);
	const [rowData, setRowData] = useState(null);

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
				};
			})
			.toReversed();
		setRowData([...data]);
	};
	

	useEffect(() => {
		
			
		console.log(helper.extractToken());
		
		const getStudents = async () => {
			const teacher = await teacherService.getTeacherById(
				JSON.parse(localStorage.getItem("token")).id,helper.extractToken()
			);
				console.log(teacher.data)
			converter(teacher.data.feedbacks);
		};
		getStudents();
	}, [feedbackCount]);

	// Each Column Definition results in one Column.
	const [columnDefs, setColumnDefs] = useState([
		// set columns def of student, date, month, weekday, subject, topic, test score, feeback

		{ headerName: "Student", field: "student" },
		{ headerName: "Date", field: "createdAt" },
		{ headerName: "Month", field: "month" },
		{ headerName: "Weekday", field: "weekday" },
		{ headerName: "Subject", field: "subject" },
		{ headerName: "Topic", field: "topic" },
		{ headerName: "Test Score", field: "testScore" },
		{
			headerName: "Feedback",
			field: "feedback",
			wrapText: true,
			width: 500,
			autoHeight: true,
		},
	]);

	// DefaultColDef sets props common to all Columns
	const defaultColDef = useMemo(
		() => ({
			width: 170,
			sortable: true,
			filter: true,
			// resizable: true,
			// editable: true,
		}),
		[],
	);

	const onBtnExport = useCallback(() => {
		const params = {
			fileName: "Feedback data.csv",

			columnKeys: [
				"student",
				"date",
				"month",
				"weekday",
				"subject",
				"topic",
				"testScore",
				"feedback",
			],

			sheetName: "Feedback Data",
		};
		gridRef.current.api.exportDataAsCsv(params);
	}, []);

	const addRow = () => {
		setInputRow(!inputRow);
	};

	// Example of consuming Grid Event

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
				student: data.student,
				subject: data.subject,
				topic: data.topic,
				duration: parseInt(data.duration),
				hours: data.hours,
				testScore: parseInt(data.testScore),
				feedback: data.feedback,
				createdAt: data.createdAt,
			};
			console.log(feedbackData);
			const postFeedback = await feedbackService.createFeedback(feedbackData,helper.extractToken());
			console.log(postFeedback);
			setLoader(false);
			setFeedbackCount(prevCount => prevCount + 1);
			reset();
			setInputRow(!inputRow);
		} catch (error) {
			console.log(error);
			alert("Something went wrong");
		}
	};

	return (
		<div>
			<div className="flex justify-end">
				<button
					className="bg-sec_dark mr-5 my-1.5 w-fit rounded-md p-2 text-white font-semibold"
					onClick={onBtnExport}
				>
					Download CSV
				</button>
				<button
					className="bg-sec_dark mr-5 my-1.5 w-fit rounded-md p-2 text-white font-semibold"
					onClick={addRow}
				>
					New Feedback
				</button>
			</div>

			<div className="">
				<form
					onSubmit={handleSubmit(onSubmit)}
					className={`px-2 ${
						inputRow ? "h-16" : "h-0"
					} transition-all duration-300 ease-in-out `}
				>
					<div className="grid grid-cols-8 gap-4 overflow-auto border-2 border-black rounded-lg px-3 py-2">
						<input
							type="text"
							placeholder="Student Name"
							className="border rounded-md p-2"
							{...register("student", { required: true })}
						/>
						<input
							type="date"
							placeholder="date"
							className="border rounded-md p-2"
							{...register("createdAt", { required: true, type: "date" })}
						/>
						<input
							type="text"
							placeholder="Subject"
							className="border rounded-md p-2"
							{...register("subject", { required: true })}
						/>
						<input
							type="text"
							placeholder="Topic"
							className="border rounded-md p-2"
							{...register("topic", { required: true })}
						/>
						<input
							type="number"
							placeholder="Duration (in Hours)"
							className="border rounded-md p-2"
							{...register("duration", { required: true, type: "number" })}
						/>
						<input
							type="number"
							placeholder="Test Score"
							className="border rounded-md p-2"
							{...register("testScore", { required: true, type: "number" })}
						/>
						<input
							type="text"
							placeholder="Feedback"
							className="border rounded-md p-2"
							{...register("feedback", { required: true })}
						/>
						<input
							type="submit"
							value="Submit"
							className={`border rounded-md p-2 bg-sec_dark text-white font-semibold ${
								loader ? "cursor-not-allowed" : "cursor-pointer"
							}`}
							disabled={loader}
						/>
					</div>
				</form>
			</div>
			<div
				className="ag-theme-alpine"
				style={{ width: "100%", height: "500px" }}
			>
				<AgGridReact
					ref={gridRef}
					rowData={rowData}
					columnDefs={columnDefs}
					defaultColDef={defaultColDef}
					animateRows={true}
					rowHeight={120}
				/>
			</div>
		</div>
	);
};

export default TableFeedback;
