import React, { useState, useEffect, useRef} from 'react';
import "./LockAdmin.css";
import { Toast } from 'primereact/toast';
import CEOSidebar from '../../menus/CeoSidbarScreen';
import { Dialog } from 'primereact/dialog';
import axios from "axios";
import { useSelector } from 'react-redux';

export function LockAdmin(){
    const instance = axios.create({
        baseURL: 'https://gwtech-node-app.herokuapp.com',
        headers: {
            Accept: "application/json",
            'content-type':'application/json',
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWQ3ZmQ5NWU5OWI4ZmJhMTk0YWMyMTEiLCJuYW1lIjoiUmFiaWEgSW1yYW4iLCJlbWFpbCI6ImF6YW4ucmFiaWExQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlzU2VsbGVyIjpmYWxzZSwiaWF0IjoxNjQyNDEwNjcwLCJleHAiOjE2NDUwMDI2NzB9.jLLFtH_o72m7G60rvAZjO43imhKEgZjUfxoaXy1ik_A`
        },
    });
    const myToastDanger = useRef(null);
    const [displayBasic, setDisplayBasic] = useState(false);
    const [usersData, setUsersData] = useState([]);
    const [user_id, setUserId] = useState([]);
    const [action, setAction] = useState([]);
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const dialogFuncMap = {
        'displayBasic': setDisplayBasic
    }
    useEffect(() => {
        instance.get("/api/connection").then((response) => {
            console.log("Here is my response", response.data);
            let filterResults = response.data
            setUsersData(filterResults);
          })
        dialogFuncMap[`displayBasic`](true);
    } , [])
    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }
    const handleSubmit= (e) => {
        let validateUserKey = usersData.filter((x) =>{
            let userId = user_id;
          return x._id == userId
         })
         console.log("Validate User Key: ", validateUserKey[0]);
      
        
        if(userInfo.isSecondAdmin == false && userInfo.isFirstAdmin == false && userInfo.isCEO == true){
            console.log("User id: ", user_id, action);
            let validateUserKey = usersData.filter((x) =>{
                let userId = user_id;
              return x._id == userId
             })
             console.log("Validate User Key: ", validateUserKey[0]);
             e.preventDefault();
             if(action === "Lock"){
                if(validateUserKey[0].ceoStatus == false && validateUserKey[0].lockStatus == false){
                    instance.put(`/api/connection/${validateUserKey[0]._id}`, {
                      "secondAdmin": validateUserKey[0].secondAdmin,
                      "key": validateUserKey[0].key,
                      "password": validateUserKey[0].password,
                      "ceoStatus": true,
                      "lockStatus": true,
                      headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWQ3ZmQ5NWU5OWI4ZmJhMTk0YWMyMTEiLCJuYW1lIjoiUmFiaWEgSW1yYW4iLCJlbWFpbCI6ImF6YW4ucmFiaWExQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlzU2VsbGVyIjpmYWxzZSwiaWF0IjoxNjQyNDEwNjcwLCJleHAiOjE2NDUwMDI2NzB9.jLLFtH_o72m7G60rvAZjO43imhKEgZjUfxoaXy1ik_A` },
                  })  
                  myToastDanger.current.show({severity: "error", summary: "Error Message", detail: "User Locked Sucessfully..."});
                  }
             }
             if(action === "UnLock"){
                if(validateUserKey[0].ceoStatus == true && validateUserKey[0].lockStatus == true){
                    instance.put(`/api/connection/${validateUserKey[0]._id}`, {
                      "secondAdmin": validateUserKey[0].secondAdmin,
                      "key": validateUserKey[0].key,
                      "password": validateUserKey[0].password,
                      "ceoStatus": false,
                      "lockStatus": false,
                      headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWQ3ZmQ5NWU5OWI4ZmJhMTk0YWMyMTEiLCJuYW1lIjoiUmFiaWEgSW1yYW4iLCJlbWFpbCI6ImF6YW4ucmFiaWExQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlzU2VsbGVyIjpmYWxzZSwiaWF0IjoxNjQyNDEwNjcwLCJleHAiOjE2NDUwMDI2NzB9.jLLFtH_o72m7G60rvAZjO43imhKEgZjUfxoaXy1ik_A` },
                  })  
                  myToastDanger.current.show({severity: "success", summary: "Sucess Message", detail: "User Unlocked Sucessfully..."});
                  }
             }
        }

           if(validateUserKey[0].ceoStatus == true && userInfo.isFirstAdmin == true || userInfo.isSecondAdmin == true){
            myToastDanger.current.show({severity: "error", summary: "Error Message", detail: "You cannot Lock/Unlock the User. Kindly Contact to CEO."});
         }
       
         if(validateUserKey[0].ceoStatus == false && userInfo.isSecondAdmin == true && userInfo.isFirstAdmin == false && userInfo.isCEO == false){
            console.log("User id: ", user_id, action);
            let validateUserKey = usersData.filter((x) =>{
                let userId = user_id;
              return x._id == userId
             })
             console.log("Validate User Key: ", validateUserKey[0]);
             e.preventDefault();
             if(action === "Lock"){
                if(validateUserKey[0].ceoStatus == false && validateUserKey[0].lockStatus == false){
                    instance.put(`/api/connection/${validateUserKey[0]._id}`, {
                      "secondAdmin": validateUserKey[0].secondAdmin,
                      "key": validateUserKey[0].key,
                      "password": validateUserKey[0].password,
                      "ceoStatus": false,
                      "lockStatus": true,
                      headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWQ3ZmQ5NWU5OWI4ZmJhMTk0YWMyMTEiLCJuYW1lIjoiUmFiaWEgSW1yYW4iLCJlbWFpbCI6ImF6YW4ucmFiaWExQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlzU2VsbGVyIjpmYWxzZSwiaWF0IjoxNjQyNDEwNjcwLCJleHAiOjE2NDUwMDI2NzB9.jLLFtH_o72m7G60rvAZjO43imhKEgZjUfxoaXy1ik_A` },
                  })  
                  myToastDanger.current.show({severity: "error", summary: "Error Message", detail: "User Locked Sucessfully..."});
                  }
             }
             if(action === "UnLock"){
                if(validateUserKey[0].ceoStatus == false && validateUserKey[0].lockStatus == true){
                    instance.put(`/api/connection/${validateUserKey[0]._id}`, {
                      "secondAdmin": validateUserKey[0].secondAdmin,
                      "key": validateUserKey[0].key,
                      "password": validateUserKey[0].password,
                      "ceoStatus": false,
                      "lockStatus": false,
                      headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWQ3ZmQ5NWU5OWI4ZmJhMTk0YWMyMTEiLCJuYW1lIjoiUmFiaWEgSW1yYW4iLCJlbWFpbCI6ImF6YW4ucmFiaWExQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlzU2VsbGVyIjpmYWxzZSwiaWF0IjoxNjQyNDEwNjcwLCJleHAiOjE2NDUwMDI2NzB9.jLLFtH_o72m7G60rvAZjO43imhKEgZjUfxoaXy1ik_A` },
                  })  
                  myToastDanger.current.show({severity: "success", summary: "Sucess Message", detail: "User Unlocked Sucessfully..."});
                  }
             }
        }
        if( validateUserKey[0].ceoStatus == false && userInfo.isSecondAdmin == false && userInfo.isFirstAdmin == true && userInfo.isCEO == false){
            console.log("User id: ", user_id, action);
            let validateUserKey = usersData.filter((x) =>{
                let userId = user_id;
              return x._id == userId
             })
             console.log("Validate User Key: ", validateUserKey[0]);
             e.preventDefault();
             if(action === "Lock"){
                if(validateUserKey[0].ceoStatus == false && validateUserKey[0].lockStatus == false){
                    instance.put(`/api/connection/${validateUserKey[0]._id}`, {
                      "secondAdmin": validateUserKey[0].secondAdmin,
                      "key": validateUserKey[0].key,
                      "password": validateUserKey[0].password,
                      "ceoStatus": false,
                      "lockStatus": true,
                      headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWQ3ZmQ5NWU5OWI4ZmJhMTk0YWMyMTEiLCJuYW1lIjoiUmFiaWEgSW1yYW4iLCJlbWFpbCI6ImF6YW4ucmFiaWExQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlzU2VsbGVyIjpmYWxzZSwiaWF0IjoxNjQyNDEwNjcwLCJleHAiOjE2NDUwMDI2NzB9.jLLFtH_o72m7G60rvAZjO43imhKEgZjUfxoaXy1ik_A` },
                  })  
                  myToastDanger.current.show({severity: "error", summary: "Error Message", detail: "User Locked Sucessfully..."});
                  }
             }
             if(action === "UnLock"){
                if(validateUserKey[0].ceoStatus == false && validateUserKey[0].lockStatus == true){
                    instance.put(`/api/connection/${validateUserKey[0]._id}`, {
                      "secondAdmin": validateUserKey[0].secondAdmin,
                      "key": validateUserKey[0].key,
                      "password": validateUserKey[0].password,
                      "ceoStatus": false,
                      "lockStatus": false,
                      headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWQ3ZmQ5NWU5OWI4ZmJhMTk0YWMyMTEiLCJuYW1lIjoiUmFiaWEgSW1yYW4iLCJlbWFpbCI6ImF6YW4ucmFiaWExQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlzU2VsbGVyIjpmYWxzZSwiaWF0IjoxNjQyNDEwNjcwLCJleHAiOjE2NDUwMDI2NzB9.jLLFtH_o72m7G60rvAZjO43imhKEgZjUfxoaXy1ik_A` },
                  })  
                  myToastDanger.current.show({severity: "success", summary: "Sucess Message", detail: "User Unlocked Sucessfully..."});
                  }
             }
        }
       
         
             
       }
    return (
      <>
      <Toast ref={myToastDanger}></Toast>
      <CEOSidebar />

      <Dialog header="Lock User" visible={displayBasic} style={{ width: '50vw' }}  onHide={() => onHide('displayBasic')}>
      <form onSubmit={e => { handleSubmit(e) }} style={{padding: "10px"}} autocomplete="off">
                <br />
             <div className='form-group'> 
                <label htmlFor="title"><b>Select User</b></label> <br /> 
                <select onChange={e => setUserId(e.target.value)} style={{width: "100%"}}>
                <option value=""></option>
                {
                usersData.map((option) => {
                return <option key={option._id} value={option._id}>{option.key}</option>
                })
                }

                </select>
               </div>

                <div className='form-group'> 
                <label htmlFor="title"><b>Action</b></label> <br /> 
                <select onChange={e => setAction(e.target.value)} style={{width: "100%"}}>
                <option value=""></option>
                <option value="Lock">Lock</option>
                <option value="UnLock">Unlock</option>
                </select>
                </div>

            <br /> 
            <div className='float-right'>
            <button className='RA-13-btn'>Submit</button>
            </div>
            </form>  
       </Dialog>
      </>
        
    );
}

