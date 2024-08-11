import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
// import './Todo.css'
function App() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      name: formData.get('txt'),
      email: formData.get('email'),
      password: formData.get('pswd'),
      cpassword: formData.get('cpswd'),
    };
    if (formData.get('pswd') === formData.get('cpswd')) {
      try {
        const response = await fetch('http://localhost:5000/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        const res = await response.json();
        if (response.status === 201) {
          alert("Signup Successful");
        } else if (response.status === 400) {
          alert("User Already Exists");
        } else {
          alert("Error occurred. Please try again");
        }
        console.log(res);
      } catch (error) {
        console.error('Error:', error);
        alert("Error occurred. Please try again!");
      }
    } else {
      alert("Password and Confirm Password Mismatch!");
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      email: formData.get('lemail'),
      password: formData.get('password'),
    };
  
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (response.status === 200) {
        alert("Login Successful");
        localStorage.setItem("userEmail", formData.get('lemail')); // Updated key
        navigate('/marks'); // Updated function name
      } else if (response.status === 404) {
        alert("User not found. Please Signup...");
      } else {
        alert("Password Incorrect");
      }
    } catch (error) {
      console.error('Error:', error);
      alert("Error occurred. Please try again!");
    }
  };
  
  return (
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />

        <div className="signup">
          <form onSubmit={handleSignup}>
            <label htmlFor="chk" aria-hidden="true">Sign up</label>
            <input type="text" name="txt" id="txt" placeholder="User name" required />
            <input type="email" name="email" id="email" placeholder="Email" required />
            <input type="password" name="pswd" id="pswd" placeholder="Password" required />
            <input type="password" name="cpswd" id="cpswd" placeholder="Confirm Password" required />
            <button type="submit">Sign up</button>
          </form>
        </div>

        <div className="login">
          <form onSubmit={handleLogin}>
            <label htmlFor="chk" aria-hidden="true">Login</label>
            <input type="email" name="lemail" id="lemail" placeholder="Email" required />
            <input type="password" name="password" id="password" placeholder="Password" required />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
  );
}

export default App;
