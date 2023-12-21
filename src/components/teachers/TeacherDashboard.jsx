import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import back from "../../assets/back.svg";

const TeacherDashboard = () => {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (!localStorage.getItem("token")) {
			navigate("/");
		}
	}, []);
	console.log(JSON.parse(localStorage.getItem("token")));
	return (
		<div className="flex flex-col min-h-screen">
			<nav className="flex justify-between px-8 py-2 items-center bg-accent bg-sec_dark text-white">
				<div onClick={() => navigate(-1)} className="font-bold">
					{pathname == "/teacher" ? (
						<p>Dashboard</p>
					) : (
						<p className="flex items-center ">
							<img className="w-8" src={back} alt="" />
							Go Back
						</p>
					)}
				</div>
				<div className="w-10 aspect-square rounded-full bg-blue-500 ml-auto mx-10"></div>
				<button
					onClick={() => {
						localStorage.removeItem("token");
						navigate("/");
					}}
				>
					Logout
				</button>
			</nav>
			<div className="w-full  flex-grow">
				<Outlet />
			</div>
		</div>
	);
};

export default TeacherDashboard;
