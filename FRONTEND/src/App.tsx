import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Login } from './components/Login';
import { ProtectedRoute } from './components/ProtectedRoute';
import { BusListar } from './pages/BusListar';
import { MarcaListar } from './pages/MarcaListar';
import { Unauthorized } from './pages/Unauthorized';
import { Navbar } from './components/Navbar';

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				{/* Navbar estará siempre visible */}
				<Navbar />
				<Routes>
					<Route path='/login' element={<Login />} />
					<Route
						path='/bus'
						element={
							<ProtectedRoute requiredRoles={['ADMIN']}>
								<BusListar />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/marca'
						element={
							<ProtectedRoute>
								<MarcaListar />
							</ProtectedRoute>
						}
					/>
					<Route path='/unauthorized' element={<Unauthorized />} />
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
