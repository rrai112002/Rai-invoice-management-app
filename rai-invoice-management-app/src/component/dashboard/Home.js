import React, { useEffect, useState } from "react";
import Chart from 'chart.js/auto';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";


const Home = () => {
    const [total, setTotal] = useState(0)
    const [totalinvoice, setTotalInvoice] = useState(0)
    const [totalmonthcollection, setTotalMonthCollection] = useState(0)
    const [invoices, setInvoices] = useState([])

    useEffect(()=>{
        getData()
        createChart()

    },[])

    async function getData() {
            const q = query(collection(db, "invoices"), where('uid', "==", localStorage.getItem('uid')));
            const querySnapshot = await getDocs(q);

            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setInvoices(data);
            // console.log('home', data)
            getAlldataTotal(data);
            getMonthsTotal(data);
            monthWiseCollection(data);
        }
    const getAlldataTotal =(invoiceList)=>{
        var t = 0;
        invoiceList.forEach(data=>{
            t += data.total
        })
        setTotal(t)
    }

    const getMonthsTotal = (invoiceList)=>{
        var mt = 0;
        invoiceList.forEach(data=>{
            if(new Date(data.date.seconds * 1000).getMonth() == new Date().getMonth())
            {
                console.log(data)
                mt += data.total
            }
        })
        setTotalMonthCollection(mt);
        // setTotalInvoice(data.length);

    }

    const monthWiseCollection = (data)=> {
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

        data.forEach(d=>{
            if(new Date(d.date.seconds * 1000).getFullYear() === new Date().getFullYear())
            {
                console.log('data', d)
                console.log(new Date(d.date.seconds * 1000).toLocaleDateString('default', { month:'long'}));
                chartData[new Date(d.date.seconds * 1000).toLocaleDateString('default', { month:'long'})] += d.total

            }
        })
        console.log(chartData)

    }
    const createChart = () =>{
        const ctx = document.getElementById('myChart');
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
        }
        console.log(Object.keys(chartData))
        new Chart(ctx, {
            type: 'bar',
            data: {
              labels: ['Jan', 'Feb', 'Mar', 'April', 'May', 'June'],
              datasets: [{
                label: 'Month wise Collection',
                data: Object.values(chartData),
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });
        // </script>

    }

    return (
        <div>
            <div className="home-first-row">
                <div className="home-box box-1">
                    <h1 className="box-header" >Rs {total}</h1>
                    <p className="box-title" > Overall</p>

                </div>
                <div className="home-box box-2">
                    <h1 className="box-header">Rs {totalinvoice}</h1>
                    <p className="box-title" >Invoices</p>
    
                </div>
                <div className="home-box box-3">
                <h1 className="box-header">Rs {totalmonthcollection}</h1>
                <p className="box-title">This Month </p>
    
                </div>

            </div>
                <div className="home-second-row">
                    <div className="chart-box">
                    <canvas id="myChart"></canvas>
                    </div>
                    <div className="recent-invoice-list">
                        <h1>Recent Invoice list</h1>
                        <div>
                            <p>customer Name</p>
                            <p>25/10/2024</p>
                        </div>
                        <div>
                            <p>customer Name</p>
                            <p>25/10/2024</p>
                        </div>
                        <div>
                            <p>customer Name</p>
                            <p>25/10/2024</p>
                        </div>
                        <div>
                            <p>customer Name</p>
                            <p>25/10/2024</p>
                        </div>
                        <div>
                            <p>customer Name</p>
                            <p>25/10/2024</p>
                        </div>
                        <div>
                            <p>customer Name</p>
                            <p>25/10/2024</p>
                        </div>
                    </div>

                </div>


        </div>
        // <div>
        //     {/* <p>Home</p> */}
        // </div>
       
    )

}

export default Home