import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { BusListar } from './components/BusListar';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './components/Login';

function App() {
	return (
		<>
			<AuthProvider>
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<Navigate to='/login' />} />
						<Route path='/login' element={<Login />} />
						<Route
							path='/bus'
							element={
								<ProtectedRoute role='ADMIN'>
									<div className=''>
										<Navbar />
										<BusListar />
									</div>
								</ProtectedRoute>
							}
						/>
					</Routes>
				</BrowserRouter>
			</AuthProvider>
		</>
	);
}

export default App;
