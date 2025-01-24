import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './register.css';
import Image from '../images/google.webp';
// import { CircularProgress } from "@mui/material";
import styled from "styled-components";
import { initializeApp } from "firebase/app";
import LogoImg from "../images/login_logo.jpeg";
import {
  getAuth,
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
  const Spinner = styled.div`

  --d:22px;
width: 4px;
height: 4px;
border-radius: 50%;
color: #25b09b;
box-shadow: 
  calc(1*var(--d))      calc(0*var(--d))     0 0,
  calc(0.707*var(--d))  calc(0.707*var(--d)) 0 1px,
  calc(0*var(--d))      calc(1*var(--d))     0 2px,
  calc(-0.707*var(--d)) calc(0.707*var(--d)) 0 3px,
  calc(-1*var(--d))     calc(0*var(--d))     0 4px,
  calc(-0.707*var(--d)) calc(-0.707*var(--d))0 5px,
  calc(0*var(--d))      calc(-1*var(--d))    0 6px;
animation: l27 1s infinite steps(8);

@keyframes l27 {
100% {transform: rotate(1turn)}
}
`;
function Register() {
  const [state, setState] = useState({ username: "", password: "", email: "" });
  const [errors, setErrors] = useState({});
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  // Validate inputs with regex
  const validateInputs = () => {
    const { username, password, email } = state;
    let newErrors = {};

    // Username validation (3-15 characters, letters, numbers, or underscores)
    const usernameRegex = /^[a-zA-Z0-9_ ]{3,15}$/;
    if (!username || !usernameRegex.test(username)) {
      newErrors.username = "Invalid Username: Use 3-15 characters (letters, numbers, or underscores).";
    }

    // Email validation (valid email format)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      newErrors.email = "Invalid Email: Enter a valid email address.";
    }

    // Password validation (min 8 characters, 1 letter, 1 number, and 1 special character)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password || !passwordRegex.test(password)) {
      newErrors.password = "Invalid Password: Must be at least 8 characters, with at least 1 letter, 1 number, and 1 special character (@, $, !, %, *, ?, &).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // OTP generation function
  const generateOtp = () => {
    let otp = '';
    for (let i = 0; i < 4; i++) {
      otp += Math.floor(Math.random() * 10);
    }
    return otp;
  };

  // Handle regular registration
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    const { username, password, email } = state;

    const localData = JSON.parse(localStorage.getItem("login_credential")) || [];
    const userFound = localData.some(
      (user) => user.username === username || user.email === email
    );

    if (userFound) {
      alert("User already exists. Please log in.");
      navigate("/login");
    } else {
      const otp = generateOtp();
      localStorage.setItem("otp", JSON.stringify(otp));

      try {
        const response = await fetch("https://node-post-deploy.onrender.com/api/send-otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp }),
        });

        if (response.ok) {
          const newUser = { username, password, email };
          localData.push(newUser);
          localStorage.setItem("login_credential", JSON.stringify(localData));

          alert("Registration successful. Redirecting to OTP verification...");
          setLoading((prev => !prev))
          setTimeout(()=>{
            setLoading((prev => !prev))
            navigate("/otp", { state: { user: newUser } });
          },2000)
         
        } else {
          alert("Failed to send OTP. Please try again.");
        }
      } catch (error) {
        console.error("Error sending OTP:", error);
        alert("An error occurred. Please try again.");
      }
    }
  };

  // Handle Google sign-up
  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if this Google email is already in localStorage under google_signups
      const googleData = JSON.parse(localStorage.getItem("google_signups")) || [];
      const googleUserFound = googleData.some((googleUser) => googleUser.email === user.email);

      if (googleUserFound) {
        alert("This Google account is already registered. Redirecting to login...");
        navigate("/login");
      } else {
        // Save Google user data in a separate localStorage object
        const newGoogleUser = {
          displayName: user.displayName || "Google User", // Use Google display name or fallback
          email: user.email,
        };
        googleData.push(newGoogleUser);
        localStorage.setItem("google_signups", JSON.stringify(googleData));
        navigate("/login");
      }
    } catch (error) {
      console.error("Error signing up with Google:", error);
      alert("There was an issue signing up with Google. Please try again.");
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { username, password, email } = state;

  return (
    <>
      {loading  ? (
              (
                <Loader>
                  <Spinner>

                  </Spinner>
                    {/* <CircularProgress /> */}
                </Loader>)
            ) : (
              <>
                  
                  <form onSubmit={handleSubmit}>
                    <img src={LogoImg} alt="image not found" style={{height:"60px",width:"60px"}} />
                    <span style={{ color: "white",fontSize:"1.75em",fontWeight:"bolder",marginLeft:"8px" }}>Register Page</span><br />
                    <label htmlFor="username">Username:</label>
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
                    <label htmlFor="password">Password:</label>
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
                    <label htmlFor="email">Email:</label>
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
                    <input type="submit" value="Register" id="submit" />
                    <div className="google_button">
                      <img src={Image} alt="Google" style={{ height: "40px", width: "40px" }} />
                      <button
                        onClick={handleGoogleSignUp}
                        id="signUp"
                        style={{ border: "none", outline: "none", backgroundColor: "black", color: "white" }}
                        type="button"
                      >
                        Sign Up With Google
                      </button>
                    </div>
                  </form>
                  </>
                  

            ) 
      }
      
    </>
  );
}

export default Register;
