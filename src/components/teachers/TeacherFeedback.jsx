import { useEffect, useState } from "react";
import { Slide } from "react-awesome-reveal";
import FormFeedback from "./FormFeedback";
import TableFeedback from "./TableFeedback";
import teacherService from "../../services/teacherService";
import helper from "../../services/helper";


const TeacherFeedback = () => {
	const [activeTab, setActiveTab] = useState(1);
	const [teacher, setTeacher] = useState({
		assignedStudents: ["No Student"],
		createdAt: "2023-12-08T00:00:00.000Z",
		email: "test@gmail.com",
		id: "34ab3671-281c-40db-b901-81173149d4b6",
		name: "Test",
	});

	const handleTabClick = id => {
		setActiveTab(id);
	};
	
	useEffect(() => {
		
		const getStudents = async () => {

			const teacher = await teacherService.getTeacherById(
				JSON.parse(localStorage.getItem("token")).id,
				helper.extractToken()
			);

			setTeacher(teacher.data);
			console.log(teacher.data)
		};
		getStudents();
		
	}, []);

	return (
		<div>
			<ul className="flex w-full p-2  justify-around text-center bg-[#102542]">
				<li
					style={
						activeTab == 1
							? { backgroundColor: "white", color: "black" }
							: { backgroundColor: "#102542" }
					}
					className=" rounded-lg p-2 font-bold text-white w-1/2 cursor-pointer transition-all duration-200 ease-in"
					onClick={() => handleTabClick(1)}
				>
					Form
				</li>
				<li
					style={
						activeTab == 2
							? { backgroundColor: "white", color: "black" }
							: { backgroundColor: "#102542" }
					}
					className="bg-sec_dark rounded-lg p-2 font-bold text-white w-1/2 cursor-pointer transition-all duration-200 ease-in"
					onClick={() => handleTabClick(2)}
				>
					Excel
				</li>
			</ul>

			<div className="tab_content">
				<Slide direction="up" duration={500}>
					{activeTab === 1 && <FormFeedback teacher={teacher} />}
					{activeTab === 2 && <TableFeedback  />}
				</Slide>
			</div>
		</div>
	);
};

export default TeacherFeedback;
