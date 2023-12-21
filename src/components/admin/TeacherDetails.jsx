/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../assets/Loader.svg";
import teacherService from "../../services/teacherService";
import helper from "../../services/helper";

const TeacherDetails = () => {
	const { id } = useParams();
	const [loading, setLoading] = useState(false);
	const [assignedStudents, setAssignedStudents] = useState([]);
	const [student, setStudent] = useState("");
	const [teacher, setTeacher] = useState();

	console.log(id);
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		const getTeacher = async () => {
			try {
				setLoading(true);
				const res = await teacherService.getTeacherById(id, helper.extractToken());
				setTeacher(res.data);
				setAssignedStudents(res.data.assignedStudents);
				setLoading(false);
			} catch (error) {
				setLoading(false);
			}
		};
		getTeacher();
	}, [id]);

	const onSubmit = async data => {
		// combine data and assignedStudents in one object

		const newTeacher = {
			...data,
			assignedStudents,
		};

		try {
			await teacherService.updateTeacher(id, newTeacher, helper.extractToken());
			alert("Teacher details updated successfully");
			setAssignedStudents([]);
			reset();
			navigate(-1);
		} catch (error) {
			alert("Something went wrong");
			console.log(error);
		}
	};

	const handleStudentDelete = async e => {
		const index = e.target.id;
		const newStudents = assignedStudents.filter((s, i) => i != index);
		setAssignedStudents(newStudents);
	};

	const assignStudent = () => {
		if (student) {
			setAssignedStudents([...assignedStudents, student]);
			setStudent("");
		}
	};

	const setTeacherStatus = async () => {
		const currentStatus = teacher.status;
		const newStatus = currentStatus == "ACTIVE" ? "INACTIVE" : "ACTIVE";
		try {
			await teacherService.updateTeacher(id, { status: newStatus }, helper.extractToken());
			setTeacher({ ...teacher, status: newStatus });
		} catch (error) {
			console.log(error);
		}
	};

	const deleteTeacher = async () => {
		try {
			let res = confirm("Are you sure you want to delete this teacher?");
			if (!res) return;
			await teacherService.deleteTeacher(id, helper.extractToken());
			alert("Teacher deleted successfully");
			navigate(-1);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			{loading ? (
				<div className="w-full h-screen grid place-content-center">
					<img className="" src={Loader} alt="" />
				</div>
			) : (
				<>
					{teacher ? (
						<div className="col-span-5 p-4 h-full  rounded-md">
							<div className="flex justify-between items-center border-b-2 border-b-black py-4 px-10">
								<h1 className="text-4xl font-bold ">Teacher Details</h1>
								<div>
									<button
										onClick={deleteTeacher}
										className="px-4 py-2 rounded-md font-bold text-white bg-red-500 mr-4"
									>
										Delete Teacher
									</button>
									<button
										onClick={setTeacherStatus}
										className={`px-4 py-2 rounded-md font-bold text-white ${
											teacher.status == "INACTIVE"
												? "bg-red-500"
												: "bg-green-500"
										}`}
									>
										{teacher.status == "ACTIVE" && "ACTIVE"}
										{teacher.status == "INACTIVE" && "INACTIVE"}
									</button>
								</div>
							</div>
							<div className="grid grid-cols-2 my-4 gap-6">
								{/* Teacher personal details form */}
								<div className="px-10 border-r-2">
									<h1 className="text-2xl mb-6">Personal Details</h1>
									<div>
										<form
											// onSubmit={handleSubmit(onSubmit)}
											className=" flex flex-col gap-4"
										>
											<div className="flex flex-col">
												<label className="font-semibold" htmlFor="name">
													Name
												</label>
												<input
													defaultValue={teacher?.name}
													{...register("name", {
														required: "Name is required.",
													})}
													placeholder="Enter your name"
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
													defaultValue={teacher?.phone}
													{...register("phone", {
														required: "Phone Number is required.",
													})}
													placeholder="Enter phone number"
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
													defaultValue={teacher?.email}
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

											<div className="flex flex-col">
												<label className="font-semibold" htmlFor="password">
													Password
												</label>
												<input
													id="password"
													defaultValue={teacher?.password}
													{...register("password", {
														required: "Password is required",
														minLength: { value: 8, message: "Too small" },
													})}
													placeholder="Enter password"
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
								{/* Assign Students Section */}
								<div className="px-10">
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
									Update Details
								</button>
							</div>
						</div>
					) : (
						<div className="font-bold text-6xl ">
							User doesn't exist. Please check the URL
						</div>
					)}
				</>
			)}
		</>
	);
};

export default TeacherDetails;
