import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;


const adminLogin = async admin => {
	const res = await axios.post(`${BASE_URL}/admin/login`, admin);
	return res.data;
};

export default {
	adminLogin,
};
