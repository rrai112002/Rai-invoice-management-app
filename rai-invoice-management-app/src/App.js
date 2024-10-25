import logo from './logo.svg';
import React from 'react'
import './App.css';
import Login from './component/login/Login';
import Register from './component/register/Register';
import Dashboard from './component/dashboard/Dashboard';
import { Component } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './component/dashboard/Home';
import Invoices from './component/dashboard/Invoices';
import Setting from './component/dashboard/Setting';
import Newinvoice from './component/dashboard/Newinvoices';
import Invoicedetail from './component/dashboard/Invoicedetail';




function App() {
  const myRouter = createBrowserRouter([
    {path:'', Component:Login},

    {path:'/login', Component:Login},
    // {path:'/login', Component:Login},

    {path:'/register', Component:Register},
    {path:'/dashboard', Component:Dashboard, children:[
    {path:'', Component:Home},

      {path:'home', Component : Home},
      {path:'invoice', Component : Invoices},
      {path:'newinvoice', Component : Newinvoice},
      {path:'setting', Component : Setting},
      {path:'invoice-detail', Component : Invoicedetail}


    ]}

  ]
   

  )
  return (
    <div>
      <RouterProvider router={myRouter}></RouterProvider>
      {/* <Login />
 
      <Register /> */}
   
     
    </div>
  );
}

export default App;
