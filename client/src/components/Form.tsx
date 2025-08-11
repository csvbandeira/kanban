import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import api from '../utils/api';

type FormMessageError = {
	message: string;
};

const Form = () => {
	const formRef = useRef<HTMLFormElement>(null);
	const navigate = useNavigate();

	const handleSubmit = async () => {
		try {
			if (!formRef.current) return;

			const formData = new FormData(formRef.current);

			const name = formData.get('name');
			const password = formData.get('password');

			const credentials = {
				name,
				password,
			};

			const authentication = await api.post('/authentication', credentials);

			if (authentication.status == 200) {
				console.log(authentication.data.message);
				return navigate('/');
			}
		} catch (err: unknown) {
			if (axios.isAxiosError<FormMessageError>(err)) {
				console.log(err.response?.data.message);
			} else {
				console.error(err);
			}
		} finally {
			if (formRef.current) return formRef.current.reset();
		}
	};

	return (
		<form className="h-3/4 w-1/2 border-2" id="myForm" ref={formRef}>
			<header className="h-1/5 w-full flex justify-center items-center p-4 hover:bg-green-400">
				<span className="text-2xl text-yellow-500 font-extrabold">LOGIN</span>
			</header>
			<main className="h-3/5 w-full flex flex-col justify-evenly items-center py-4 px-12">
				<label
					className="h-2/10 w-full flex flex-col hover:bg-amber-300"
					htmlFor="name"
				>
					<span>Name</span>
					<input
						className="w-full h-full px-1 border-b-1 outline-none"
						id="name"
						name="name"
						type="text"
						placeholder="Insert username"
					/>
				</label>
				<label
					className="h-2/10 w-full flex flex-col p-2 hover:bg-gray-300"
					htmlFor="password"
				>
					<span className="text-green-800">Password</span>
					<input
						className="w-full h-full px-1 border-b-1 outline-none"
						id="password"
						name="password"
						type="text"
						placeholder="Insert password"
					/>
				</label>
			</main>
			<footer className="h-1/5 w-full flex justify-center items-center p-4 hover:bg-green-900">
				<button
					className="bg-blue-400 text-white font-bold h-10 w-32 rounded-xl outline-none hover:cursor-pointer"
					type="button"
					onClick={handleSubmit}
				>
					SEND
				</button>
			</footer>
		</form>
	);
};

export default Form;
