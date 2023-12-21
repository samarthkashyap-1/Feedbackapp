import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";


const AddStudent = () => {
	const [assignedStudents, setassignedStudents] = useState([]);
	const [student, setStudent] = useState({ name: "", email: " " });
	const [isOpen, setisOpen] = useState(false);
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit = async data => {
		// combine data and assignedStudents in one object
		try {
			await axios.post("http://localhost:3001/students", {
				...data,
				assignedStudents,
			});
			console.log({ ...data, assignedStudents });
			setassignedStudents([]);
			reset();
			navigate(-1);
		} catch (error) {
			alert("Something went wrong");
			console.log(error);
		}
	};

	const toggle = () => {
		setisOpen(!isOpen);
	};

	return (
		<>
			<div className="col-span-5 p-4 h-full  rounded-md">
				<div className="flex justify-between items-center border-b-2 border-b-black py-4 px-10">
					<h1 className="text-4xl font-bold ">Student Details</h1>

					<label className="relative inline-flex items-center cursor-pointer">
						<input type="checkbox" value="" className="sr-only peer" />
						<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
						<span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
							Active
						</span>
					</label>
				</div>
				<div className="w-1/2 mx-auto my-4 gap-6">
					<div className="px-10 ">
						<h1 className="text-2xl mb-6">Personal Details</h1>
						<div>
							<form className=" flex flex-col gap-4">
								<div className="flex flex-col">
									<label className="font-semibold" htmlFor="name">
										Name
									</label>
									<input
										{...register("name", {
											required: "Name is required.",
										})}
										placeholder="Enter your name"
										required
										type="text"
										id="name"
										className="w-full outline-none  border-2  focus:outline-none p-3 rounded-lg text-sm "
									/>
								</div>
								<div className="flex flex-col">
									<label className="font-semibold" htmlFor="phone">
										Phone Number
									</label>
									<input
										id="phoneNumber"
										{...register("phoneNumber", {
											required: "Phone Number is required.",
										})}
										placeholder="Enter phone number"
										required
										type="text"
										className="w-full outline-none border-2  focus:outline-none p-3 rounded-lg text-sm "
									/>
								</div>

								<div className="flex flex-col">
									<label className="font-semibold" htmlFor="email">
										E-mail
									</label>
									<input
										id="email"
										{...register("email", {
											required: "Email is required.",
											pattern: {
												value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
												message: "Email is not valid.",
											},
										})}
										placeholder="Enter the email address"
										required
										type="text"
										className="w-full outline-none border-2  focus:outline-none p-3 rounded-lg text-sm "
									/>
									{errors.email && (
										<p className="text-sm font-semibold text-red-600">
											{errors.email.message}
										</p>
									)}
								</div>
							</form>
						</div>
					</div>

					<div className="col-span-5 flex justify-center items-center mt-10">
						<button
							onClick={handleSubmit(onSubmit)}
							className=" px-4 py-2 bg-sec_dark text-white rounded-md"
						>
							Add Student
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default AddStudent;
