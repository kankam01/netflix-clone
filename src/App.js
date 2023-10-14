import React, { useEffect } from 'react';
import './App.css';
import Homescreen from './screens/Homescreen';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Loginscreen from './screens/Loginscreen';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import Profilescreen from './Profilescreen';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        //Logged in
        dispatch(
          login({
          uid: userAuth.uid,
          email: userAuth.email
        }))
    } else {
      //Logged out
      dispatch(logout());
      }
    })

    return () => {
      unsubscribe();
    }

  }, [dispatch]);


  return (
    <div className="app">
      <Router>
        {!user ? (
          <Loginscreen />
        ): (
          <Routes>
            <Route path="/profile" element={ <Profilescreen /> } />
            <Route exact path='/' element={ <Homescreen /> }>
            </Route>
          </Routes>
        )}
        </Router>
    </div>
  );
  
}

export default App;
