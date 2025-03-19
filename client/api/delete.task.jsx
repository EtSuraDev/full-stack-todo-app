
import axios from "axios"


const deleteTask = async (index,setData,setDisplay) => {
    try {
      const res = await axios.delete(`${process.env.domain}/crud/delete`,{data:{
        index
        }
      },{
        headers: {
            "Content-Type": "application/json",
          }
        }
      )
      await setData(_ => res.data.data)
      setDisplay("all")
      console.log(index)
    } catch (error) {
      toast.error("Try Again")
      console.log(error)
    }
  }



export default deleteTask