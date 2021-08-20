import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (err) => {
	const expectedError =
		err.response && err.response.status >= 400 && err.response.status < 500;
	//err.response = The request was made and the server responded with a status code that falls out of the range of 2xx
	//err.response.status >= 400 && err.response.status < 500 means Expected error
	if (!expectedError) {
		return toast.error("Sorry, something went wrong", {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: false,
			progress: undefined,
		});
	}

	return Promise.reject(err); //So it can be handle by the "local" catch block
});

export default {
	get: axios.get,
	post: axios.post,
	put: axios.put,
	delete: axios.delete,
};
