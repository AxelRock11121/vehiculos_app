import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginFrom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <Router>
       <Routes>
       <Route path="/login" element={<LoginForm />} />
        <Route path="/">
        </Route>
        </Routes>
    </Router>
  );
}

export default App;
