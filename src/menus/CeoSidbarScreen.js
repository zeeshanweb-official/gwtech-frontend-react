import React from 'react';
// import { DataTablePaginatorDemo } from '../SecondAdminScreen/SecondAdmin';
import "./CeoSidebar.css"
import { NavLink } from 'react-router-dom'
import Header from "../header/header";
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../actions/userActions';
export default function CEOSidebar() {

  const cart = useSelector((state) => state.cart);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
 
  React.useEffect(() => {
 }, []);

 React.useEffect(() => {
    document.querySelector('.sidebar').classList.add('show');

}, []);

  return (
 <>
 <div>
 <Header />
<div id="wrapper">
     <div id="sidebar-wrapper">
       <nav className="sidebar">
       {userInfo && userInfo.isCEO && (
             <div>

    <NavLink to="/second-admin" className="menu-item"   activeClassName="active">
      <p className='RA-13-brder RA-13-sidebar-li'> <i className='fas fa-user-shield RA-13-sidebar-icn'></i> Add Second Admin</p>
    </NavLink>

    <NavLink to="/second-users" className="menu-item"   activeClassName="active">
    <p className='RA-13-brder RA-13-sidebar-li'> <i className='fas fa-users RA-13-sidebar-icn'></i> Add User for 2nd Admin</p>
    </NavLink>

    <NavLink to="/lock-admin" className="menu-item"   activeClassName="active">
    <p className='RA-13-brder RA-13-sidebar-li'> <i className='fas fa-lock RA-13-sidebar-icn'></i> Lock/Unlock Admin</p>
    </NavLink>

    <NavLink to="/winning-number" className="menu-item"   activeClassName="active">
    <p className='RA-13-brder RA-13-sidebar-li'> <i className='fas fa-trophy RA-13-sidebar-icn'></i> Add Winning Number</p>
    </NavLink>

    <NavLink to="/lottery-opening-closing" className="menu-item"   activeClassName="active">
    <p className='RA-13-brder RA-13-sidebar-li'> <i className='fas fa-times-circle RA-13-sidebar-icn'></i> Open/close Lottery Time</p>
    </NavLink>

    <NavLink to="/admin-sale-report" className="menu-item"   activeClassName="active">
    <p className='RA-13-brder RA-13-sidebar-li'> <i className='fas fa-file-alt RA-13-sidebar-icn'></i> See Admin Sale Report</p>
    </NavLink>

    <NavLink to="/first-admin" className="menu-item"   activeClassName="active">
    <p className='RA-13-brder RA-13-sidebar-li'> <i className='fas fa-user-shield RA-13-sidebar-icn'></i> Add First Admin</p>
    </NavLink>
    
             </div>
            )}
       {userInfo && userInfo.isSecondAdmin && (
             <div>
                <NavLink to="/conncted-users" className="menu-item"   activeClassName="active">
       <p className='RA-13-brder RA-13-sidebar-li RA-13-active-menu'> <i className='fas fa-tachometer-alt RA-13-sidebar-icn'></i> Connected User</p>
    </NavLink>

    <NavLink to="/sale-following" className="menu-item"   activeClassName="active">
      <p className='RA-13-brder RA-13-sidebar-li'> <i className='fas fa-user-shield RA-13-sidebar-icn'></i> Sale Following</p>
    </NavLink>

    <NavLink to="/verify-selling-report" className="menu-item"   activeClassName="active">
    <p className='RA-13-brder RA-13-sidebar-li'> <i className='fas fa-lock RA-13-sidebar-icn'></i>See Selling Report</p>
    </NavLink>

    {/* <NavLink to="/winning-number" className="menu-item"   activeClassName="active">
    <p className='RA-13-brder RA-13-sidebar-li'> <i className='fas fa-trophy RA-13-sidebar-icn'></i>Company Setting</p>
    </NavLink> */}

    <NavLink to="/see-winning-number" className="menu-item"   activeClassName="active">
    <p className='RA-13-brder RA-13-sidebar-li'> <i className='fas fa-sort-numeric-up-alt RA-13-sidebar-icn'></i> See Winning Number</p>
    </NavLink>


        <NavLink to="/admin-payment-settings" className="menu-item"   activeClassName="active">
    <p className='RA-13-brder RA-13-sidebar-li'> <i className='fas fa-money-check-alt RA-13-sidebar-icn'></i> Payment Conditions</p>
    </NavLink>


    <NavLink to="/lottery-opening-closing" className="menu-item"   activeClassName="active">
    <p className='RA-13-brder RA-13-sidebar-li'> <i className='fas fa-times-circle RA-13-sidebar-icn'></i>See Winning Tickets</p>
    </NavLink>

    <NavLink to="/admin-sale-report" className="menu-item"   activeClassName="active">
    <p className='RA-13-brder RA-13-sidebar-li'> <i className='fas fa-file-alt RA-13-sidebar-icn'></i>Winning Bets</p>
    </NavLink>

    <NavLink to="/verify-selling-tickets" className="menu-item"   activeClassName="active">
    <p className='RA-13-brder RA-13-sidebar-li'> <i className='fas fa-money-check-alt RA-13-sidebar-icn'></i>Verify Selling Tickets</p>
    </NavLink>

    <NavLink to="/lock-admin" className="menu-item"   activeClassName="active">
    <p className='RA-13-brder RA-13-sidebar-li'> <i className='fas fa-lock RA-13-sidebar-icn'></i> Lock/Unlock Admin</p>
    </NavLink>

    <NavLink to="/first-admin" className="menu-item"   activeClassName="active">
    <p className='RA-13-brder RA-13-sidebar-li'> <i className='fas fa-user-shield RA-13-sidebar-icn'></i>Add Limit</p>
    </NavLink>

    <NavLink to="/first-admin" className="menu-item"   activeClassName="active">
    <p className='RA-13-brder RA-13-sidebar-li'> <i className='fas fa-user-shield RA-13-sidebar-icn'></i>Group Setting</p>
    </NavLink>
    
             </div>
            )}


{userInfo && userInfo.isFirstAdmin && (
             <div>

    <NavLink to="/second-users" className="menu-item"   activeClassName="active">
    <p className='RA-13-brder RA-13-sidebar-li'> <i className='fas fa-users RA-13-sidebar-icn'></i> Add User for 2nd Admin</p>
    </NavLink>

    <NavLink to="/lock-admin" className="menu-item"   activeClassName="active">
    <p className='RA-13-brder RA-13-sidebar-li'> <i className='fas fa-lock RA-13-sidebar-icn'></i> Lock/Unlock Admin</p>
    </NavLink>

    <NavLink to="/winning-number" className="menu-item"   activeClassName="active">
    <p className='RA-13-brder RA-13-sidebar-li'> <i className='fas fa-trophy RA-13-sidebar-icn'></i> Add Winning Number</p>
    </NavLink>

    <NavLink to="/admin-sale-report" className="menu-item"   activeClassName="active">
    <p className='RA-13-brder RA-13-sidebar-li'> <i className='fas fa-file-alt RA-13-sidebar-icn'></i> See Admin Sale Report</p>
    </NavLink>


    
             </div>
            )}    
       </nav>
     </div>
     <div id="page-content-wrapper">

       {/* <DataTablePaginatorDemo /> */}

     

      </div>


   </div>
 </div>

 </>

  );
}
