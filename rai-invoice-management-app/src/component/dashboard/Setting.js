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

import React, { useState } from 'react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { storage, auth, db } from '../../firebase';  // Import storage and auth from your Firebase config
import { doc, updateDoc } from 'firebase/firestore';

const Setting = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [displayName, setDisplayName] = useState(localStorage.getItem('cName') || '');

  // Handle file change when clicking the "Update Profile Picture" button
  const handleProfilePictureUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = (event) => {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        setFile(selectedFile);
        uploadProfilePicture(selectedFile);
      }
    };

    input.click();
  };

  const uploadProfilePicture = (file) => {
    setLoading(true);
    setError('');
    setSuccess('');

    const storageRef = ref(storage, `profilePictures/${auth.currentUser.uid}/${file.name}`);
    
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {},
      (error) => {
        setError('Error uploading file: ' + error.message);
        setLoading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          updateProfile(auth.currentUser, { photoURL: downloadURL }).then(() => {
            localStorage.setItem('photoURL', downloadURL); // Update in localStorage
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

  // Handle name change input
  const handleNameChange = (e) => {
    setDisplayName(e.target.value);
  };

  // Update the display name in Firebase and local storage
  const handleNameUpdate = () => {
    if (!displayName) {
      setError('Display name cannot be empty.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    updateProfile(auth.currentUser, { displayName: displayName })
      .then(() => {
        localStorage.setItem('cName', displayName); // Update in local storage
        updateDoc(doc(db, "users", localStorage.getItem('uid')),{
            displayName : displayName
        })
        setSuccess('Display name updated successfully!');
        setLoading(false);
      })
      .catch((error) => {
        setError('Error updating name: ' + error.message);
        setLoading(false);
      });
  };

  return (
    <div className="settings-container">
      <h2 className="settings-title">Update Profile</h2>
      <img
        className="profile-picture"
        src={localStorage.getItem('photoURL')}
        alt="Profile"
        style={{ width: '100px', height: '100px' }}
      />

      {/* Update Profile Picture Section */}
      <div className="profile-picture-section">
        <button className="upload-button" onClick={handleProfilePictureUpload} disabled={loading}>
          {loading ? 'Uploading...' : 'Update Profile Picture'}
        </button>
      </div>

      {/* Display Profile Picture */}
     

      {/* Update Name Section */}
      <div className="name-update-section">
        <input
          className="name-input"
          type="text"
          value={displayName}
          onChange={handleNameChange}
          placeholder="Enter new display name"
        />
        <button className="name-update-button" onClick={handleNameUpdate} disabled={loading}>
          {'Update Display Name'}
        </button>
      </div>

      {error && <p className="error-msg">{error}</p>}
      {success && <p className="success-msg">{success}</p>}
    </div>
  );
};

export default Setting;






