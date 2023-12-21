import loginImg from "../assets/login.jpg";
import { set, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import teacherService from "../services/teacherService";
import { useEffect,useState } from "react";
import adminService from "../services/adminService";
import showpass from "../assets/showpass.png";

const Login = () => {
	const [loader, setLoader] = useState(false);
	const [loginAs , setLoginAs] = useState("teacher");
	const [showpassword, setShowpassword] = useState(false);
	
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit =async data => {
		console.log(data);
		
		
			try {
				setLoader(true);
				if(loginAs === "admin"){
					const res = await adminService.adminLogin(data);
					console.log(res);
					const userData = {
						id: res.data.id,
						token : res.token,	
					}
					localStorage.setItem("token", JSON.stringify(userData));
					setLoader(false);
					alert("Login Successful");
					navigate("/admin");
					return;
				}else if(loginAs === "teacher"){
				const res = await teacherService.teacherLogin(data);
				console.log(res);
				const userData = {
					id: res.data.id,
					token : res.token,	
				}
				localStorage.setItem("token", JSON.stringify(userData));
				setLoader(false);
				alert("Login Successful");
				navigate("/teacher");
				return;
				}
			} catch (error) {
				setLoader(false);
				alert(error.response.data.message);
			}
		
	};
	
	return (
		<div className="w-screen h-screen bg-gray-100 flex justify-center items-center px-10 text-gray-600">
			<div className=" bg-gray-300 flex rounded-md border-2  border-gray-200 overflow-hidden">
				<div className="w-1/2 object-fill md:hidden">
					<img className="" src={loginImg} alt="login form image" />
				</div>
				<div className="flex-grow px-8 py-10  justify-center flex flex-col">
					<h2 className="text-5xl bold uppercase mb-6 font-extrabold ">
						Login{" "}
					</h2>
					<form
						action=""
						className="flex flex-col gap-4"
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className="flex flex-col w-full">
							<label htmlFor="email">Email</label>
							<input
								placeholder="example@mail.com"
								{...register("email", {
									required: "Email is required.",
									pattern: {
										value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
										message: "Email is not valid.",
									},
								})}
								type="text"
								name="email"
								id="email"
								className="h-10 px-4 py-2 outline-none border-none rounded-md outline-1 font-semibold outline-gray-300 "
							/>
							{errors.email && (
								<p className="text-sm font-semibold text-red-600 mt-1">
									{errors.email.message}
								</p>
							)}
						</div>
						<div className="flex flex-col">
							<label htmlFor="password">Password</label>
							<div className="flex bg-white rounded-md outline-1 h-10 outline-gray-300 ">
								<input
									{...register("password", {
										required: "Password is required",
										minLength: { value: 8, message: "Too small" },
									})}
									type={showpassword ? "text" : "password"}
									name="password"
									placeholder="********"
									id="password"
									className=" px-4 py-2 outline-none border-none w-full rounded-md outline-1 font-semibold "
								/>
								<img
									src={showpass}
									alt=""
									className="  scale-50 w-fit cursor-pointer"
									onClick={() => setShowpassword(!showpassword)}
								/>
							</div>
							{errors.password && (
								<p className="text-sm font-semibold text-red-600 mt-1">
									{errors.password.message}
								</p>
							)}
						</div>
						<div className="">
							<input
								type="radio"
								id="teacher"
								value={`WhatsApp: +91 9654388797`}
								checked={loginAs === `teacher`}
								onChange={() => setLoginAs("teacher")}
								className="mr-2"
							/>
							<label htmlFor="teacher" className="mr-4">
								Teacher
							</label>
							<input
								type="radio"
								id="admin"
								value="For classroom only"
								checked={loginAs === `admin`}
								onChange={() => setLoginAs("admin")}
								className="mr-2"
							/>
							<label htmlFor="admin">Admin</label>
						</div>
						<div className="">
							<button
								className={`w-full rounded-md bg-blue-400 hover:bg-blue-500 py-2 font-semibold text-lg text-white duration-150 ease-in transition-colors ${
									loader ? "cursor-not-allowed" : " cursor-pointer"
								}`}
								type="submit"
								disabled={loader}
							>
								Login
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
