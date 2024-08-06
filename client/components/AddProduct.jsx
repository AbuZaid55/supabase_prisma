import React, { useContext, useState } from 'react'
import { TextField } from '@mui/material'
import Button from '@mui/material/Button'
import axiosIntance from '../src/axiosIntance.js'
import MyContext from '../context/provider.js'

const AddProduct = ({fetchProducts}) => {
    const [product,setProduct] = useState({title:"",qty:"",price:"",description:""})
    const {session} = useContext(MyContext)
    const handleInput = (e)=>{
        setProduct({...product,[e.target.name]:e.target.value})
    }
    const submitForm = async(e)=>{
        e.preventDefault()
        try {
          const res = await axiosIntance.post('/create',{...product},{headers:{Authorization:`Bearer ${session?.access_token}`}})
          if(res?.data?.success){
            alert(res.data.message)
            fetchProducts()
            setProduct({title:"",qty:"",price:"",description:""})
          }
        } catch (error) {
          alert(error?.response?.data?.message)
        }
    }
  return (
    <form className='form' onSubmit={submitForm}>
        <h1>Add Products</h1>
      <TextField name='title' placeholder='Enter Title' value={product.title} onChange={(e)=>{handleInput(e)}}/>
      <TextField name='qty' placeholder='Enter Qty' value={product.qty} onChange={(e)=>{handleInput(e)}}/>
      <TextField name='price' placeholder='Enter Price' value={product.price} onChange={(e)=>{handleInput(e)}}/>
      <TextField name='description' placeholder='Enter Description' value={product.description} onChange={(e)=>{handleInput(e)}}/>
    <Button variant='contained' type='submit' >Submit</Button>
    </form>
  )
}

export default AddProduct
