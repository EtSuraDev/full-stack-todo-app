import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios';


const sendData = async (task, setData, setTask, setDisplay) => {
    try {
      const res = await axios.patch(`${process.env.domain}/crud/save`,{data:{
        task:task,
        status: "active"}
      },{
        headers: {
            "Content-Type": "application/json",
          }
        }
      )
      await setData(_ => res.data.data)
      setTask(() => "")
      setDisplay("all")
    } catch (error) {
      toast.error("Try Again")
      console.log(error)
    }
  }


export default sendData