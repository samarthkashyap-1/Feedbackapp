
const extractToken = () => {
        
		return {
			headers: {
				Authorization: `Bearer ${
					JSON.parse(localStorage.getItem("token")).token
				}`,
			},
		};
    }
export default {
	extractToken}