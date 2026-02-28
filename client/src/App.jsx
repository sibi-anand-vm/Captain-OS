import {BrowserRouter,Navigate,Route,Routes} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import { useAuth } from './context/AuthContext';
import Loading from './components/Loading/Loading';
import Navbar from './components/Navbar/Navbar';

function App() {
  const { auth } = useAuth();
  const ProtectedRoute=({children})=>{
      if(auth.isLoading)
        return <Loading />
      return auth.isLoggedIn? children : <Navigate to="/" />
  }

  return (
    <>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          
          <Route path="/home" element={
            <ProtectedRoute>
            <HomePage />
            </ProtectedRoute>} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
