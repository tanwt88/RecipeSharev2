import React,{useState} from 'react';
import httpClient from "../httpClient";

const AdminLoginPage: React.FC = () => {
    const [email,setEmail] = useState<string>("");
    const [password,setPassword] = useState<string>("");

    const logInUser= async() =>{
        console.log(email, password);

        try{
           // eslint-disable-next-line no-unused-vars 
        const resp =await httpClient.post("//localhost:5000/admin",{
            email,
            password,
        });
        
        window.location.href="/";
    
    } catch(error:any){
            if (error.response.status=== 401){
                alert("Invalid credentials");
            }
        }
    }

  return (
    <div>
        <h1> Log Into Your Account</h1>
        <form>
            <div>
            <label>Email:</label>
            <input 
            type = "text" 
            value = {email} 
            onChange = {(e) => setEmail(e.target.value)} 
            id = ""
            />
            </div>

            <div>
            <label>Password:</label>
            <input 
            type = "password" 
            value = {password} 
            onChange = {(e) => setPassword(e.target.value)} 
            id = ""
            />
            </div>

            <button type = "button" onClick={()=> logInUser()}>
                Submit
            </button>

        </form>


    </div>
  )
}

export default AdminLoginPage
