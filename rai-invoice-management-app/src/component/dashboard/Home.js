import React, { useEffect, useState } from "react";
import Chart from 'chart.js/auto';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";


const Home = () => {
    const [total, setTotal] = useState(0)
    const [totalinvoice, setTotalInvoice] = useState(4345)
    const [totalmonthcollection, setTotalMonthCollection] = useState(0)
    const [invoices, setInvoices] = useState([])

    useEffect(()=>{
        getData()
        createChart()

    },[])

    const getData = async () => {
        const q = query(collection(db, "invoices"),where('uid', "==", localStorage.getItem('uid')))
        const querySnapshot = await getDocs(q);

        const data = querySnapshot.docs.map(doc => ({
            id:doc.id,
            ...doc.data()
        }))
        setInvoices(data)
        // console.log('home', data)
        getAlldataTotal(data)
        getMonthsTotal(data)
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
        setTotalMonthCollection(mt)
    }
    const createChart = () =>{
        const ctx = document.getElementById('myChart');
        new Chart(ctx, {
            type: 'bar',
            data: {
              labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
              datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
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