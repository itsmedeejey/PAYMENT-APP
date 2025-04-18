import { Appbar } from "../components/Appbar"
import home from "../public/homeimg.jpg"
export const Home = ()=>{

    return <div >
        <Appbar></Appbar>
        
        <div className="flex  object-fill   md:w-full md:h-full">
          <div className=" flex absolute bottom-[50%] left-[5%] text-yellow-300 uppercase font-serif text-[50px] font-extrabold md:bottom-[50%] md:left-[20%]">

              a simple payment application
              <p className="hidden md:flex flex-row  lowercase text-xs     ">sign up now*</p>
            </div>
        <img className=" w-full h-[1000px] object-cover " src={home} alt="error" />

        </div>
    </div>
}