import Form from '../components/Form';

const Login = () => {
	return (
		<div className="h-screen w-full flex justify-center items-center">
			<div className="h-full w-1/2 bg-purple-700"></div>
			<div className="h-full w-1/2 flex justify-center items-center bg-amber-50">
				<Form />
			</div>
		</div>
	);
};

export default Login;
