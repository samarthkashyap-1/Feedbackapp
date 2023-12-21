import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import teacherService from "../../services/teacherService";
import helper from "../../services/helper";

const AddTeacher = () => {
	const [assignedStudents, setassignedStudents] = useState([]);
	const [student, setStudent] = useState("");
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
			await teacherService.createTeacher({ ...data, assignedStudents },helper.extractToken());
			alert("Teacher added successfully");
			setassignedStudents([]);
			reset();
			navigate(-1);
		} catch (error) {
			alert(error.response.data.message);
		}
	};

	const assignStudent = () => {
		if (student.trim() === "") return;
		setassignedStudents([...assignedStudents, student]);
		setStudent("");
	};

	const handleStudentDelete = e => {
		const index = e.target.id;
		const newStudents = assignedStudents.filter((s, i) => i != index);
		setassignedStudents(newStudents);
	};

	return (
		<>
			<div className="col-span-5 p-4 h-full  rounded-md">
				<div className="flex justify-between items-center border-b-2 border-b-black py-4 px-10">
					<h1 className="text-4xl font-bold ">Teacher Details</h1>
				</div>
				<div className="grid grid-cols-2 my-4 gap-6">
					<div className="px-10 border-r-2">
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
										placeholder="Enter teacher's name"
										required
										type="text"
										id="name"
										className="w-full outline-none  border-2  focus:outline-none p-3 rounded-lg text-sm "
									/>
									{errors.name && (
										<p className="text-sm font-semibold text-red-600">
											{errors.name.message}
										</p>
									)}
								</div>
								<div className="flex flex-col">
									<label className="font-semibold" htmlFor="phone">
										Phone Number
									</label>
									<input
										id="phone"
										{...register("phone", {
											required: "Phone Number is required.",
										})}
										placeholder="Enter teacher's phone number"
										required
										type="text"
										className="w-full outline-none border-2  focus:outline-none p-3 rounded-lg text-sm "
									/>
									{errors.phone && (
										<p className="text-sm font-semibold text-red-600">
											{errors.phone.message}
										</p>
									)}
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
										placeholder="Enter the teacher's email address"
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
								<div className="flex flex-col">
									<label className="font-semibold" htmlFor="password">
										Password
									</label>
									<input
										id="password"
										{...register("password", {
											required: "Password is required",
											minLength: { value: 8, message: "Too small" },
										})}
										placeholder="Enter the password"
										required
										type="text"
										className="w-full outline-none border-2  focus:outline-none p-3 rounded-lg text-sm "
									/>
									{errors.password && (
										<p className="text-sm font-semibold text-red-600">
											{errors.password.message}
										</p>
									)}
								</div>
							</form>
						</div>
					</div>
					<div className="px-10">
						{/* assign student section */}
						<div className="flex justify-between">
							<h1 className="text-2xl ">Assigned students</h1>
						</div>
						<div className="">
							<div className="flex mt-4 gap-4">
								<input
									id="add-student"
									placeholder="Enter student's name"
									value={student}
									onChange={e => setStudent(e.target.value)}
									className=" flex-grow outline-none border-2  focus:outline-none p-3 rounded-lg text-sm "
									type="text"
								/>
								<button
									onClick={assignStudent}
									className="px-4 py-2 bg-sec_dark text-white rounded-md"
								>
									Add Student
								</button>
							</div>
							<div>
								<ul>
									{assignedStudents.map((s, i) => {
										return (
											<li
												key={i}
												className="flex justify-between items-center mt-4"
											>
												<div className="flex items-center gap-4">
													<p className="text-lg font-semibold">{s}</p>
												</div>
												<button
													id={i}
													onClick={handleStudentDelete}
													className="p-2 bg-sec_dark text-white rounded-md text-xs"
												>
													Remove
												</button>
											</li>
										);
									})}
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div className="col-span-5 flex justify-center items-center mt-10">
					<button
						onClick={handleSubmit(onSubmit)}
						className="w-1/4 p-4 text-xl font-bold bg-sec_dark text-white rounded-md hover:scale-105 transition-all duration-150"
					>
						Add Teacher
					</button>
				</div>
			</div>
		</>
	);
};

export default AddTeacher;
