import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Stduents = () => {
	const [query, setQuery] = useState("");

	const [students, setStudents] = useState([]);

	useEffect(() => {
		const getStudents = async () => {
			const res = await axios.get(`http://localhost:3001/students`);
			console.log(res.data);
			setStudents(res.data);
		};

		getStudents();
	}, []);

	return (
		<div className=" bg-primary col-span-5 py-8 px-16 md:px-8 sm:px-4 ">
			<div className="flex justify-between sm:flex-col flex-wrap gap-4 border-b-2 border-b-black pb-8">
				<h1 className="text-4xl font-bold ">Students</h1>
				<input
					onChange={e => setQuery(e.target.value.toLowerCase())}
					className=" rounded-md w-1/2 md:w-full border-2  border-gray-400 px-4 py-2 focus:outline-none md:order-3"
					type="text"
				/>
				<Link
					to={"/admin/addStudent"}
					className=" px-4 py-2 bg-sec_dark text-white rounded-md md:order-2"
				>
					Add Student
				</Link>
			</div>
			<div className="grid grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 mt-10">
				{students
					?.filter(s => s.name.toLowerCase().startsWith(query))
					.map(student => (
						<Link
							key={student.id}
							className=""
							to={`/admin/students/${student.id}`}
						>
							<div className=" bg-primary shadow-md rounded-md  p-4 flex basis-10 justify-between border-2 border-gray-400">
								<div>
									<h1 className="text-xl font-bold ">{student.name}</h1>
									<p className="text-gray-400">{student.email}</p>
								</div>
							</div>
						</Link>
					))}
			</div>
		</div>
	);
};

export default Stduents;
