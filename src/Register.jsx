import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Register = () => {
    //Use states
    const [regMail,setRegMail]=useState("")
    const [regPassword,setRegPassword]=useState("")
    const [isRvalue,setIsRvalue]=useState({ismail:false,ispassword:false})
    const [isUser,setIsuser]=useState([])
    console.log(isUser);

    const navigate=useNavigate()
    //Navigate Login
    const loginNav=()=>{
        navigate("/")
    } 

    //Get all User

    const filterDta=async()=>{
        await axios.get("https://todosbe-pz1y.onrender.com/Register")
         .then(result=>{
             let filterDta=result.data.filter((data)=>{
                 return regMail===data.regMail
             })
             console.log(filterDta,"dd");
             setIsuser(filterDta)
            
         })
         .catch(error=>console.log(error))
     }
 


    const handleRegister=async(e)=>{
       e.preventDefault()

       if(regMail===""&&regPassword===""){
            setIsRvalue({...isRvalue,ismail:true,ispassword:true})
        }
        else if(regMail===""){
            setIsRvalue({...isRvalue,ismail:true,ispassword:false})
        }
        else if(regPassword===""){
            setIsRvalue({...isRvalue,ismail:false,ispassword:true})
        }
        else{
            setIsRvalue({...isRvalue,ismail:false,ispassword:false})
            await filterDta()
            if(isUser.length>0){
                alert("Already Registered")
                navigate("/")
            }
            else{
                axios.post("https://todosbe-pz1y.onrender.com/Register",{regMail:regMail,regPassword:regPassword})
                .then((result)=>{
                    console.log(result)             
                })
                .catch(err=>console.log(err,"err"))
                navigate("/")
            }
          
        }
        }
      

  return (
    <>
        <div style={{width:"100vw",height:"100vh",background:"white",display:"flex",justifyContent:"center",alignItems:"center"}}>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",background:"white",padding:"30px",borderRadius:"10px",boxShadow: "3px 6px 43px 0px rgba(0,0,0,0.69)"}}>
            <form onSubmit={(e)=>handleRegister(e)}>
                <div className='mb-3' style={{textAlign:"center"}}>
                    <h3>Register Form</h3>
                </div>
                <div className="mb-3">
                    <label for="registermail" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="registermail" onChange={(e)=>setRegMail(e.target.value)} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    {isRvalue.ismail?<p style={{color:"red"}}>Please Enter MailId</p>:""}

                </div>
                <div className="mb-3">
                    <label for="registerpassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="registerpassword" onChange={(e)=>setRegPassword(e.target.value)}/>
                    <div id="emailHelp" className="form-text">We'll never share your password with anyone else.</div>
                    {isRvalue.ispassword?<p style={{color:"red"}}>Please Enter MailId</p>:""}
                </div>
                <div style={{display:"flex",justifyContent:"center"}}>
                    <div style={{margin:"5px"}}>
                        <button type="submit" className="btn btn-primary" >Register</button>
                    </div>   
                    <div style={{margin:"5px"}}>
                        <abbr title='Existing User'><button className="btn btn-primary" onClick={()=>loginNav()}>Login</button></abbr>
                    </div>
                </div>
            </form>
        </div>
    </div>    
    </>
  )
}

export default Register