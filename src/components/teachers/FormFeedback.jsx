import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import feedbackService from "../../services/feedbackService";
import helper from "../../services/helper";


const FormFeedback = ({ teacher }) => {
	const [students, setStudents] = useState(teacher.assignedStudents);
	const [loader, setLoader] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	useEffect(() => {
		setStudents(teacher.assignedStudents);
	}, [teacher]);

	console.log(teacher);

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
			alert("Feedback Submitted");
			console.log(postFeedback);
			setLoader(false);

			reset();
		} catch (error) {
			alert(error.response.data.message);
			console.log(error);
			alert("Something went wrong");
			setLoader(false);
		}
	};

	const subjects = [
		"Select Subject",
		"Maths",
		"Science",
		"English",
		"Hindi",
		"Social Science",
	];
	// useEffect(() => {
	// 	if (!localStorage.getItem("token")) {
	// 		navigate("/");
	// 	}
	// }, []);
	return (
		<div className="flex flex-col items-center rounded-lg  justify-center flex-grow-1 py-4 text-black">
			<form className="grid grid-cols-2 gap-6 font-primary  w-full p-10">
				<div className="flex flex-col gap-6">
					<div>
						<label className="font-semibold" htmlFor="student">
							Student Name
						</label>
						<select
							{...register("student", { required: true })}
							defaultChecked="Select Student"
							id="student"
							className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block py-3 px-6 border-r-[24px] border-transparent"
						>
							<option
								className="text-lg"
								value="Select Student"
								key="Select Student"
							>
								Select Student
							</option>
							{students.map(student => (
								<option className="text-lg" value={student} key={student}>
									{student}
								</option>
							))}
						</select>
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
						<select
							{...register("subject")}
							id="subject"
							required
							className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block py-3 px-6 border-r-[24px] border-transparent focus:outline-none"
						>
							{subjects.map(option => (
								<option key={option.id} className="text-lg" value={option.id}>
									{option}
								</option>
							))}
						</select>
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
								Date
							</label>
							<div className="flex gap-4">
								<input
									{...register("createdAt", {
										required: "Date is required.",
										type: "date",
									})}
									id="date"
									defaultValue={new Date()}
									max={new Date().toISOString().split("T")[0]}
									required
									placeholder="date"
									className="w-1/2 p-2 bg-gray-50 rounded-lg  border outline-none focus:outline-none flex-grow"
									type="date"
								/>

								{
									errors.createdAt && (
										<p className="text-red-500">{errors.createdAt.message}</p>
									) // error message
								}
							</div>
						</div>
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
					></textarea>
					{
						errors.feedback && (
							<p className="text-red-500">{errors.feedback.message}</p>
						) // error message
					}
				</div>
			</form>
			<button
				onClick={handleSubmit(onSubmit)}
				className={`bg-sec_dark w-1/3 rounded-md p-2 text-white font-semibold ${
					loader ? " cursor-not-allowed" : " cursor-pointer"
				}}`}
				type="submit"
				disabled={loader}
			>
				{" "}
				Submit{" "}
			</button>
		</div>
	);
};

export default FormFeedback;
