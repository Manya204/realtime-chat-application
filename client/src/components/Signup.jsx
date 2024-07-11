import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import useSignup from '../hooks/useSignup';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [gender, setGender] = useState('male'); // Default to male
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const { loading, signup } = useSignup();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await signup({ username, email, password, confirmPassword, gender });
  };

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
            <h2>Welcome to Chit-Chat</h2>
            <p>Signup to Continue</p>
          </div>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="User Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
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
            <div className="form-group mb-3 position-relative">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <FontAwesomeIcon 
                icon={showPassword ? faEyeSlash : faEye} 
                className="position-absolute password-toggle-icon" 
                style={{ right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }} 
                onClick={togglePasswordVisibility} 
              />
            </div>
            <div className="gender-group mb-3">
              <label className="mr-2">
                <input type="radio" name="gender" value="male" checked={gender === 'male'} onChange={handleGenderChange} /> Male
              </label>
              &nbsp;
              <label>
                <input type="radio" name="gender" value="female" checked={gender === 'female'} onChange={handleGenderChange} /> Female
              </label>
            </div>
            <p>By pressing "Signup" you agree to our Terms & Conditions</p>
            <button type="submit" className="btn btn-primary w-100 mb-3" disabled={loading}>Signup</button>
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
