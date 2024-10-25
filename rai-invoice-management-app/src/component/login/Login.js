// import React from 'react'
// import './login.css'

// const Login = () => {
//     return (
//         <div className='login-wrapper'>
//             <div className='login-container'>


//             </div>
//         </div>
//     )
// }

// export default Login




import React, { useState } from 'react';
import './login.css'; // Import the CSS for styling
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)
        localStorage.setItem('cName', user.displayName)
        localStorage.setItem('photoURL', user.photoURL)
        localStorage.setItem('email', user.email)
        localStorage.setItem('uid', user.uid)



        navigate('/dashboard')
        setMessage('Login successful!');
        // ...
      })
      .catch((error) => {
        console.log(error)
      });
    // Simple login validation (can be replaced with actual authentication logic)
    // if (email === 'user@example.com' && password === 'password123') {
    //   setMessage('Login successful!');
    // } else {
    //   setMessage('Invalid credentials');
    // }
  };

  return (
    <div className='login-outbbox'>
         <div className="login-container">
         {/* <div className="login-container">
         <div className="login-container"> */}

        {/* <div className='login-boxes'>
            

        </div> */}
        {/* <div className='login-boxes'> */}
        <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button  type="submit">Submit</button>

      </form>

      {message && <p className="message">{message}</p>}
      {/* <Link to={'./register'} style={text} className='register-link'>Create an Account</Link> */}
     <p className='create-account'>
       <Link to="/register" className='register-link' >Create an Account</Link>


     </p>
    
   

    </div>
    </div>
  
  );
}

export default Login;
