// import React, { useEffect, useState } from "react";
// import Chart from 'chart.js/auto';
// import { collection, getDocs, query, where } from "firebase/firestore";
// import { db } from "../../firebase";


// const Home = () => {
//     const [total, setTotal] = useState(0)
//     const [totalinvoice, setTotalInvoice] = useState(0)
//     const [totalmonthcollection, setTotalMonthCollection] = useState(0)
//     const [invoices, setInvoices] = useState([])

//     useEffect(()=>{
//         getData()
//         // createChart()

//     },[])

//     async function getData() {
//             const q = query(collection(db, "invoices"), where('uid', "==", localStorage.getItem('uid')));
//             const querySnapshot = await getDocs(q);

//             const data = querySnapshot.docs.map(doc => ({
//                 id: doc.id,
//                 ...doc.data()
//             }));
//             setInvoices(data);
//             // console.log('home', data)
//             getAlldataTotal(data);
//             getMonthsTotal(data);
//             monthWiseCollection(data);
//         }
//     const getAlldataTotal =(invoiceList)=>{
//         var t = 0;
//         invoiceList.forEach(data=>{
//             t += data.total
//         })
//         setTotal(t)
//     }

//     const getMonthsTotal = (invoiceList)=>{
//         var mt = 0;
//         invoiceList.forEach(data=>{
//             if(new Date(data.date.seconds * 1000).getMonth() == new Date().getMonth())
//             {
//                 console.log(data)
//                 mt += data.total
//             }
//         })
//         setTotalMonthCollection(mt);
//         // setTotalInvoice(data.length);

//     }

//     const monthWiseCollection = (data)=> {
//         const chartData = {
//             "Jan": 0,
//             "Feb": 0,
//             "Mar": 0,
//             "Apr": 0,
//             "May": 0,
//             "Jun": 0,
//             "Jul": 0,
//             "Aug": 0,
//             "Sep": 0,
//             "Oct": 0,
//             "Nov": 0,
//             "Dec": 0
//         };

//         data.forEach(d=>{
//             if(new Date(d.date.seconds * 1000).getFullYear() === new Date().getFullYear())
//             {
//                 console.log('data', d)
//                 // console.log(new Date(d.date.seconds * 1000).toLocaleDateString('default', { month:'long'}));
//                 chartData[new Date(d.date.seconds * 1000).toLocaleDateString('default', { month:'long'})] += d.total;

//             }
//         })
//         console.log(chartData)
//         createChart(chartData)

//     }
//     const createChart = (chartData) =>{
//         const ctx = document.getElementById('myChart');
     
//         console.log(Object.keys(chartData))
//         new Chart(ctx, {
//             type: 'bar',
//             data: {
//               labels: ['Jan', 'Feb', 'Mar', 'April', 'May', 'June'],
//               datasets: [{
//                 label: 'Month wise Collection',
//                 data: Object.values(chartData),
//                 borderWidth: 1
//               }]
//             },
//             options: {
//               scales: {
//                 y: {
//                   beginAtZero: true
//                 }
//               }
//             }
//           });
//         // </script>

//     }

//     return (
//         <div>
//             <div className="home-first-row">
//                 <div className="home-box box-1">
//                     <h1 className="box-header" >Rs {total}</h1>
//                     <p className="box-title" > Overall</p>

//                 </div>
//                 <div className="home-box box-2">
//                     <h1 className="box-header">Rs {totalinvoice}</h1>
//                     <p className="box-title" >Invoices</p>
    
//                 </div>
//                 <div className="home-box box-3">
//                 <h1 className="box-header">Rs {totalmonthcollection}</h1>
//                 <p className="box-title">This Month </p>
    
//                 </div>

//             </div>
//                 <div className="home-second-row">
//                     <div className="chart-box">
//                     <canvas id="myChart"></canvas>
//                     </div>
//                     <div className="recent-invoice-list">
//                         <h1>Recent Invoice list</h1>
//                         <div>
//                             <p>customer Name</p>
//                             <p>25/10/2024</p>
//                         </div>
//                         <div>
//                             <p>customer Name</p>
//                             <p>25/10/2024</p>
//                         </div>
//                         <div>
//                             <p>customer Name</p>
//                             <p>25/10/2024</p>
//                         </div>
//                         <div>
//                             <p>customer Name</p>
//                             <p>25/10/2024</p>
//                         </div>
//                         <div>
//                             <p>customer Name</p>
//                             <p>25/10/2024</p>
//                         </div>
//                         <div>
//                             <p>customer Name</p>
//                             <p>25/10/2024</p>
//                         </div>
//                     </div>

//                 </div>


//         </div>
       
       
//     )

// }

// export default Home

import React, { useEffect, useState } from "react";
import Chart from 'chart.js/auto';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";

