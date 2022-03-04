import React,{useState} from 'react'
import "./AddFirstAdmin.css";
import axios from "axios";

const AddFirstAdmin = (props) => {
  console.log("AddSecondAdmin props: ", props);
  const instance = axios.create({
    baseURL: 'https://gwtech-node-app.herokuapp.com',
    headers: {
        Accept: "application/json",
        'content-type':'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWQ3ZmQ5NWU5OWI4ZmJhMTk0YWMyMTEiLCJuYW1lIjoiUmFiaWEgSW1yYW4iLCJlbWFpbCI6ImF6YW4ucmFiaWExQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlzU2VsbGVyIjpmYWxzZSwiaWF0IjoxNjQyNDEwNjcwLCJleHAiOjE2NDUwMDI2NzB9.jLLFtH_o72m7G60rvAZjO43imhKEgZjUfxoaXy1ik_A`
    },
});
  const [companyname, setCompanyName] = useState([]);
  const [adminpassword, setAdminPassword] = useState([]);
  const [phone, setPhone] = useState([]);
  const [address, setAddress] = useState([]);
  const [image, setAdminImage] = useState([]);
  const handleSubmit= (e) => {
    
    e.preventDefault();
    console.log("Company Name: ", companyname);
    console.log("Password : ", adminpassword);
    console.log("phone : ", phone);
    console.log("address : ", address);
    console.log("image:", image)
    let formdata = new FormData();
    formdata.append("name", companyname);
    formdata.append("password", adminpassword);
    formdata.append("phone", phone);
    formdata.append("address", address);
    formdata.append("email",companyname+"@gmail.com")
    formdata.append("isSecondAdmin",false)
    formdata.append("isCEO",false);
    formdata.append("isFirstAdmin",true);
    console.log("formdata: ", formdata);
    if(props.adminId == undefined){
        instance.post(`/api/users/register-firstadmin`, formdata,{
          headers: {"Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWQ3ZmQ5NWU5OWI4ZmJhMTk0YWMyMTEiLCJuYW1lIjoiUmFiaWEgSW1yYW4iLCJlbWFpbCI6ImF6YW4ucmFiaWExQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlzU2VsbGVyIjpmYWxzZSwiaWF0IjoxNjQyNDEwNjcwLCJleHAiOjE2NDUwMDI2NzB9.jLLFtH_o72m7G60rvAZjO43imhKEgZjUfxoaXy1ik_A` },
      })  
    }
    else if(props.adminId != undefined){
      instance.put(`/api/users/profile-firstadmin/${props.adminId}`, formdata,{
        headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWQ3ZmQ5NWU5OWI4ZmJhMTk0YWMyMTEiLCJuYW1lIjoiUmFiaWEgSW1yYW4iLCJlbWFpbCI6ImF6YW4ucmFiaWExQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlzU2VsbGVyIjpmYWxzZSwiaWF0IjoxNjQyNDEwNjcwLCJleHAiOjE2NDUwMDI2NzB9.jLLFtH_o72m7G60rvAZjO43imhKEgZjUfxoaXy1ik_A` },
    })  
    }
    

    props.hitSidebar()

  }
  const handleFile = (e) =>{
    console.log("file: ", e.target.files[0]);
    let file = e.target.files[0]
    setAdminImage(file)
  }

  return (
   <>
    <form onSubmit={e => { handleSubmit(e) }} style={{padding: "10px"}}>
      <h1 className='RA-13-add-user-sidebar RA-13-form-heading'> {
        props.adminId == undefined ? "Add Firsts Admin" : "Edit First Admin"
      } </h1>
      <br />
     {/* <div className='form-group'>
       <input type='file' name="image" onChange={(e)=>handleFile(e)} />
     </div> */}
     <div className='form-group'>
      <label htmlFor="title"><b>Name</b></label>
      <input className='form-control' type="text" name="name" id="name" placeholder='Name' onChange={e => setCompanyName(e.target.value)}/>
     </div>
      <br />
     <div className='form-group'>
      <label htmlFor="title"><b>Password</b></label>
      <input className='form-control' type="password" name="password" id="password" placeholder='Password' onChange={e => setAdminPassword(e.target.value)}/>
     </div>
     <br />
     <div className='float-right'>
    <button className='RA-13-btn'>Submit</button>
     </div>
    </form>
   </>
  )
}

export default AddFirstAdmin