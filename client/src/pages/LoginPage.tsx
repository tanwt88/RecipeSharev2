import React,{useState} from 'react';
import httpClient from "../httpClient";
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const [email,setEmail] = useState<string>("");
    const [password,setPassword] = useState<string>("");
    const [id]= useState<string>("");
    const navigate =useNavigate();
    const logInUser= async() =>{


        try{
           // eslint-disable-next-line no-unused-vars 

        const resp =await httpClient.post("http://localhost:5000/login",{
            email,
            password,
            id
        });
        resp.headers.add("Access-Control-Allow-Origin,*")
         navigate(`/home/${resp.data.id}`);

    
    } catch(error:any){
        if (error.response && error.response.status === 401){
            alert("Invalid credentials");
        }
    }
    }

  return (
    <body className='background'>
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


    

</body>
  )
}

export default LoginPage