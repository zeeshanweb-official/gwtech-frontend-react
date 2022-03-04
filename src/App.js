import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { signout } from './actions/userActions';
import SigninScreen from './screens/SigninScreen';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import CEOSCREEN from './screens/CEO/CeoScreen';
import { SecondAdmin } from './screens/SecondAdminScreen/SecondAdmin';
import { SecondAdminUsers } from './screens/SecondAdminUsers/SecondAdminUsers';
import { LockAdmin } from './screens/LockAdminScreen/LockAdmin';
import { SeeWinningNumber } from './screens/SeeWinningNumber/SeeWinningNumber';
import { LotteryOpeningScreen } from './screens/LotteryOpenScreen/OpenScreen';
import { AdminSaleReport } from './screens/AdminSaleReportScreen/SaleReportScreen';
import { AdminPaymentSettings } from './screens/AdminPaymentScreen/PaymentScreen';
import { FirstAdminScreen } from './screens/AddFirstAdminScreen/FirstAdminScreen';
import axios from "axios";
import { ConnectedUsers } from './screens/connectedUserScreen/connectedUser';
import { VerifySellingTickets } from './screens/VerifySellingScreen/VerifySellingTickets';
import { VerifySellingReport } from './screens/SeeSellingReportScreen/SeeSellingReport';
import { WinningNumber } from './screens/WinningNumberScreen/WinningNumber';
import { SaleFollowing } from './screens/SaleFollowingScreen/SaleFollowingScreen';

function App() {
  axios.create({
    baseURL: 'https://gwtech-node-app.herokuapp.com',
    headers: {
        Accept: "application/json",
        'content-type':'application/json',
        // 'x-rapidapi-host':'example.com',
        // 'x-rapidapi-key': process.env.RAPIDAPI_KEY
    },
});

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  window.AuthToken = {
   token: userSignin.token
}
  console.log("Here is user info: ", userInfo);
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  return (
    <BrowserRouter>
      <div className="grid-container">
        <main>
          <Routes>
            <Route path="/dashboard" element={<CEOSCREEN />}></Route>
            <Route path="/conncted-users" element={<ConnectedUsers />}></Route>
            <Route path="/verify-selling-tickets" element={<VerifySellingTickets />}></Route>
            <Route path="/verify-selling-report" element={<VerifySellingReport />}></Route>
            <Route path="/second-admin" element={<SecondAdmin />}></Route>
            <Route path="/second-users" element={<SecondAdminUsers />}></Route>
            <Route path="/lock-admin" element={<LockAdmin />}></Route>
            <Route path="/winning-number" element={<WinningNumber />}></Route>
            <Route path="/see-winning-number" element={<SeeWinningNumber />}></Route>
            <Route path="/lottery-opening-closing" element={<LotteryOpeningScreen />}></Route>
            <Route path="/sale-following" element={<SaleFollowing />}></Route>
            <Route path="/admin-sale-report" element={<AdminSaleReport />}></Route>
            <Route path="/admin-payment-settings" element={<AdminPaymentSettings />}></Route>
            <Route path="/first-admin" element={<FirstAdminScreen />}></Route>
            <Route path="/signin" element={<SigninScreen />}></Route>
           
            <Route path="/" element={userInfo && userInfo.isCEO == true ? <SecondAdmin /> : userInfo && userInfo.isSecondAdmin == true ? <ConnectedUsers /> : userInfo && userInfo.isFirstAdmin == true ? <SecondAdminUsers />: <SigninScreen />} exact></Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
