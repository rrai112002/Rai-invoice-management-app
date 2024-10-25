import React, { useState } from "react";
import {db} from '../../firebase'
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { Navigate, useNavigate } from "react-router-dom";

const Newinvoice = () => {
    const [to, setTo] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [product, setProduct] = useState([])
    const [total, setTotal] = useState(0)

    const navigation = useNavigate()

    const addProduct = () => {
        setProduct([...product,{'id':product.length, 'name':name, 'price':price, 'quantity':quantity}])
        const t = quantity*price
        setTotal(total + t)

        setName('')
        setPrice('')
        setQuantity('')

    }
    const saveData = async ()=> {
        console.log(to,phone,address)
        console.log(product)
        console.log(total)

        const data = await addDoc(collection(db ,'invoices'),{
            to:to,
            phone:phone,
            address:address,
            product:product,
           total:total,
           uid:localStorage.getItem('uid'),
           date:Timestamp.fromDate(new Date())
        



        })
        console.log(data)
        navigation('/dashboard/invoice')
      


    }


    return (
        <div>
            <div className="header-row">
            <p className="new-invoice-heading">New Invoice</p>
            <button onClick={saveData} className='add-btn' type='button'>Save data</button>

            </div>
            <form className="new-invoice-form">
                <div className="first-row">
                <input onChange={e=>{setTo(e.target.value)}} placeholder='To' value={to}/>
                <input onChange={e=>{setPhone(e.target.value)}} placeholder='Phone' value={phone}/>
                <input onChange={e=>{setAddress(e.target.value)}} placeholder='Address' value={address}/>

                </div>
                <div className="first-row">
                <input onChange={e=>{setName(e.target.value)}} placeholder='Product Name' value={name}/>
                <input onChange={e=>{setPrice(e.target.value)}} placeholder='price' value={price}/>
                <input type="number" onChange={e=>{setQuantity(e.target.value)}} placeholder='quantity' value={quantity}/>

                </div>
                <button onClick={addProduct} className='add-btn' type='button'>Add Product</button>

            </form>
           
            { product.length > 0 && <div className="product-wrapper">
                <p>Product list</p>
            <div className="product-list">
                        <p>S.No.</p>
                        <p>Product Name</p>
                        <p>price</p>
                        <p>quantity</p>
                        <p>Total Price</p>

                    </div>
                {
                    product.map((data,index)=>(
                    <div className="product-list" key={index}>
                        <p>{index+1}</p>
                        <p>{data.name }</p>
                        <p>{data.price }</p>
                        <p>{data.quantity}</p>
                        <p>{data.quantity * data.price}</p>

                    </div>

                    ))
                

                }
                <div className="total-wrapper">
                    <p>Total:{total}</p>

                </div>
            
            </div>
}
        </div>
    )

}

export default Newinvoice