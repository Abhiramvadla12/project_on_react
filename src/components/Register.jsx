import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import './register.css';
import Image from '../images/google.webp';
import { initializeApp } from "firebase/app";
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

function Register() {
  const [state, setState] = useState({ username: "", password: "", email: "" });
  const navigate = useNavigate();

  // Handle registration form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password, email } = state;

    if (!username || !password || !email) {
      alert("Please fill in all fields.");
      return;
    }

    const localData = JSON.parse(localStorage.getItem("login_credential")) || [];
    const userFound = localData.some(
      (user) => user.username === username && user.email === email
    );

    if (userFound) {
      alert("User already exists. Please log in.");
      navigate("/login");
    } else {
      const newUser = { username, password, email };
      localData.push(newUser);
      localStorage.setItem("login_credential", JSON.stringify(localData));

      function generateOtp() {
        let otp = '';
        for (let i = 0; i < 4; i++) {
          otp += Math.floor(Math.random() * 10);
        }
        return otp;
      }

      const otp = generateOtp();
      localStorage.setItem("otp", JSON.stringify(otp));
      alert("Registration successful. Redirecting to OTP verification in 3 seconds...");
      setTimeout(() => {
        navigate("/otp", { state: { user: newUser } });
      }, 3000);
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
      <h1 style={{ color: "white" }}>Register</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Enter your username..."
          value={username}
          onChange={handleChange}
        />
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
        <br />
        <input type="submit" value="Register" id="submit" />
        <div className="google_button">
          <img src={Image} alt="image not Found" style={{height: "40px", width:"40px"}} />
          <button onClick={handleGoogleSignUp} id="signUp"  style={{border: "none", outline:"none",backgroundColor: "black",color:"white"}} type="button">Sign Up With Google</button>
        </div>
      </form>
      
    </>
  );
}

export default Register;
