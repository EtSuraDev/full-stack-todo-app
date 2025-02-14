import Image from "next/image";

export default function Home() {
  const data = [
    {
      data: "wduigw efhvccs chwechwecw efbweccwewef webn c wduigw efhvccs chwechwecw efbweccwewef webn c wduigw efhvccs chwechwecw efbweccwewef webn c wduigw efhvccs chwechwecw efbweccwewef webn c wduigw efhvccs chwechwecw efbweccwewef webn c ",
      completed: false
    },
    {
      data: "wduigwefhvccschwechwecw efbweccwewef webn c ",
      completed: false
    },
    {
      data: "wduigw efhvccschwe chwecw efbweccwewef webn c ",
      completed: false
    },
    {
      data: "wduigwefhvccschwechwecw efbweccwewef webn c ",
      completed: false
    },
    {
      data: "wduigwefhvccschwechwecw efbweccwewef webn c ",
      completed: false
    },
    {
      data: "wduigw efhvccschwe chwecw efbweccwewef webn c ",
      completed: false
    },
    {
      data: "wduigwefhvccschwechwecw efbweccwewef webn c ",
      completed: false
    }
  ]


  function howMuchCompleted() {
    let num = 0
    for (let index = 0; index < data.length; index++) {
      data[index].completed === false
      num++
    }
    return num
  }


  return (
    <div className="body">


      <div className=" top-box h-fit py-[70px]  ">
        <div className=" flex justify-between w-[93%] mx-auto mb-12 max-w-[620] ">
          <div className=" font-bold text-[26px] text-white ">
            <h1>
              T O D O
            </h1>
          </div>
          <div className=" w-[20px] cursor-pointer  ">
            <img src="assets/icon-sun.svg" alt="" />
          </div>
        </div>
        <div className=" w-[93%] mx-auto h-fit max-w-[620] mb-10 " >
          <input type="text" className=" w-full h-[40px] sm:h-[50px]  bg-[hsl(237,14%,26%)] text-white pl-4 focus:outline-none " />
        </div>
      </div>


      <div>
        <div className="bg-[hsl(235,24%,19%)]  w-[93%] mx-auto h-fit max-w-[620] absolute left-1/2 -translate-x-1/2 top-[267px]  ">
          {
            data.map((item, index) => {
              return(
                <div key={index} className=" text-white text-[13px] flex p-6 gap-x-5 items-start  justify-between border-b border-[hsl(237,14%,26%)] ">
                  <div className=" flex gap-x-4 w-[90%] ">
                    <div className=" w-fit h-fit ">
                      <button className=" w-[25px] h-[25px] rounded-full border border-[hsl(237,14%,26%)] flex justify-center items-center ">
                        <img src="assets/icon-check.svg" alt="" className=" hidden " />
                      </button>
                    </div>
                    <div className=" w-[86%] ">
                      <p className=" w-[100%] break-words ">
                        { item.data }
                      </p>
                    </div>
                  </div>
                  
                  <div className=" flex justify-center items-center w-[20px] h-[20px] ">
                    <button className=" w-[20px] h-[20px] ">
                      <img src="assets/icon-cross.svg" alt="" />
                    </button>
                  </div>
                </div>
              )
            })
          }
          <div className=" text-[hsl(234,11%,52%)] text-[13px] p-6 flex justify-between items-center  ">
            <div>
              <p>{ howMuchCompleted() } items left </p>
            </div>
            <div className="text-[hsl(234,11%,52%)] text-[13px] p-6  justify-center gap-x-10 items-center hidden md:flex  " >
              <p className=" cursor-pointer hover:text-[hsl(233,14%,35%)] ">All</p>
              <p className=" cursor-pointer hover:text-[hsl(233,14%,35%)] ">Active</p>
              <p className=" cursor-pointer hover:text-[hsl(233,14%,35%)] ">completed</p>
            </div>
            <div className=" cursor-pointer hover:text-[hsl(233,14%,35%)] ">
              <p> clear completed </p>
            </div>
          </div>

          <div className=" md:hidden ">
            <div className=" h-8 bg-[hsl(235,21%,11%)] "   />
            <div className="text-[hsl(234,11%,52%)] text-[13px] p-6 flex justify-center gap-x-10 items-center" >
              <p className=" cursor-pointer hover:text-[hsl(233,14%,35%)] ">All</p>
              <p className=" cursor-pointer hover:text-[hsl(233,14%,35%)] ">Active</p>
              <p className=" cursor-pointer hover:text-[hsl(233,14%,35%)] ">completed</p>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}