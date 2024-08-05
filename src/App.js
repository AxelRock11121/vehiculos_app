import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes,Navigate  } from 'react-router-dom';
import LoginForm from './components/LoginFrom';
import ProtectedRoute from './components/ProtectedRoute';
import VehicleTable from './components/VehicleTable';
import VehicleForm from './components/VehiculoForm';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

function App() {
  return (
    <Router>
       <Routes>
       <Route path="/login" element={<LoginForm />} />
       <Route path="/vehicles" element={<ProtectedRoute element={VehicleTable} />} />
       <Route path="/saveVehicle" element={<ProtectedRoute element={VehicleForm} />} />
       <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
    </Router>
  );
}

export default App;
