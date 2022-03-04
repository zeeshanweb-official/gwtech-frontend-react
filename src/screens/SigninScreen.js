import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function SigninScreen(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [emailInput, setEmailInput] = useState(true);
  const [nameInput, setNameInput] = useState(false);
  const [password, setPassword] = useState('');
  const [showForm, setShowForm] = useState(true);

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

   function ceoSignin(){
    setEmailInput(true);
    setNameInput(false);
    setShowForm(true);
  }
function otherAdmin(){
    setEmailInput(false);
    setNameInput(true);
    setShowForm(true);
  }
  return (
    <div>
   <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Sign In</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
        <label htmlFor="email">Name*</label>
          <input
            type="name"
            id="name"
            placeholder="Enter Name"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
      
        <div>
          <label htmlFor="password">Password*</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <button className="primary mt-5" type="submit">
            Sign In
          </button>
        </div>
        <div>
          <label />
        </div>
      </form>
    </div>
  );
}
