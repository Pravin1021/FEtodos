import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';


const Login = () => {
    //States
    const [loginData,setLogindata]=useState({logMail:"",logPassword:""})
    const [isValue,setIsvalue]=useState({mail:false,password:false})
    const [isUser,setIsuser]=useState({isMail:false,isPassword:false})
    const navigate=useNavigate()
    //Navigate to Register form
    const registerNav=()=>{
        navigate("/Register")
    }
    //Get Data
    const getData=async()=>{
       await axios.get("https://todosbe-pz1y.onrender.com/Register")
        .then(result=>{
            let filterDta=result.data.filter((data)=>{
                return loginData.logMail===data.regMail
            })

            sessionStorage.setItem("mail",loginData.logMail)
            if(filterDta.length>0){
                setIsuser({...isUser,isMail:false,isPassword:false})
                if(filterDta[0].regPassword===loginData.logPassword){
                    setIsuser({...isUser,isMail:false,isPassword:false})
                    navigate("/Listitem")
                }
                else{
                    setIsuser({...isUser,isMail:false,isPassword:true})
                }
            }
            else{
                alert("Please Register")
                navigate("/Register")
            }
        })
        .catch(error=>console.log(error))
    }

    //Handle login function
    const handleLogin=(e)=>{
        e.preventDefault()
        if(loginData.logMail===""&&loginData.logPassword===""){
            setIsvalue({...isValue,mail:true,password:true})
        }
        else if(loginData.logMail===""){
            setIsvalue({...isValue,mail:true,password:false})
        }
        else if(loginData.logPassword===""){
            setIsvalue({...isValue,mail:false,password:true})
        }
        else{
            setIsvalue({...isValue,mail:false,password:false})
            
            getData()
        
        }
    }

  return (
    <>
    <div style={{width:"100vw",height:"100vh",background:"white",display:"flex",justifyContent:"center",alignItems:"center"}}>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",background:"white",padding:"30px",borderRadius:"10px",boxShadow: "3px 6px 43px 0px rgba(0,0,0,0.69)"}}>
            <form onSubmit={(e)=>handleLogin(e)}>
                <div className='mb-3' style={{textAlign:"center"}}>
                    <h3>Login Form</h3>
                </div>
                <div className="mb-3">
                    <label for="loginmail" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="loginmail" onChange={(e)=>setLogindata({...loginData,logMail:e.target.value})}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    {isValue.mail?<p style={{color:"red"}}>Please Enter MailId</p>:""}
                    {isUser.isMail?<p style={{color:"red"}}>Please Check MailId</p>:""}
                </div>
                <div className="mb-3">
                    <label for="loginpassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="loginpassword" onChange={(e)=>setLogindata({...loginData,logPassword:e.target.value})}/>
                    <div id="emailHelp" className="form-text">We'll never share your password with anyone else.</div>
                    {isValue.password?<p style={{color:"red"}}>Please Enter Password</p>:""}
                    {isUser.isPassword?<p style={{color:"red"}}>Please Check Password</p>:""}
                </div>
                <div style={{display:"flex",justifyContent:"center"}}>
                    <div style={{margin:"5px"}}>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>   
                    <div style={{margin:"5px"}}>
                        <abbr title='New User'><button className="btn btn-primary" onClick={()=>registerNav()}>Register</button></abbr>
                    </div>
                </div>
            </form>
        </div>
    </div>
    </>
  )
}

export default Login