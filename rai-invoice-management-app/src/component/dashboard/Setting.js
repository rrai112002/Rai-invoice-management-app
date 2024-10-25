// import React, { useState } from "react";

// const Setting = () => {
//     const [formData, setFormData] = useState({
//         username: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//       });
//   const [file, setFile] = useState(null);
//   const [imageUrl, setImageUrl] = useState(localStorage.getItem('photoURL'))


//     return (
       
//         <div>
//             <p>Setting</p>
//             <div className="setting-wrapper">
//                 <div className="profile-info">
//                 <img alt="profile-pic" src={imageUrl}></img>
//                 <button>Update Profile pic</button>


//                 </div>

//             </div>
//         </div>
//     )

// }

// export default Setting

import React, { useState, useRef } from 'react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { storage, auth } from '../../firebase';  // Import storage and auth from your Firebase config

const Setting = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef(null);  // Reference to the hidden file input element

  // Handle profile picture update when file is selected
  const handleProfilePictureUpload = (file) => {
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    // Create a storage reference for the file
    const storageRef = ref(storage, `profilePictures/${auth.currentUser.uid}/${file.name}`);

    // Upload the file to Firebase Storage
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        // Progress monitoring if you want (optional)
      },
      (error) => {
        setError('Error uploading file: ' + error.message);
        setLoading(false);
      },
      () => {
        // Get the download URL of the uploaded file
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // Update user's profile with the new photo URL
          updateProfile(auth.currentUser, {
            photoURL: downloadURL
          }).then(() => {
            // Successfully updated profile picture
            localStorage.setItem('photoURL', downloadURL); // Update in local storage
            setSuccess('Profile picture updated successfully!');
            setLoading(false);
          }).catch((error) => {
            setError('Error updating profile: ' + error.message);
            setLoading(false);
          });
        });
      }
    );
  };

  // Handle button click to trigger file input
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();  // Trigger the hidden file input click
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      handleProfilePictureUpload(selectedFile);
    }
  };

  return (
    <div className="settings-container">
      <h2 className="settings-title">Update Profile Picture</h2>
      
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        accept="image/*"
      />
      
      {/* Button to trigger file input */}
      <button className="upload-button" onClick={handleButtonClick} disabled={loading}>
        {loading ? 'Uploading...' : 'Update Profile Picture'}
      </button>
      
      {error && <p className="error-msg">{error}</p>}
      {success && <p className="success-msg">{success}</p>}
      
      {/* Optionally display the current profile picture */}
      <img className="profile-picture" src={localStorage.getItem('photoURL')} alt="Profile" style={{ width: '100px', height: '100px' }} />
    </div>
  );
};

export default Setting

