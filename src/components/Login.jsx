import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import './login.css';
import styled from "styled-components";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import Image from '../images/google.webp';
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import LogoImg from "../images/login_logo.jpeg";
import PropTypes from 'prop-types';

import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup, 
  GoogleAuthProvider,
} from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCayPz9j7ZWp52OBXbVD1imtb-zmW2yQ7k",
  authDomain: "sign-project-12ec6.firebaseapp.com",
  projectId: "sign-project-12ec6",
  storageBucket: "sign-project-12ec6.firebaseapp.com",
  messagingSenderId: "180719521684",
  appId: "1:180719521684:web:d5b424ba6034012e018981",
  measurementId: "G-6FV3NN9MZQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();



const Loader = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;

  `;


function Login({ onLogin}) {
  const navigate = useNavigate(); // Initialize useNavigate

  const [state, setState] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [loading,setLoading] = useState(false);
  const [errors, setErrors] = useState({}); // State to store validation errors
  const validateFields = () => {
    const { username, password, email } = state;
    const newErrors = {};

    const usernameRegex = /^[a-zA-Z0-9_ ]{3,15}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!username || !usernameRegex.test(username)) {
      newErrors.username = "Invalid Username: Use 3-15 characters (letters, numbers, or underscores).";
    }

    if (!email || !emailRegex.test(email)) {
      newErrors.email = "Invalid Email: Enter a valid email address.";
    }

    if (!password || !passwordRegex.test(password)) {
      newErrors.password =
        "Invalid Password: Must be at least 8 characters, with at least 1 letter, 1 number, and 1 special character (@, $, !, %, *, ?, &).";
    }

    return newErrors;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateFields();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Set errors in state
      return;
    }
    setErrors({}); // Clear errors if validation passes
    const obj = { username, password, email };
    const localData = JSON.parse(localStorage.getItem("login_credential")) || [];
    const userFound = localData.some(
      (user) =>
        user.username === obj.username &&
        user.password === obj.password &&
        user.email === obj.email
    );

    if (userFound) {
      alert("Login successful. Redirecting to the home page in 3 seconds...");
      onLogin(true); // Notify parent component of login success
      setLoading((prev => !prev))
      localStorage.setItem("display", JSON.stringify(obj));
      setTimeout(() => {
        setLoading((prev => !prev))
        navigate("/"); // Redirect to the home page
      }, 3000);

    } else {
      if (confirm("User not found. Do you want to register?")) {
        setLoading((prev => !prev))
        setTimeout(() => {
          setLoading((prev => !prev))
          navigate("/register"); // Redirect to the Register page
        }, 3000);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [user, setUser] = useState(null);

  // Handle authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const googleUser = result.user;
      
      // Check if the Google email exists in localStorage under google_signups
      const googleData = JSON.parse(localStorage.getItem("google_signups")) || [];
      const googleUserFound = googleData.some(user => user.email === googleUser.email);
      const obj = {
        username: user.displayName || "Google User", // Use Google display name or fallback
        email: user.email,
      };
      localStorage.setItem("display",JSON.stringify(obj))

      if (googleUserFound) {
        alert("Login successful with Google. Redirecting to the home page...");
        onLogin(true); // Notify parent component of login success
        navigate('/');
      } else {
        alert("Google account not found in the system. Please register first.");
        setLoading((prev => !prev))
        setTimeout(() => {
          setLoading((prev => !prev))
          navigate("/register"); // Redirect to the Register page if the Google account is not found
        }, 3000);
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
      alert("There was an error signing in with Google.");
    }
  };
  
 
  const { username, password, email } = state;
  
  return (
    <>
      {loading  ? (
        (
          <Loader>
              <CircularProgress />
          </Loader>)
      ) : (
             <div  >
                
                <form onSubmit={handleSubmit}  >
                  <img src={LogoImg} alt="image not found" style={{height:"60px",width:"60px"}} />
                  <span style={{ color: "white",fontSize:"1.75em",fontWeight:"bolder",marginLeft:"8px" }}>Login Page</span><br />
                  <label htmlFor="username" >Username:</label><br />
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Enter your username..."
                    value={username}
                    onChange={handleChange}
                  />
                   {errors.username && <p style={{ color: "aqua" }}>{errors.username}</p>}
                  <br />
                  <label htmlFor="password">Password:</label><br />
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password..."
                    value={password}
                    onChange={handleChange}
                  />
                  {errors.password && <p style={{ color: "aqua" }}>{errors.password}</p>}
                  <br />
                  <label htmlFor="email">Email: </label><br />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email..."
                    value={email}
                    onChange={handleChange}
                  />
                   {errors.email && <p style={{ color: "aqua" }}>{errors.email}</p>}
                  <br />
                  <input type="submit" value="Login" id="submit" /> <br />

                  <div className="google_button" style={{textAlign: "center"}}>
                    <img src={Image} alt="image not Found" style={{ height: "40px", width: "40px" }} />
                    <button onClick={signInWithGoogle} id="signIn" style={{ border: "none", outline: "none", backgroundColor: "black", color: "white" ,textAlign: "center"}} type="button">
                      Sign In With Google
                    </button>
                  </div><br />
                  <button style={{backgroundColor: "blue",borderRadius: "10px"}}><Link to={"/register"} style={{color: "aqua",textDecoration:"none",fontSize:"16px"}}>Create an account ?</Link></button>
                </form>
             </div> 
      
        )
      }
    
    </>
  );
}

export default Login;

Login.propTypes = {
  onLogin: PropTypes.func.isRequired, // Validate that onLogin is a function and required
};

