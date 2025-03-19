import React from 'react'
import * as motion from "motion/react-client"


function Loading() {
  return (
    <div className=' h-[100vh] w-full flex items-start pt-12 justify-center absolute z-50 bg-inherit backdrop-blur-sm top-0 '>
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

export default Loading
