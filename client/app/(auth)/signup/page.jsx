'use client'

import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import axios from "axios";
import * as Yup from "yup"
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import "react-toastify/dist/ReactToastify.css"

function Page() {
  const [click, setCkick] = useState(true)
  const [num, setNum] = useState(0)
  const route = useRouter()
  

  const validationSchema = Yup.object({
    name: Yup.string().required(),
    userName: Yup.string().required().min(3,),
    password: Yup.string().required().min(5, )
  })
  const formik = useFormik({
    initialValues: {
       name: "",
       userName: '',
       password: '',
     },
     validationSchema: validationSchema,
     onSubmit: (values,{ resetForm }) => {
      console.log(values)
      resetForm()
     }
  })
  
  function clickSubmit() {
    if(!formik.errors.name || !formik.errors.userName || !formik.errors.password){
      if(formik.values.name || formik.values.password || formik.values.userName){
       setCkick( priv => !priv)
       setNum(prev => 1)
      }
    }
  }
  const user = {
    name: formik.values.name,
    userName: formik.values.userName,
    password: formik.values.password
  }
  useEffect(() => {
    if(num == 0 ) return
    async function fetchData() {
      
      let res
      try {
          res = await axios.post("http://localhost:8080/api/auth/signup", user, {
            headers: {
                "Content-Type": "application/json",
            },
            
        })

        if(res.data.success){
            toast.success(res.data.message)
           route.push("/")
        }
        return res
      } catch (error) {
          toast.error(error.response.data.message)
          console.log(error)
      }
    }
    fetchData(); 
  }, [click]);

  return (
    <div className='w-full flex justify-center items-center flex-col h-[100vh] '>
      <ToastContainer/>
      <div className='w-[90%] max-w-[400px] md:w-[60%] flex flex-col '>
        <h1 className=' text-white text-2xl font-bold mb-9' > Signup </h1>
        <form onSubmit={formik.handleSubmit} className='flex flex-col bg-inherit w-full gap-y-4 items-center'>
          <label htmlFor="name" className=' w-full text-white text-start '> *Name </label>
          <input type="text" placeholder={formik.touched.name && formik.errors.name ? formik.errors.name :'Your Name'}
            id='name'
            name='name'
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}
            className={`p-2 focus:outline-none w-full ${formik.touched.name && formik.errors.name && "placeholder:text-red-500 border-red-500 border"} `}
          />
          <label htmlFor="userName" className=' w-full text-white text-start '>*User Name</label>
          <input type="text" 
            className={`p-2 focus:outline-none w-full ${formik.touched.userName && formik.errors.userName && "placeholder:text-red-500 border-red-500"}  border`}
            id='userName'
            name='userName'
            onChange={formik.handleChange}
            value={formik.values.userName}
            onBlur={formik.handleBlur}
            placeholder={formik.touched.userName && formik.errors.userName ? formik.errors.userName : 'User Name' }
          />
          <label htmlFor="password" className=' w-full text-white text-start '> *Password </label>
          <input type="password"
            className={`p-2 focus:outline-none w-full ${formik.touched.password && formik.errors.password && "placeholder:text-red-500 border-red-500 border"}`}
            id='password'
            name='password'
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
            placeholder={formik.touched.password && formik.errors.password ? formik.errors.password : 'Password' }
          />
          <input type="submit"  value="Submit" onClick={() => clickSubmit()}
           className='text-white font-bold border border-white w-fit py-1 px-4 rounded-full cursor-pointer  ' />
           <p className=' text-white  '> I have account  <Link href="/login" className=' text-red-300 hover:text-red-500 active:text-white ' > Login </Link> </p>
        </form>
      </div>
    </div>
  )
}

export default Page;
