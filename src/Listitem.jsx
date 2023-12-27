import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';



const Listitem = () => {
  const [todo,setTodo]=useState("")
  const [masterData,setMasterData]=useState([])
  const [isEdit,setIsEdit]=useState(false)
  const [ID,setID]=useState("")
  const logmail= sessionStorage.getItem("mail")

  const navigate=useNavigate()

  //ADD 
  const handleAdd=()=>{
    try{
      console.log(logmail)
      axios.post("https://todosbe-pz1y.onrender.com/Listitem",{listItem:todo,email:logmail})
      setTodo("")
    }
    catch(err){
      console.log(err);
    }
  }

  //Get

  const getDataList=()=>{
    axios.get("https://todosbe-pz1y.onrender.com/Listitem")
    .then((result)=>{
      let filterDta=result.data.filter((data)=>{
        return data.email===logmail
    })
      setMasterData(filterDta)
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  //Delete 

  const handleDelete= async(data)=>{
    try{
      await axios.delete(`https://todosbe-pz1y.onrender.com/Listitem/${data._id}`)
    }
    catch(err){
      console.log(err);
    }
  }

  //Edit

  const handleEdit=(data)=>{
    setID(data._id)
    setTodo(data.listItem)
    setIsEdit(true)
  }

  //Update
  const handleUpdate=()=>{
    try{
      axios.put(`https://todosbe-pz1y.onrender.com/Listitem/${ID}`,{listItem:todo})
      setTodo("")
      setIsEdit(false)
    }
    catch(error){
      console.log(error);
    }
  }

 const handlelogOut=()=>{
    navigate("/")
  }

  useEffect(()=>{
    getDataList()
  },[handleDelete,handleUpdate])

  return (
    <>
      <div style={{width:"100vw",height:"100vh",background:"white",display:"flex",justifyContent:"center",alignItems:"center"}}>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",background:"white",padding:"20px",borderRadius:"10px",width:"80%",boxShadow: "3px 6px 43px 0px rgba(0,0,0,0.69)"}}>
          <div style={{width:"80%"}}>
            <div className='mb-3' style={{textAlign:"center"}}>
              <h3>Todo List</h3>
            </div>
            <label for="item" className="form-label">Items</label>
            <div className="input-group mb-3">
              <input type="text" className="form-control" id="item" value={todo} onChange={(e)=>setTodo(e.target.value)}/>
              {!isEdit?<button className="btn btn-primary" type="submit" id="button-addon2" onClick={(e)=>handleAdd(e)}>ADD</button>
                :<button className="btn btn-primary" type="submit" id="button-addon2" onClick={(e)=>handleUpdate(e)}>UPDATE</button>}
            </div>
            {masterData.length>0?masterData.map((data,i)=>(
             
                <ul key={i} style={{padding:"0px"}}>
                  <div style={{display:"flex",width:"100%"}}>
                    <div style={{width:"80%"}}><li style={{display:"inline",fontSize:"1rem",fontWeight:"bold"}}>{data.listItem}</li></div>
                    <div style={{width:"20%"}}>
                      <EditIcon style={{margin:"10px",font:"green",fontWeight:"bold"}} onClick={()=>handleEdit(data)}/>
                      {/* <button className="btn btn-primary" style={{margin:"10px",padding:"1px"}} >Edit</button> */}
                      <DeleteIcon style={{margin:"10px",font:"red",fontWeight:"bold"}} onClick={()=>handleDelete(data)}/>                     
                      {/* <button className="btn btn-primary" style={{margin:"10px",backgroundColor:"none",padding:"1px"}} >Delete</button> */}
                    </div>
                  </div>
                </ul>
              )):<p style={{color:"red"}}>No List Found</p>}
            <div style={{display:"flex",justifyContent:"end",marginTop:"16px"}}>
               <button className="btn btn-primary" style={{marginLeft:"10px",borderColor:"#d69a3a",backgroundColor:"#d69a3a",padding:"1px"}} onClick={handlelogOut}>Logout</button>
            </div>  
          </div>
        </div>
      </div>    
    </>
  )
}

export default Listitem