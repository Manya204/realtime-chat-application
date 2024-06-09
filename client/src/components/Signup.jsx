import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [gender, setGender] = useState('male'); // Default to male
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleSocialLogin = (provider) => {
    console.log(`Signing up with ${provider}`);
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
            <p>Signup to Continue</p>
          </div>
          <form className="form">
            <div className="form-group mb-3">
              <input type="text" className="form-control" placeholder="User Name" required />
            </div>
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
            <div className="form-group mb-3 position-relative">
              <input type={showPassword ? "text" : "password"} className="form-control" placeholder="Confirm Password" required />
              <FontAwesomeIcon
                icon={showPassword ? "fa-eye-slash" : "fa-eye"}
                className="position-absolute password-toggle-icon"
                style={{ right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
                onClick={togglePasswordVisibility}
              />
            </div>
            <div className="gender-group mb-3">
              <label className="mr-2">
                <input type="radio" name="gender" value="male" checked={gender === 'male'} onChange={handleGenderChange} /> Male
              </label>
              <label>
                <input type="radio" name="gender" value="female" checked={gender === 'female'} onChange={handleGenderChange} /> Female
              </label>
            </div>
            <p>By pressing "Signup" you agree to our Terms & Conditions</p>
            <button type="submit" className="btn btn-primary w-100 mb-3">Signup</button>
            <div className="social-login text-center mb-3">
              <p>Or signup with</p>
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
            <p>Already have an account? <button onClick={() => navigate('/login')} className="btn btn-link p-0">Login</button></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
