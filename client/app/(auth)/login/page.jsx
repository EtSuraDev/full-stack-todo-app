"use client"


import React from 'react'
import { toast, ToastContainer } from 'react-toastify';
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from "yup"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import "react-toastify/dist/ReactToastify.css"
import * as motion from "motion/react-client"


function page() {
      const [click, setCkick] = useState(false)
      const [num, setNum] = useState(0)
      const [loading, setLoading] = useState(false)
      const route = useRouter()

     const validationSchema = Yup.object({
        name: Yup.string().required(),
        userName: Yup.string().required().min(3),
        password: Yup.string().required().min(5)
      })
    const formik = useFormik({
        initialValues: {
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
      if(!formik.errors.userName && !formik.errors.password){
        if(formik.values.password || formik.values.userName){
        setCkick( priv => !priv)
        setNum(prev => 1)
        setLoading(prev => true)
        }
      }
    }
    const user = {
        userName: formik.values.userName,
        password: formik.values.password
    }

    useEffect(() => {
        if(num == 0 ) return
        async function fetchData() {
        try {
            let res = await axios.post("http://localhost:8080/api/auth/login", user, {
                headers: {
                    "Content-Type": "application/json",
                },
                
            })
          if(res.data.success){
            toast.success(res.data.message)
            route.push("/")
          }            
            setLoading(prev => false)
          return res
        } catch (error) {
            setLoading(prev => false)
            toast.error(error.response.data.message)
            console.log(error)
        }
        }
        fetchData(); 
    }, [click]);
  return (
    <div className='w-full flex justify-center items-center flex-col h-[100vh] '>
      <ToastContainer/>
      <div className='w-[90%] max-w-[400px] md:w-[60%] flex flex-col  '>
        <h1 className=' text-white text-2xl font-bold mb-7' > Login </h1>
        <form onSubmit={formik.handleSubmit} className='flex flex-col bg-inherit w-full gap-y-4 items-center'>
          <label htmlFor="userName" className=' w-full text-white text-start '>*User Name</label>
          <input type="text" 
            className={`p-2 focus:outline-none w-full ${formik.touched.userName && formik.errors.userName && " border-red-500"}  border`}
            id='userName'
            name='userName'
            onChange={formik.handleChange}
            value={formik.values.userName}
            onBlur={formik.handleBlur}
            placeholder={'User Name' }
          />
          {
          formik.touched.userName && formik.errors.userName && 
          <p className=' text-[14px] text-red-400 w-full text-start mt-[-14px] '> { formik.errors.userName} </p> 
          }
          <label htmlFor="password" className=' w-full text-white text-start '> *Password </label>
          <input type="password"
            className={`p-2 focus:outline-none w-full ${formik.touched.password && formik.errors.password && " border-red-500 border"}`}
            id='password'
            name='password'
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
            placeholder={'Password' }
          />
          {
          formik.touched.password && formik.errors.password && 
          <p className=' text-[14px] text-red-400 w-full text-start mt-[-14px] '> { formik.errors.password} </p> 
          }
          <input type="submit"  value="Submit" onClick={() => clickSubmit()}
           className='text-white font-bold border border-white w-fit py-1 px-4 rounded-full cursor-pointer  ' />
           <p className=' text-white  ' > I don't have account  <Link href="/signup" className=' text-red-300 hover:text-red-500 active:text-white ' > Signup </Link> </p>
        </form>
      </div>
      {
              loading && (
                <div className=' h-[100vh] w-full flex items-start pt-12 justify-center absolute z-50'>
              <div className=' flex items-end gap-x-2 '>
                <p className=' text-2xl font-extrabold text-white '>
                  Loading
                </p>
                <motion.div 
                  className="w-2 h-2 bg-white rounded-full"
                  initial={{ y: -12 }}
                  animate={{ y: -2 }}
                  transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.5 }}
                />
      
                <motion.div 
                  className=' w-2 h-2 bg-white rounded-full'
                  initial={{ y: -12 }}
                  animate={{ y: -2 }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "reverse", 
                    duration: 0.5 ,
                    delay: 0.1,
                  }}
                />
                <motion.div 
                  className=' w-2 h-2 bg-white rounded-full'
                  initial={{ y: -12 }}
                  animate={{ y: -2 }}
                  transition={{
                    repeat: Infinity, 
                    repeatType: "reverse", 
                    duration: 0.5,
                    delay: 0.2,
                  }}
                />
                <motion.div 
                  className=' w-2 h-2 bg-white rounded-full'
                  initial={{ y: -12 }}
                  animate={{ y: -2 }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatType: "reverse", 
                    duration: 0.5 ,
                    delay: 0.3,
                  }}
                />
              </div>
            </div>
              ) 
            }
    </div>
  )
}

export default page
