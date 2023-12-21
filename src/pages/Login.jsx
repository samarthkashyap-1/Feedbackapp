import { useForm } from "react-hook-form";
import AdminDash from "./AdminDash";
import TeacherDashboard from "./TeacherDashboard";
import {useNavigate} from "react-router-dom"


const Login = () => {
  const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = data => {
		console.log(data)
    localStorage.setItem("user", JSON.stringify(data));
    if (data.email == "admin@gmail.com" && data.password == "admin123") {
      
      navigate("/admin")
      }
      else if (data.email == "teacher@gmail.com" && data.password == "teacher123") {
        navigate("/teacher")
        }
        else {
          return <Login/>
          };
	};
	return (
    <div className="w-screen h-screen flex justify-center items-center text-gray-600 bg-[#f1efec]">
      {/* f6f2eb */}
      <div className="container mx-auto w-1/2 flex h-1/2 bg-white rounded-md overflow-hidden shadow-sm">
        <div className="flex-1">
          <img
            className="object-cover h-full"
            src="https://img.freepik.com/free-vector/teaching-concept-illustration_114360-4063.jpg?w=2000"
            alt=""
          />
        </div>
        <div className="flex-1 flex flex-col py-8 px-6 gap-6">
          <div>
            <h2 className=" text-3xl font-bold">Log in</h2>
          </div>
          <div className="">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
              action=""
            >
              <div className="flex flex-col gap-2">
                <label className="font-bold" htmlFor="">
                  E-mail
                </label>
                <input
                  {...register("email", {
                    required: "Email is required.",
                    pattern: {
                      value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                      message: "Email is not valid.",
                    },
                  })}
                  className="h-10 px-4 py-2 outline-none border-none rounded-md outline-1 font-semibold outline-gray-300 "
                  type="email"
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="text-sm font-semibold text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-bold" htmlFor="">
                  Password
                </label>
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 8, message: "Too small" },
                  })}
                  className=" font-semibold  h-10 px-4 py-2 outline-none border-none rounded-md outline-1 outline-gray-300 "
                  type="password"
                  placeholder="Password"
                />
                {errors.password && (
                  <p className="text-sm font-semibold text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  className="w-full rounded-md bg-[#e0be83] hover:bg-sec_dark py-2 font-semibold text-lg text-white"
                  type="submit"
                  value="Submit"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
