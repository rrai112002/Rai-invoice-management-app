import React from 'react';
import './dashboard.css'
import { Link, Outlet, useNavigate} from 'react-router-dom';
import { auth } from '../../firebase'
import { signOut } from 'firebase/auth';

const Dashboard = () => {
    const navigate = useNavigate()
    const logout = ()=>{
        signOut(auth).then(() => {
            localStorage.clear()
            navigate('/login')
    // Sign-out successful.
        }).catch((error) => {
      // An error happened.
    });
    }

    return (
        <div className='dashboard-wrapper'>
            <div className='side-nav'>
                <div className='profile-info'>
                    <img src={localStorage.getItem('photoURL')} />
                    <div>
                        <p>{localStorage.getItem('cName')}</p>
                        <button onClick={logout}>Logout</button>
                    </div>
                </div>
                <hr/>
                <div className='menu'>
                <Link to="home" className='menu-link'><i className="fa-solid fa-house"></i> Home</Link>
                <Link to="invoice" className='menu-link'><i className="fa-solid fa-file-invoice"></i> Invoice</Link> 
                <Link to="newinvoice" className='menu-link'><i className="fa-solid fa-file"></i> New Invoice</Link>
                <Link to="setting" className='menu-link'><i className="fa-solid fa-gear"></i> Setting</Link>

                </div>

            </div>
            <div className='main-container'>
                <Outlet/>
                {/* <p>hi</p> */}
                
            </div>
          
        </div>
    )
}

export default Dashboard;

// Dashboard.js
// import React from 'react';
// import './dashboard.css';
// import { Grid, Paper, Typography, Button } from '@mui/material';

// const Dashboard = () => {
//   return (
//     <div className="dashboard-container">
//       <div className="sidebar">
//         <h2>Invoice Manager</h2>
//         <ul>
//           <li>Dashboard</li>
//           <li>Create Invoice</li>
//           <li>View Invoices</li>
//           <li>Clients</li>
//           <li>Settings</li>
//         </ul>
//       </div>

//       <div className="main-content">
//         <div className="header">
//           <h1>Dashboard</h1>
//           <Button variant="contained" color="primary">
//             + Create New Invoice
//           </Button>
//         </div>

//         <Grid container spacing={3}>
//           <Grid item xs={12} sm={6} md={3}>
//             <Paper className="dashboard-card">
//               <Typography variant="h6">Total Invoices</Typography>
//               <Typography variant="h3">250</Typography>
//             </Paper>
//           </Grid>

//           <Grid item xs={12} sm={6} md={3}>
//             <Paper className="dashboard-card">
//               <Typography variant="h6">Pending Invoices</Typography>
//               <Typography variant="h3">50</Typography>
//             </Paper>
//           </Grid>

//           <Grid item xs={12} sm={6} md={3}>
//             <Paper className="dashboard-card">
//               <Typography variant="h6">Paid Invoices</Typography>
//               <Typography variant="h3">200</Typography>
//             </Paper>
//           </Grid>

//           <Grid item xs={12} sm={6} md={3}>
//             <Paper className="dashboard-card">
//               <Typography variant="h6">Total Revenue</Typography>
//               <Typography variant="h3">$50,000</Typography>
//             </Paper>
//           </Grid>
//         </Grid>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
