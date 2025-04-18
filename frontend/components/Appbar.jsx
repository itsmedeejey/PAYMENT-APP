import { Signin } from "../pages/Signin"
import { useLocation, useNavigation } from "react-router-dom";
import { Button } from "./Button"
import { useNavigate } from "react-router-dom";

export const Appbar = () => {
    const location =     useLocation();
    const navigate = useNavigate()
  const isHomePage = location.pathname === "/";

    return <div className=" bg-slate-800 shadow h-16 flex justify-between text-slate-100">
        <div className="flex flex-col justify-center h-full ml-4 cursor-pointer font-extrabold text-xl">
           PayTM App
            
        </div>
        <div className="flex">
        <div className="flex">
        {isHomePage && (
          <>
            <div className="flex flex-col justify-center mr-2 h-full">
              <Button label={"Signup"}  onClick={()=>{navigate("/signup")}}/>
            </div>
            <div className="flex flex-col justify-center mr-4 h-full">
              <Button label={"Signin"} onClick={()=>{navigate("/signin")}} />
            </div>
          </>
        )}
        </div>
        <div className="flex">{!isHomePage &&(
            <>
            
            <div className="flex flex-col justify-center h-full mr-4">
                Hello
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-500 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    U
                </div>
            </div>
            
            </>
        )}
        </div>


        </div>
    </div>
}