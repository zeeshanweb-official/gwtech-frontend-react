import React from 'react'
import "./AddLotteryOpen.css"
 const AddLotteryOpen = () => {
  return (
    <form style={{padding: "10px"}}>
      <h1 className='RA-13-add-user-sidebar RA-13-form-heading'> Add User </h1>
      <br />

     <div className='form-group'>
      <label htmlFor="title"><b>Select Admin</b></label>
      <select className='form-control'>
      <option>Select Admin</option>
      <option>Admin 1</option>
      <option>Admin 2</option>
      </select>
     </div>
     <div className='form-group'>
      <label htmlFor="title"><b>User Key</b></label>
      <input className='form-control' type="text" name="name" id="name" placeholder='Company Name'/>
     </div>
     <div className='form-group'>
      <label htmlFor="title"><b>User Password</b></label>
      <input className='form-control' type="password" name="password" id="password" placeholder='Password'/>
     </div>
   
     <br />
     <div className='float-right'>
    <button className='RA-13-btn'>Submit</button>
     </div>
    </form>
  )
}

export default AddLotteryOpen