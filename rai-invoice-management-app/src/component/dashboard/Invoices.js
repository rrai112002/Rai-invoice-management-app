import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

const Invoices = () => {
const navigate = useNavigate()


   
    const [invoices, setInvoices] = useState([])
    useEffect(()=> {
        getData()
    },[])

    const getData = async () => {
        const q = query(collection(db, "invoices"),where('uid', "==", localStorage.getItem('uid')))
        const querySnapshot = await getDocs(q);

        const data = querySnapshot.docs.map(doc => ({
            id:doc.id,
            ...doc.data()
        }))
        setInvoices(data)

     
    }
    const deleteInvoice = async (id) => {
        const isSure = window.confirm("are you sure want to delete")
        if(isSure)
        {
            try{
                await deleteDoc(doc(db, 'invoices', id))
                getData()
            }
            catch{
                window.alert("something is wrong")
            }

        }
    }
    return (
       
        <div>
           {
            invoices.map(data=>(
                <div className="box" key={data.id}>
                <p>{data.to}</p>
                <p>{new Date(data.date.seconds * 1000).toLocaleDateString()}</p>
                <p>{data.total}</p>
                <button className="delete-btn" onClick={()=>{deleteInvoice(data.id)}}><i className="fa-solid fa-trash"></i> Delete </button>
                <button className="view-btn" onClick={()=>{navigate('/dashboard/invoice-detail', {state:data})}}><i className="fa-solid fa-eye"></i> View </button>

                

                </div>

                
            ))          
           }
           {
            invoices.length < 1 && <div className="no-invoice-wrapper">
                <p>You have no invoice till now</p>
                <button onClick={()=>{navigate('/dashboard/newinvoice')}}>Create new Invoice</button>
                </div>
           }
        </div>


    )

}

export default Invoices