import React from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const navigate = useNavigate();

  const bgStyle = {
    backgroundImage: "url('https://i.postimg.cc/PfznKk6g/1.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  return (
    <div className="App1" style={bgStyle}>
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="form-container bg-light p-4 rounded shadow" style={{ maxWidth: '400px', opacity: '0.9' }}>
          <div className="form-header text-center mb-4">
            <h2>Forgot Password</h2>
          </div>
          <form className="form">
            <div className="form-group mb-3">
              <input type="email" className="form-control" placeholder="Enter your email to reset password" required />
            </div>
            <button type="submit" className="btn btn-primary w-100 mb-3">Send Reset Code</button>
            <button type="button" className="btn btn-secondary w-100" onClick={() => navigate('/login')}>Back to Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
