import React from 'react';
import "./header.css"
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../actions/userActions';
import {  Link } from 'react-router-dom';

export default function Header() {

 const cart = useSelector((state) => state.cart);
 const userSignin = useSelector((state) => state.userSignin);
 const { userInfo } = userSignin;
 const dispatch = useDispatch();
 const signoutHandler = () => {
   dispatch(signout());
 };

 React.useEffect(() => {
}, []);
console.log("Admin Information: ", userSignin);
  return (
 <>
  <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow" style={{height: "6rem"}}>
  <Link className="brand ml-3" to="/signin">
              GW-<span style={{color: "#ffa615"}}>Tech 
              {
                userSignin.userInfo.isSecondAdmin == true ? <span>
                   / <span className='RA-13-span-sub-admin'>{userSignin.userInfo.name}</span>
                </span>
                :""
              }</span>
            </Link>
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
        {userInfo ? (
              <div className="dropdown">
                  <li>
                    <Link to="#signout" onClick={signoutHandler} className='RA-13-signout-btn'>
                      Sign Out
                    </Link>
                  </li>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            {userInfo && userInfo.isSeller && (
              <div className="dropdown">
                <Link to="#admin">
                  Seller <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/productlist/seller">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist/seller">Orders</Link>
                  </li>
                </ul>
              </div>
            )}
            {userInfo && userInfo.isAdmin && (
            
              <div></div>
            )}
        </li>
      </ul>
    </nav>
 </>

  );
}
