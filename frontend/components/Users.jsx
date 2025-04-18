import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const  [currentUserId,SetcurrenUserId] = useState("");

    useEffect(()=>{
        
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    
    if (token) {
      const decodedToken = jwtDecode(token); // Decode the token
      const currentUserId = decodedToken.userId; 
      SetcurrenUserId(currentUserId);
    } else {
      console.log('No token found');
    }

    },[])    
        

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
            .then(response => {
                const filteredUsers = response.data.users.filter(user => user._id !== currentUserId);
        setUsers(filteredUsers);
                
                // setUsers(response.data.users )
            })
    }, [filter, currentUserId])
    
    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input onChange={(e) => {
                setFilter(e.target.value)
            }} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
            {users.map(user => <User user={user} />)}
        </div>
    </>
}

function User({user}) {
    const navigate = useNavigate();

    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full font-smeibold uppercase">
                    {user.name[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.name}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button onClick={(e) => {
                navigate("/send?id=" + user._id + "&name=" + user.name);
            }} label={"Send Money"} />
        </div>
    </div>
}