import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import useLogin from '../hooks/useLogin';



function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = () => {
    // Navigate to forgot password page
    navigate('/forgot-password');
  };

  const bgStyle = {
    backgroundImage: "url('https://i.postimg.cc/3JQQwnwb/Screenshot-339.png')",
  };

  const { loading, login } = useLogin();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await login(email,password)
  };

  return (
    <div className="App1" style={bgStyle}>
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="form-container bg-light p-4 rounded shadow" style={{ maxWidth: '400px', opacity: '0.9' }}>
          <div className="form-header text-center mb-4">
            <h2>Welcome to Chit-Chat</h2>
            <p>Signin to Continue</p>
          </div>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3 position-relative">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FontAwesomeIcon 
                icon={showPassword ? faEyeSlash : faEye} 
                className="position-absolute password-toggle-icon" 
                style={{ right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }} 
                onClick={togglePasswordVisibility} 
              />
            </div>
            <div className="form-footer d-flex justify-content-between align-items-center mb-3">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <button type="button" className="btn btn-link p-0" onClick={handleForgotPassword}>Forgot Password?</button>
            </div>
            <button type="submit" className="btn btn-primary w-100 mb-3">Login</button>
          </form>
          <div className="switch-form text-center">
            <p>Don't have an account? <button onClick={() => navigate('/signup')} className="btn btn-link p-0">Signup</button></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
