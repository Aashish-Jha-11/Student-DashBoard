import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Home from './components/home/Home';
import Login from './components/auth/Login';
import StudentList from './components/students/StudentList';
import StudentDetails from './components/students/StudentDetails';
import AddStudent from './components/students/AddStudent';
import ProtectedRoute from './components/common/ProtectedRoute';
import Notification from './components/common/Notification';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Navbar />
          <Notification />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route 
                path="/dashboard" 
                element={<StudentList />} 
              />
              <Route 
                path="/student/:id" 
                element={
                  <ProtectedRoute>
                    <StudentDetails />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/add-student" 
                element={
                  <ProtectedRoute>
                    <AddStudent />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;