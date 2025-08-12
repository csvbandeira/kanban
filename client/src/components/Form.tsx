import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
		<form ref={formRef} className="h-3/4 w-1/2 bg-white rounded-4xl">
			<header className="h-1/5 w-full flex justify-center items-end p-">
				<span className="text-4xl text-purple-700 font-extrabold">LOGIN</span>
			</header>
			<main className="h-3/5 w-full flex flex-col justify-evenly items-center py-4 px-12">
				<label
					className="h-2/10 w-full flex flex-col p-2 transition-all rounded-2xl hover:bg-gray-50"
					htmlFor="name"
				>
					<span className="text-lg text-black font-semibold">Name</span>
					<input
						className="w-full h-full px-1 border-b-1 outline-none"
						id="name"
						name="name"
						type="text"
						placeholder="Insert username"
					/>
				</label>
				<label
					className="h-2/10 w-full flex flex-col p-2 transition-all rounded-2xl hover:bg-gray-50"
					htmlFor="password"
				>
					<span className="text-lg text-black font-semibold">Password</span>
					<input
						className="w-full h-full px-1 border-b-1 outline-none"
						id="password"
						name="password"
						type="text"
						placeholder="Insert password"
					/>
				</label>
			</main>
			<footer className="h-1/5 w-full flex flex-col justify-around items-center p-4">
				<button
					className="bg-purple-700 text-white font-bold h-2/5 w-1/2 rounded-xl outline-none transition-all hover:cursor-pointer hover:bg-purple-800"
					type="button"
					onClick={handleSubmit}
				>
					SEND
				</button>
				<Link
					className="text-md hover:underline"
					to={{ pathname: '/recover-password' }}
				>
					Recover password
				</Link>
			</footer>
		</form>
	);
};

export default Form;
