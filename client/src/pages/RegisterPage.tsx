import React, {useState} from 'react';
import httpClient from "../httpClient";

const RegisterPage: React.FC = () => {
    const [email,setEmail] = useState<string>("");
    const [password,setPassword] = useState<string>("");
    const [country,setCountry] = useState<string>("");

    const registerUser= async() =>{

        try{
        const resp =await httpClient.post("http://localhost:5000/register",{
            email,
            password,
            country
        });
        
        window.location.href="/";
    
    } catch(error:any){console.log(error)
//            if (error.response.status=== 401){
  //              alert("Invalid credentials");
    //        }
        }
    }

  return (
    <body className='background'>
    <div>
        <h1 className='b'> Create an account</h1>
        <form>
            <div>
            <label className='b'>Email:</label>
            <input 
            type = "text" 
            value = {email} 
            onChange = {(e) => setEmail(e.target.value)} 
            id = ""
            />
            </div>

            <div>
            <label className='b'>Password:</label>
            <input 
            type = "password" 
            value = {password} 
            onChange = {(e) => setPassword(e.target.value)} 
            id = ""
            />
            </div>
            <div>
            <label className='b'>Country:</label>
            <input 
            type = "text" 
            value = {country} 
            onChange = {(e) => setCountry(e.target.value)} 
            id = ""
            />
            </div>

            <button type = "button" onClick={()=> registerUser()}>
                Submit
            </button>

        </form>


    </div>
    </body>
  )
}

export default RegisterPage;