const Home = () => {
    const [total, setTotal] = useState(0);
    const [totalInvoice, setTotalInvoice] = useState(0);
    const [totalMonthCollection, setTotalMonthCollection] = useState(0);
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        const q = query(collection(db, "invoices"), where('uid', "==", localStorage.getItem('uid')));
        const querySnapshot = await getDocs(q);

        const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        setInvoices(data);
        getAllDataTotal(data);
        getMonthsTotal(data);
        monthWiseCollection(data);
    }

    const getAllDataTotal = (invoiceList) => {
        let totalAmount = 0;
        invoiceList.forEach(data => {
            totalAmount += data.total;
        });
        setTotal(totalAmount);
    }

    const getMonthsTotal = (invoiceList) => {
        let monthlyTotal = 0;
        invoiceList.forEach(data => {
            if (new Date(data.date.seconds * 1000).getMonth() === new Date().getMonth()) {
                monthlyTotal += data.total;
            }
        });
        setTotalMonthCollection(monthlyTotal);
    }

    const monthWiseCollection = (data) => {
        const chartData = {
            "Jan": 0,
            "Feb": 0,
            "Mar": 0,
            "Apr": 0,
            "May": 0,
            "Jun": 0,
            "Jul": 0,
            "Aug": 0,
            "Sep": 0,
            "Oct": 0,
            "Nov": 0,
            "Dec": 0
        };

        data.forEach(d => {
            const invoiceDate = new Date(d.date.seconds * 1000);
            if (invoiceDate.getFullYear() === new Date().getFullYear()) {
                const monthIndex = invoiceDate.getMonth(); // Get the month index (0-11)
                const monthName = Object.keys(chartData)[monthIndex]; // Get month name from keys
                chartData[monthName] += d.total; // Increment the total for that month
            }

        });
        setTotalInvoice(data.length);


        console.log('Chart Data:', chartData);
        createChart(chartData); // Create chart with populated data
    }

    const createChart = (chartData) => {
        const ctx = document.getElementById('myChart');
    
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(chartData), // Month names
                datasets: [{
                    label: 'Month wise Collection',
                    data: Object.values(chartData), // Corresponding totals
                    borderWidth: 2,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(199, 199, 199, 0.6)',
                        'rgba(255, 99, 71, 0.6)',
                        'rgba(123, 239, 178, 0.6)',
                        'rgba(173, 216, 230, 0.6)',
                        'rgba(64, 224, 208, 0.6)',
                        'rgba(238, 130, 238, 0.6)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(199, 199, 199, 1)',
                        'rgba(255, 99, 71, 1)',
                        'rgba(123, 239, 178, 1)',
                        'rgba(173, 216, 230, 1)',
                        'rgba(64, 224, 208, 1)',
                        'rgba(238, 130, 238, 1)'
                    ]
                }]
            },
            options: {
                plugins: {
                    legend: {
                        labels: {
                            color: 'rgba(255, 255, 255, 0.8)' // White legend text
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Total Amount',
                            color: 'rgba(255, 255, 255, 0.8)' // White y-axis title
                        },
                        ticks: {
                            color: 'rgba(200, 200, 200, 0.8)' // Light gray y-axis labels
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)' // Light grid lines
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Months',
                            color: 'rgba(255, 255, 255, 0.8)' // White x-axis title
                        },
                        ticks: {
                            color: 'rgba(200, 200, 200, 0.8)' // Light gray x-axis labels
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)' // Light grid lines
                        }
                    }
                },
                layout: {
                    padding: 10
                },
                responsive: true
            }
        });
    };
    

    return (
        <div>
            <div className="home-first-row">
                <div className="home-box box-1">
                    <h1 className="box-header">Rs {total}</h1>
                    <p className="box-title">OverAll</p>
                </div>
                <div className="home-box box-2">
                    <h1 className="box-header">Rs {totalInvoice}</h1>
                    <p className="box-title">Invoices</p>
                </div>
                <div className="home-box box-3">
                    <h1 className="box-header">Rs {totalMonthCollection}</h1>
                    <p className="box-title">This Month</p>
                </div>
            </div>
            <div className="home-second-row">
                <div className="chart-box">
                    <canvas id="myChart"></canvas>
                </div>
                <div className="recent-invoice-list">
                    <h1>Recent Invoice list</h1>
                    {/* Sample data; replace with actual data rendering */}
                    <div>
                        {/* <p style={{color : "blueviolet"}} >customer Name</p> */}
                        <p style={{color:"blueviolet"}} className="invoice-list-home-second-row">Customer Name</p>
                        <p style={{color:"blueviolet"}} className="invoice-list-home-second-row" >Date</p>
                        <p style={{color:"blueviolet"}} className="invoice-list-home-second-row" >Total</p>
                    </div>
                    {
                         invoices.slice(0,6).map(data=>(
                            <div>
                                <p>{data.to}</p>
                                <p>{new Date(data.date.seconds * 1000).toLocaleDateString()}</p>
                                <p>{data.total}</p>

                            </div>


                         ))

                    }
                   

                    
                   
                </div>
            </div>
        </div>
    )
}

export default Home;
