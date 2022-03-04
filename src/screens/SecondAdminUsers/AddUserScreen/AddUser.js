import React,{useState,useEffect,useRef} from 'react'
import "./AddUser.css";
import axios from "axios";
import { Toast } from 'primereact/toast';

const AddSecondAdminUser = (props) => {
  console.log("AddSecondAdmin props: ", props);
  const instance = axios.create({
    baseURL: 'https://gwtech-node-app.herokuapp.com',
    headers: {
        Accept: "application/json",
        'content-type':'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiR3cgVGVjaCIsImVtYWlsIjoiZ3d0ZWNoLjc4NUBnbWFpbC5jb20iLCJpYXQiOjE2NDYwMDA0NTEsImV4cCI6MTY0ODU5MjQ1MX0.u7VHiiz0U_geRtAdO-Bv5JW12ZOJaMitbkwjrCcc5Hc`
    },
});
  const [userkey, setUserKey] = useState([]);
  const [userpassword, setUserPassword] = useState([]);
  const [adminData, setAdminData] = useState([]);
  const [admin_id, setAdminId] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const myToastDanger = useRef(null);

  useEffect(() => {
    instance.get("/api/users").then((response) => {
        console.log("Here is my response", response.data);
        let filterResults = response.data.filter((x)=>{
            return x.isSecondAdmin == true
         })
        setAdminData(filterResults);
        instance.get("/api/connection").then((response) => {
          console.log("Here is my response", response.data);
          let filterResults = response.data
          setUsersData(filterResults);
        })
      })
}, []);

  // const handleSubmit= (e) => {
  //   console.log(`Here id admin id: ${admin_id}`);
  //   e.preventDefault();
  //   if(props.adminId == undefined){
  //       instance.post(`/api/connection`, {
  //         "secondAdmin": admin_id,
  //         "key": userkey,
  //         "password": userpassword,
  //         headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWQ3ZmQ5NWU5OWI4ZmJhMTk0YWMyMTEiLCJuYW1lIjoiUmFiaWEgSW1yYW4iLCJlbWFpbCI6ImF6YW4ucmFiaWExQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlzU2VsbGVyIjpmYWxzZSwiaWF0IjoxNjQyNDEwNjcwLCJleHAiOjE2NDUwMDI2NzB9.jLLFtH_o72m7G60rvAZjO43imhKEgZjUfxoaXy1ik_A` },
  //     })  
  //   }
  //   else if(props.adminId != undefined){
  //     instance.put(`/api/connection/${props.adminId}`, {
  //       "secondAdmin": admin_id,
  //       "key": userkey,
  //       "password": userpassword,
  //       headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWQ3ZmQ5NWU5OWI4ZmJhMTk0YWMyMTEiLCJuYW1lIjoiUmFiaWEgSW1yYW4iLCJlbWFpbCI6ImF6YW4ucmFiaWExQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlzU2VsbGVyIjpmYWxzZSwiaWF0IjoxNjQyNDEwNjcwLCJleHAiOjE2NDUwMDI2NzB9.jLLFtH_o72m7G60rvAZjO43imhKEgZjUfxoaXy1ik_A` },
  //   })  
  //   }
    

  //   props.hitSidebar()

  // }
  const handleSubmit= (e) => {
    let validateUserKey = usersData.filter((x) =>{
      return x.key === userkey
     })
     console.log("Validate User Key: ", validateUserKey);
     console.log(`Here id admin id: ${admin_id}`);
     e.preventDefault();
     if(validateUserKey.length === 0){
       instance.post(`/api/connection`, {
         "secondAdmin": admin_id,
         "key": userkey,
         "password": userpassword,
         "ceoStatus": false,
         "lockStatus": false,
         headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiR3cgVGVjaCIsImVtYWlsIjoiZ3d0ZWNoLjc4NUBnbWFpbC5jb20iLCJpYXQiOjE2NDYwMDA0NTEsImV4cCI6MTY0ODU5MjQ1MX0.u7VHiiz0U_geRtAdO-Bv5JW12ZOJaMitbkwjrCcc5Hc` },
     })  
     myToastDanger.current.show({severity: "success", summary: "Success Message", detail: "Record Added..."});
     document.getElementById('password').value = ""
     document.getElementById('key').value = ""
     }
     if(validateUserKey[0].key === userkey){
       instance.put(`/api/connection/${validateUserKey[0]._id}`, {
         "secondAdmin": admin_id,
         "key": userkey,
         "password": userpassword,
         "ceoStatus": false,
         "lockStatus": false,
         headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiR3cgVGVjaCIsImVtYWlsIjoiZ3d0ZWNoLjc4NUBnbWFpbC5jb20iLCJpYXQiOjE2NDYwMDA0NTEsImV4cCI6MTY0ODU5MjQ1MX0.u7VHiiz0U_geRtAdO-Bv5JW12ZOJaMitbkwjrCcc5Hc` },
     })  
     myToastDanger.current.show({severity: "error", summary: "Error Message", detail: "Key Already Exist..."});
     document.getElementById('password').value = ""
     document.getElementById('key').value = ""

     }
    
     
 
     props.hitSidebar()
 
   }

  return (
  <>
    <Toast ref={myToastDanger}></Toast>
    <form onSubmit={e => { handleSubmit(e) }} style={{padding: "10px"}} autocomplete="off">
    <h1 className='RA-13-add-user-sidebar RA-13-form-heading'> {
      props.adminId == undefined ? "Add user for second admin" : "Edit user for second admin"
    } </h1>
    <br />
    <div className='form-group'> 
    <label htmlFor="title"><b>Select Adminn</b></label> <br /> 
    <select onChange={e => setAdminId(e.target.value)} style={{width: "100%"}}>
    <option value=""></option>
      {
     adminData.map((option) => {
      return <option key={option._id} value={option._id}>{option.name}</option>
     })
      }

    </select>
   </div>
   <br />
   <div className='form-group'>
    <label htmlFor="title"><b>User Key</b></label>
    <input className='form-control' type="text" name="key" id="key" placeholder='User Key' onChange={e => setUserKey(e.target.value)}  autocomplete="off"/>
   </div>
    <br />
   <div className='form-group'>
    <label htmlFor="title"><b>Password</b></label>
    <input className='form-control' type="password" name="password" id="password" placeholder='Password' onChange={e => setUserPassword(e.target.value)} autocomplete="off"/>
   </div>
  <br /> 
   <div className='float-right'>
  <button className='RA-13-btn'>Submit</button>
   </div>
  </form>
  </>
  )
}

export default AddSecondAdminUser