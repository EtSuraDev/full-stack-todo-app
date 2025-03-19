import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios';


const whenCompletedTask = async (index, task, status,setData,setTask) => {
    if (status == "active"){  
      try {
        const res = await axios.patch(`${process.env.domain}/crud/update`,{data:{
          task:task,
          status: "completed"},
          index: index
        },{
          headers: {
              "Content-Type": "application/json",
            }
          }
        )
        await setData(_ => res.data.data)
        setTask(() => "")
      } catch (error) {
        toast.error("Try Again")
        console.log(error)
      }
    }
  }


export default  whenCompletedTask
