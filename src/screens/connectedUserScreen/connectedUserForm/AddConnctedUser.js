import React,{useState,useEffect} from 'react'
import "./AddConnctedUser";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';

const AddConnectedUser = (props) => {
  console.log("AddSecondAdmin props: ", props);
  const instance = axios.create({
    baseURL: 'https://gwtech-node-app.herokuapp.com',
    headers: {
        Accept: "application/json",
        'content-type':'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWQ3ZmQ5NWU5OWI4ZmJhMTk0YWMyMTEiLCJuYW1lIjoiUmFiaWEgSW1yYW4iLCJlbWFpbCI6ImF6YW4ucmFiaWExQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlzU2VsbGVyIjpmYWxzZSwiaWF0IjoxNjQyNDEwNjcwLCJleHAiOjE2NDUwMDI2NzB9.jLLFtH_o72m7G60rvAZjO43imhKEgZjUfxoaXy1ik_A`
    },
});
  const [userkey, setUserKey] = useState([]);
  const [userpassword, setUserPassword] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [adminData, setAdminData] = useState([]);
  const [admin_id, setAdminId] = useState([]);
  const [secondadminInfo, setSecondAdminData] = useState([]);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("User Signin: ", userSignin);
    let myid = userInfo._id;
    setSecondAdminData(myid);
    instance.get("/api/users").then((response) => {
        console.log("Here is my response", response.data);
        let filterResults = response.data.filter((x)=>{
            return x.isSecondAdmin == true
         })
        setAdminData(filterResults);
      })
    instance.get("/api/connection").then((response) => {
        console.log("Here is my response", response.data);
        let filterResults = response.data
        setUsersData(filterResults);
      })
}, []);

  const handleSubmit= (e) => {
    alert("Dev")
    console.log(`Here id admin id: ${admin_id}`);
    e.preventDefault();
    // if(validateUserKey[0].key != userkey){
    //   instance.post(`/api/connection`, {
    //     "secondAdmin": secondadminInfo,
    //     "key": userkey,
    //     "password": userpassword,
    //     headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWQ3ZmQ5NWU5OWI4ZmJhMTk0YWMyMTEiLCJuYW1lIjoiUmFiaWEgSW1yYW4iLCJlbWFpbCI6ImF6YW4ucmFiaWExQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlzU2VsbGVyIjpmYWxzZSwiaWF0IjoxNjQyNDEwNjcwLCJleHAiOjE2NDUwMDI2NzB9.jLLFtH_o72m7G60rvAZjO43imhKEgZjUfxoaXy1ik_A` },
    // })  
    // }
    // if(validateUserKey[0].key === userkey){
    //   instance.put(`/api/connection/${validateUserKey[0]._id}`, {
    //     "secondAdmin": secondadminInfo,
    //     "key": userkey,
    //     "password": userpassword,
    //     headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWQ3ZmQ5NWU5OWI4ZmJhMTk0YWMyMTEiLCJuYW1lIjoiUmFiaWEgSW1yYW4iLCJlbWFpbCI6ImF6YW4ucmFiaWExQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlzU2VsbGVyIjpmYWxzZSwiaWF0IjoxNjQyNDEwNjcwLCJleHAiOjE2NDUwMDI2NzB9.jLLFtH_o72m7G60rvAZjO43imhKEgZjUfxoaXy1ik_A` },
    // })  
    // }
   
    

    props.hitSidebar()

  }
  //  const validateKeyFunc = () =>{
  //   alert("Test")
  //   console.log("Here is my User List:", usersData);
  //   let validateUserKey = usersData.filter((x) =>{
  //     return x.key === userkey
  //    })
  //    console.log("Validate User Key: ", validateUserKey);
  //    if(userkey == validateUserKey[0].key){
  //      console.log("User Exist");
  //    }
  //    else{
  //      console.log("User didn't exist.");
  //    }
  // }
  function handleChange(event) {
    alert("test")
    console.log(event.target.value);
  }
  return (
    <form onSubmit={e => { handleSubmit(e) }} style={{padding: "10px"}}>
    <h1 className='RA-13-add-user-sidebar RA-13-form-heading'> {
      props.adminId == undefined ? "Add user for second admin" : "Edit Connected User"
    } </h1>
    <br />
    {/* <div className='form-group'> 
    <label htmlFor="title"><b>Select Admin</b></label> <br /> 
    <select onChange={e => setAdminId(e.target.value)} style={{width: "100%"}}>
      {
     adminData.map((option) => {
      return <option key={option._id} value={option._id}>{option.name}</option>
     })
      }

    </select>
   </div> */}
   <br />
   {/* <div className='form-group'>
    <label htmlFor="title"><b>User Key</b></label>
    <input className='form-control' type="text" name="key" id="key" placeholder='User Key'  onChange={handleChange} />
   </div>
    <br />
   <div className='form-group'>
    <label htmlFor="title"><b>Password</b></label>
    <input className='form-control' type="password" name="password" id="password" placeholder='Password' onChange={e => setUserPassword(e.target.value)}/>
   </div> */}
  <br /> 
   <div className='float-right'>
  <button className='RA-13-btn'>Submit</button>
   </div>
  </form>
  )
}

export default AddConnectedUser