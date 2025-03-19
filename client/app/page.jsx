"use client"



import axios from "axios";
axios.defaults.withCredentials = true
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoIosLogOut } from "react-icons/io";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import LoadingPage from "./loading.page";
import sendData from "@/api/create.task"
import whenCompletedTask from "@/api/update.task";
import signout from "@/api/signout";
import deleteTask from "@/api/delete.task";
import deleteTasks from "@/api/delete.tasks";





export default function Home() {
  const [ data, setData ] = useState([])
  const [ loading, setLoading ] = useState(true)
  const [ loadPage, setLoadPage ] = useState(false)
  const [task, setTask] = useState("")
  const [ display, setDisplay ] = useState("all")
  const [ dispalyData, setDispalyData ] = useState(data)
  const [ theme, setTheme ] = useState(true)
  const router = useRouter()


console.log(data)
  function howMuchCompleted() {
    let num = 0
    if(data){
    for (let index = 0; index < data.length; index++) {
      if(data[index].status === "completed") continue
      num++
      
    }
    return num}
  }
  
  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(`${process.env.domain}/home`)
        setLoading(_=> false)
        await setData(() => res.data.data.data)
      } catch (error) {
        router.push("/signup")
        console.log(error)
      }
    
    }
    getData()
  }, [loadPage])
  return (
    <div className={`body min-h-[100vh] overflow-y-auto relative ${ theme ? "bg-[hsl(235,24%,19%)]" : "bg-[hsl(0,0%,98%)]" } `}>
      <ToastContainer/>
      <div className={` ${ theme ?  "top-box-dark" : "top-box-light"} h-fit py-[70px]  relative text-white `}>
        <IoIosLogOut className=" absolute top-4 right-4 size-7 cursor-pointer " onClick={() => signout(router)} />
        <div className=" flex justify-between w-[93%] mx-auto mb-12 max-w-[620] ">
          <div className=" font-bold text-[26px] ">
            <h1>
              T O D O
            </h1>
          </div>
          <div className=" w-[20px]  "
            onClick={() => setTheme(prev => !prev)}
          >
            <img src={`assets/icon-${theme ? "sun" : "moon"}.svg`} className="cursor-pointer" alt="" />
          </div>
        </div>
        <div className={` w-[93%] mx-auto h-fit max-w-[620] mb-10 flex ${ theme ? "bg-[hsl(237,14%,26%)] text-gray-300 " : "bg-[hsl(0,0%,98%)] text-gray-600" } px-3 `} >
          <input type="text" value={task} onChange={(e) => setTask(e.target.value)}
           className=" w-[92%] h-[40px] sm:h-[50px] pl-4 focus:outline-none bg-inherit " />
          <button 
          onClick={() => {
            if(task.length == 0){
              toast.error("pleas write some thing")
            }else{
              sendData(task, setData, setTask, setDisplay)
            }
          }}
          >ENTER</button>
        </div>
      </div>


      <div>
        <div className={`shadow-xl rounded-md ${ theme ? "bg-[hsl(235,24%,19%)]" : "bg-[hsl(0,0%,98%)]" }   w-[93%] mx-auto h-fit max-w-[620] absolute left-1/2 -translate-x-1/2 top-[267px]  `}>
          {
            data ?
            data.map((item, index) => {
              return(
                <>
                  { display == "all" ?
                    <div key={index} className={` ${ theme ? "text-white" : "text-gray-700" } text-[15px] flex p-6 gap-x-5 items-start  justify-between border-b border-[hsl(237,14%,26%)] `}>
                    <div className=" flex gap-x-4 w-[90%] ">
                    <div className=" w-fit h-fit ">
                      <button className=" w-[25px] h-[25px] rounded-full border border-[hsl(237,14%,26%)] flex justify-center items-center  "
                        onClick={() => whenCompletedTask(index, item.task, item.status,setData,setTask )}
                      >
                        <img src="assets/icon-check.svg" alt="" className={` ${item.status == "completed" ? "block" : "hidden"}`} />
                      </button>
                    </div>
                    <div className=" w-[86%] ">
                      <p className={` w-[100%] break-words ${item.status == "completed" && "line-through text-gray-400 "}  `}>
                        { item.task }
                      </p>
                    </div>
                  </div>
                  <div className=" flex justify-center items-center w-[20px] h-[20px] ">
                    <button className=" w-[20px] h-[20px] "  onClick={() => deleteTask(index, setData,setDisplay)}>
                      <img src="assets/icon-cross.svg" alt="" />
                    </button>
                  </div>
                </div> 
                  : 
                  display == item.status && 
                  <div key={item.task} className={` ${ theme ? "text-white" : "text-gray-700" } text-[15px] flex p-6 gap-x-5 items-start  justify-between border-b border-[hsl(237,14%,26%)] `}>
                    <div className=" flex gap-x-4 w-[90%] ">
                    <div className=" w-fit h-fit ">
                      <button className=" w-[25px] h-[25px] rounded-full border border-[hsl(237,14%,26%)] flex justify-center items-center  "
                        onClick={() => whenCompletedTask(index, item.task, item.status,setData,setTask )}
                      >
                        <img src="assets/icon-check.svg" alt="" className={` ${item.status == "completed" ? "block" : "hidden"}`} />
                      </button>
                    </div>
                    <div className=" w-[86%] ">
                      <p className={` w-[100%] break-words ${item.status == "completed" && "line-through text-gray-400 "}  `}>
                        { item.task }
                      </p>
                    </div>
                  </div>
                  <div className=" flex justify-center items-center w-[20px] h-[20px] ">
                    <button className=" w-[20px] h-[20px] "
                      onClick={() => deleteTask(index, setData,setDisplay)}
                    >
                      <img src="assets/icon-cross.svg" alt="" />
                    </button>
                  </div>
                </div> 
                  }
                  
                  
                    </>
              )
            })
          : 
          null
          }
          <div className={` text-[hsl(234,11%,52%)] text-[13px] p-6 flex justify-between items-center ${ data == undefined || data.length == 0 && "hidden" }  `}>
            <div>
              <p>{ howMuchCompleted() } items left </p>
            </div>
            <div className=" text-[13px] p-6  justify-center gap-x-10 items-center hidden md:flex  " >
              <p className={` cursor-pointer hover:text-[hsl(233,14%,35%)] ${display == "all" ? " text-blue-600 border-b-2 border-blue-600 ": " text-[hsl(234,11%,52%)]"} pb-2 `} onClick={() => setDisplay("all")} >All</p>
              <p className={` cursor-pointer hover:text-[hsl(233,14%,35%)] ${display == "active" ? " text-blue-600 border-b-2 border-blue-600 ": " text-[hsl(234,11%,52%)]"} pb-2 `} onClick={() => setDisplay("active")} >Active</p>
              <p className={` cursor-pointer hover:text-[hsl(233,14%,35%)] ${display == "completed" ? " text-blue-600 border-b-2 border-blue-600 ": " text-[hsl(234,11%,52%)]"} pb-2 `} onClick={() => setDisplay("completed")} >completed</p>
            </div>
            <div className=" cursor-pointer hover:text-[hsl(233,14%,35%)] "
              onClick={() => {
                let tasks = []
                for(let i = 0; i < data.length; i++){
                  if(data[i].status == "completed"){
                    tasks.push(i)
                  }
                }
                deleteTasks(tasks, setData,setDisplay)
              }}
            >
              <p> clear completed </p>
            </div>
          </div>

          <div className={` md:hidden ${ data.length == 0 && "hidden" } `} >
            <div className=" h-8 bg-inherit "   />
            <div className="text-[hsl(234,11%,52%)] text-[13px] p-6 flex justify-center gap-x-10 items-center" >
              <p className={` ${display == "all" ? " text-blue-600 border-b-2 border-blue-600 ": " text-[hsl(234,11%,52%)] "}  cursor-pointer hover:text-[hsl(233,14%,35%)] pb-2 `}
                onClick={() => {setDisplay("all")
                }}
              >
                All
              </p>
              <p className={` ${display == "active" ? " text-blue-600  border-b-2 border-blue-600  ": " text-[hsl(234,11%,52%)]"} cursor-pointer hover:text-[hsl(233,14%,35%)] pb-2 `}
                onClick={() => {
                  setDisplay("active")
                  console.log(display)
                }}
              >
                Active
              </p>
              <p className={`cursor-pointer hover:text-[hsl(233,14%,35%)] ${display == "completed" ? " text-blue-600 border-b-2 border-blue-600 ": " text-[hsl(234,11%,52%)]"} pb-2 `}
                onClick={() => setDisplay("completed")}
              >
                completed
              </p>
            </div>
          </div>
        </div>
      </div>

      {
        loading && <LoadingPage/>
          
      }
    </div>
  );
}