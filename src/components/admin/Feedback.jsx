import { useState } from "react";
import FeedbackTable from "./AdminFeedbackTable";

const Feedback = () => {
	const [feedbacks, setFeedbacks] = useState([]);


	const escapeCSVValue = value => {
		if (typeof value === "string" && value.includes(",")) {
			return `"${value.replace(/"/g, '""')}"`; // Double-quote and escape double-quotes inside the string
		}
		return value;
	};

	const arrayToCSV = array => {
		const header = Object.keys(array[0]).map(escapeCSVValue).join(",");
		const rows = array.map(obj =>
			Object.values(obj).map(escapeCSVValue).join(","),
		);
		return `${header}\n${rows.join("\n")}`;
	};

	const downloadCSV = array => {
		console.log(feedbacks,"from download csv");
		const csvContent = arrayToCSV(array);
		const blob = new Blob([csvContent], { type: "text/csv" });
		const link = document.createElement("a");
		link.href = URL.createObjectURL(blob);
		link.download = "feedback.csv";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	
	return (
		<div className="col-span-5 h-full p-4">
			<div className="flex border-b-2 py-2">
				<h1 className="text-2xl  font-extrabold">Feedbacks</h1>
				<button
					onClick={() => downloadCSV(feedbacks)}
					className="px-4 py-2 bg-sec_dark text-white ml-auto rounded-md"
				>
					Download CSV
				</button>
			</div>
			<div className="mt-4">
				<FeedbackTable setfeedback={setFeedbacks} />
			</div>
		</div>
	);
};

export default Feedback;
