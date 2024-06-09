import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
  };

  const handleForgotPassword = () => {
    // Navigate to forgot password page
    navigate('/forgot-password');
  };

  const bgStyle = {
    backgroundImage: "url('https://i.postimg.cc/3JQQwnwb/Screenshot-339.png')",
  };

  return (
    <div className="App1" style={bgStyle}>
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="form-container bg-light p-4 rounded shadow" style={{ maxWidth: '400px', opacity: '0.9' }}>
          <div className="form-header text-center mb-4">
            <h2>Welcome to Chit-Chat</h2>
            <p>Signin to Continue</p>
          </div>
          <form className="form">
            <div className="form-group mb-3">
              <input type="email" className="form-control" placeholder="Email" required />
            </div>
            <div className="form-group mb-3 position-relative">
              <input type={showPassword ? "text" : "password"} className="form-control" placeholder="Password" required />
              <FontAwesomeIcon 
                icon={showPassword ? "fa-eye-slash" : "fa-eye"} 
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
            <div className="social-login text-center mb-3">
              <p>Or login with</p>
              <button className="btn btn-primary mr-2" onClick={() => handleSocialLogin('Facebook')}>
                <FontAwesomeIcon icon={faFacebookF} /> Facebook
              </button>
              <button className="btn btn-danger mr-2" onClick={() => handleSocialLogin('Google')}>
                <FontAwesomeIcon icon={faGoogle} /> Google
              </button>
              <button className="btn btn-info" onClick={() => handleSocialLogin('Twitter')}>
                <FontAwesomeIcon icon={faTwitter} /> Twitter
              </button>
            </div>
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
