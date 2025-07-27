import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';

const AppRoutes = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/home" element={<Home />} />
			</Routes>
		</Router>
	);
};

export default AppRoutes;
