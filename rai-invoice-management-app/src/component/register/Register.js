// // import React from 'react'
// // import '../login/login.css'
// // import { Link } from 'react-router-dom'

// // const Register = () => {
// //     return (
// //         <div>
// //             <h1>Register</h1>


// //         {/* <Link to='/register' className='register-link'>Create an Account</Link> */}

            

// //         </div>
// //     )
// // }

// // export default Register

// import React, { useRef, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom'
// import './register.css'; // Import the CSS for styling
// import { auth, storage, db } from '../../firebase'
// import { getFirestore, doc, setDoc } from "firebase/firestore";  // Import Firestore functions
// import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

// // Initialize Firestore
// // const db = getFirestore();

// function Register() {
//     // const fileInputref = useRef(null)
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     // companyName: '',  // New field for company name
//     confirmPassword: '',
//   });

//   const navigate = useNavigate()

//   const [message, setMessage] = useState('');
//   const [file, setFile] = useState(null);
//   const [displayName, setDisplayName] = useState('');
//   const [logoPreview, setLogoPreview] = useState(null);


//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setFormData({
//       ...formData,
//       logo: file,
//     });

//     // // Show a preview of the selected image
//     // if (file) {
//     //   const reader = new FileReader();
//     //   reader.onloadend = () => {
//     //     setLogoPreview(reader.result);
//     //   };
//     //   reader.readAsDataURL(file);
//     // }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const { username, email, password, confirmPassword } = formData;

//     // Basic validation
//     if (!username || !email || !password || !confirmPassword) {
//       setMessage('Please fill out all fields');
//       return;
//     }

//     if (password !== confirmPassword) {
//       setMessage('Passwords do not match');
//       return;
//     }

//     // Here, you'd typically send the form data to a backend API for registration
//     console.log('Account created successfully:', formData);
//     setMessage('Account created successfully!');



//     createUserWithEmailAndPassword(auth, email, password)
//     .then(newUser=>{
//         console.log(newUser)
//         const date = new Date().getTime()

//         // const validExtensions = ['image/jpeg', 'image/png'];
//         // if (!validExtensions.includes(file.type)) {
//         //     console.error('Invalid file type. Only JPEG and PNG are allowed.');
//         //     return;
//         // }


//         const storageRef =  ref(storage, `${username + date + ".jpg"}`);


//         uploadBytesResumable(storageRef, file)
//         .then(res =>{
//             console.log(res)
//             getDownloadURL(storageRef)
//             .then((downloadedUrl)=>{
//                 console.log(downloadedUrl)

//                 updateProfile(newUser.user,{
//                     displayName:username,
//                     photoURL:downloadedUrl,

//                 })
//                 .then(() => {
//                     console.log('Profile updated successfully!');
    
//                 setDoc(doc(db, "users",newUser.user.uid), {
//                     displayName: username,
//                     photoURL: downloadedUrl,
//                     email: email,   // Save user's email
//                     createdAt: date // Store creation date
//                   })
//                   navigate('/dashboard')
//                   localStorage.setItem('cName', newUser.user.displayName)
//                   localStorage.setItem('photoURL', newUser.user.photoURL)
//                 //   .then(() => {
//                 //     console.log('User document written to Firestore!');
//                 //   })
//                 //   .catch((firestoreError) => {
//                 //     console.error('Error writing document to Firestore:', firestoreError);
//                 //   });
  
//             })
//         })
//         .catch(error=>{
//             console.log(error)
//         })


//        })
//     })

//     .catch(error=>{
//         console.log(error)
//     })

//   };

//   return (
//     <div className='out-layer'>

  
//     <div className="create-account-container">
//       <h2>Create your Account</h2>
//         {/* Image upload preview */}
//         {logoPreview && <img src={logoPreview} alt="Logo Preview" className="logo-preview" />}
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Username:</label>
//           <input
//             type="text"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//             required
//           />
//         </div>
    
//         <div className="form-group">
//           <label>Email:</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Password:</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Confirm Password:</label>
//           <input
//             type="password"
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             required
//           />
//         </div>

//           {/* File input for uploading a logo */}
//           <div className="form-group">
//           <label>Upload Logo:</label>
//           <input
//             type="file"
//             accept="image/*"
//             // style={{display:'none'}}
//             onChange={handleFileChange}
//           />
//         </div>
//         <button type="submit">Create Account</button>
//       </form>
//       {message && <p className="message">{message}</p>}
    
//       <p className='Login-account'>
//        <Link to="/login" className='Login-link' >Login with account</Link>
//      </p>
//     </div>
//     </div>
//   );

//   }

// export default Register;



import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './register.css';
import { auth, storage, db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // const navigate = useNavigate();

  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFormData({
      ...formData,
      logo: selectedFile,
    });
    setFile(selectedFile);

    // Show a preview of the selected image
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password, confirmPassword } = formData;

    // Basic validation
    if (!username || !email || !password || !confirmPassword) {
      setMessage('Please fill out all fields');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    if (!file) {
      setMessage('Please upload a profile image');
      return;
    }

    try {
      const newUser = await createUserWithEmailAndPassword(auth, email, password);
      console.log(newUser);
      const date = new Date().getTime();

      const metadata = {
        contentType: file.type,
      };

      const fileExtension = file.name.split('.').pop();
      const storageRef = ref(storage, `${username + date}.${fileExtension}`);

      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      console.log('file tested')


      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Progress function (optional)
        },
        (error) => {
          console.error('Upload error:', error);
          setMessage('Failed to upload image');
        },
        async () => {
          const downloadedUrl = await getDownloadURL(storageRef);
          console.log(downloadedUrl);

          await updateProfile(newUser.user, {
            displayName: username,
            photoURL: downloadedUrl,
          });

          console.log('Profile updated successfully!');

          await setDoc(doc(db, 'users', newUser.user.uid), {
            uid:newUser.user.uid,
            displayName: username,
            photoURL: downloadedUrl,
            email: email,
            createdAt: date,
          });
          console.log('uploaded')

          localStorage.setItem('cName', newUser.user.displayName);
          localStorage.setItem('photoURL', newUser.user.photoURL);
          localStorage.setItem('email', newUser.user.email);
          localStorage.setItem('uid', newUser.user.uid);

        //   localStorage.setItem('date', date);

          // navigate('/dashboard');
        }
      );
      setMessage('Account create successfully');

    } catch (error) {
      console.error('Registration error:', error);
      setMessage('Failed to create account');
    }
  };

  return (
    <div className="out-layer">
      <div className="create-account-container">
        <h2>Create your Account</h2>
        {/* Image upload preview */}
        {logoPreview && <img src={logoPreview} alt="Logo Preview" className="logo-preview" />}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {/* File input for uploading a logo */}
          <div className="form-group">
            <label>Upload Logo:</label>
            <input type="file" accept="image/*" onChange={handleFileChange} required />
          </div>
          <button type="submit">Create Account</button>
        </form>
        {message && <p className="message">{message}</p>}

        <p className="Login-account">
          <Link to="/login" className="Login-link">
            Login with your account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
