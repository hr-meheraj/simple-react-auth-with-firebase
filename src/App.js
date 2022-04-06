import React,{useState} from 'react'
import {getAuth,GoogleAuthProvider,signInWithPopup,signOut } from 'firebase/auth'
import './App.css';
import app from './firebase.config'

function App() {
    const [user,setUser] = useState({});
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const handleGoogleSignIn = () => {
        signInWithPopup(auth,googleProvider)
        .then( result => {
            setUser(result.user);
            console.log(result.user);
        })
        .catch(err => console.log(err.message));
    }
    const hangleSignOut = () => {
        signOut(auth)
        .then( () => {
            setUser({});
            console.log("Successfully User Signout")
        })
        .catch( err => console.log("Sign out : ", err.message));
    }
  return (
    <div className="App">
        {
            user.uid ?  <button onClick={hangleSignOut}> Sign Out </button> : <button onClick={handleGoogleSignIn}>Sign In with Google</button> 
        }
        <div className='card'>
        <h1>Name : {user.displayName}</h1>
        {user.uid && 
        <img src={user.photoURL}/>}
        </div>
    </div>
  );
}

export default App;
