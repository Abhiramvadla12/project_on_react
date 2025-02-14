import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './register.css';
import Image from '../images/google.webp';
// import { CircularProgress } from "@mui/material";
import { Button, Input } from "@mui/material";
import styled from "styled-components";
import { initializeApp } from "firebase/app";
// import LogoImg from "../images/login_logo.jpeg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
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
function Register({ darkMode }) {
  const [state, setState] = useState({ username: "", password: "", email: "" });
  // const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const [login_details_data,setLoginDetails] = useState([]);
  // const [google_signups_data, setGooleSignupsData] = useState([]);
  // useEffect(() => {
  //   setLoading(true)
  //     const login_data = async () => {
  //         try {
  //             let res = await fetch("https://podcast-login-details-mongodb.onrender.com/login");
  //             if (!res.ok) {
  //                 throw new Error(`HTTP error! Status: ${res.status}`);
  //             }
  //             let data = await res.json();
  //             setLoading(false)
  //             // console.log(data);
  //             setLoginDetails(data)
  //             if (data.length === 0) {
  //                 console.log("No login details found.");
  //             }
  //         } catch (err) {
  //             console.log("Error in fetching", err);
  //         }
  //         setLoading(false)
  //     };
  //     login_data();
  // }, []);  // This will run only once when the component mounts

  // useEffect(() => {
  //   const google_signups_data = async () => {
  //     setLoading(true)
  //     try {
  //       let res = await fetch("https://google-signup-mongodb.onrender.com/login");
  //       if (!res.ok) {
  //         throw new Error(`HTTP error! Status: ${res.status}`);
  //       }
  //       let data = await res.json();
  //       setLoading(false)
  //       // console.log(data);
  //       setGooleSignupsData(data);
  //       if (data.length === 0) {
  //         console.log("No login details found.");
  //       }
  //     } catch (err) {
  //       console.log("Error in fetching", err);
  //     }
  //     setLoading(false)
  //   };
  //   google_signups_data();
  // }, []);
  // // Validate inputs with regex

  const validateInputs = () => {
    const { username, password, email } = state;
    // let newErrors = {};

    // Username validation (3-15 characters, letters, numbers, or underscores)
    const usernameRegex = /^[a-zA-Z0-9_ ]{3,15}$/;
    if (!username || !usernameRegex.test(username)) {
      // newErrors.username = "Invalid Username: Use 3-15 characters (letters, numbers, or underscores).";
      toast.error("Invalid Username: Use 3-15 characters (letters, numbers, or underscores).");
      return false;
    }

    // Email validation (valid email format)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      // newErrors.email = "Invalid Email: Enter a valid email address.";
      toast.error("Invalid Email: Enter a valid email address.");
      return false;

    }

    // Password validation (min 8 characters, 1 letter, 1 number, and 1 special character)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password || !passwordRegex.test(password)) {
      // newErrors.password = "Invalid Password: Must be at least 8 characters, with at least 1 letter, 1 number, and 1 special character (@, $, !, %, *, ?, &).";
      toast.error("Invalid Password: Must be at least 8 characters, with 1 letter, 1 number, and 1 special character.");
      return false;
    }
    return true;
    // setErrors(newErrors);
    // return Object.keys(newErrors).length === 0;
  };

  // OTP generation function
  const generateOtp = () => {
    let otp = '';
    for (let i = 0; i < 4; i++) {
      otp += Math.floor(Math.random() * 10);
    }
    return otp;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateInputs()) return;
  
    const { username, password, email } = state;
    const otp = generateOtp(); // Ensure this function is defined
    localStorage.setItem("otp", JSON.stringify(otp)); // Temporarily store OTP
  
    toast.success("Please wait while we process your request...");
    setLoading(true);
  
    try {
      // Send OTP via email
      const otpResponse = await fetch("https://node-post-deploy.onrender.com/api/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });
  
      if (!otpResponse.ok) {
        const errorData = await otpResponse.json();
        throw new Error(errorData.error || "Failed to send OTP. Please try again.");
      }
  
      // Register the user in MongoDB
      const res = await fetch("https://podcast-login-details-mongodb.onrender.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, email }),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to register user in database.");
      }
  
      toast.success("Registration successful! Redirecting to OTP verification...");
      
      setTimeout(() => {
        navigate("/otp", { state: { user: { username, password, email } } });
      }, 2000); // Delay for better UX
    } catch (error) {
      console.error("❌ Error:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  

 

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      const newGoogleUser = {
        username: user.displayName || "Google User",
        email: user.email,
      };
  
      try {
        setLoading(true);
  
        const res = await fetch("https://google-signup-mongodb.onrender.com/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newGoogleUser),
        });
  
        const responseData = await res.json();
  
        if (res.status === 409) {
          toast.success("This Google account is already registered. Redirecting to login...");
          console.log("User exists, toast should be showing...");
          setTimeout(() => navigate("/login"), 3000); // Delay to show toast
          return;
        }
  
        if (!res.ok) {
          throw new Error(responseData.error || "Failed to register Google user in database.");
        }
  
        toast.success("Google sign-up successful. Redirecting to login...");
        console.log("Toast should be showing...");
        setTimeout(() => navigate("/login"), 3000);
      } catch (err) {
        console.error("Error registering Google user:", err);
        toast.error(err.message || "An error occurred while registering with Google. Please try again.");
      } finally {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error signing up with Google:", error);
      toast.error("There was an issue signing up with Google. Please try again.");
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
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      {loading ? (
        (
          <Loader>
            <Spinner>

            </Spinner>
            {/* <CircularProgress /> */}
          </Loader>)
      ) : (
        < div className="form-container" style={{ overflowX: "hidden", overflowY: "scroll" }}>

          <form onSubmit={handleSubmit} className="form">
            <div className="loginTop" style={{ textAlign: "center" }}>
              {/* <img src={LogoImg} alt="image not found" style={{height:"60px",width:"60px",borderRadius:"50%"}} /> */}
              <span style={{ color: darkMode ? "#15c6ed" : "#a20afa", fontSize: "1.75em", fontWeight: "bolder", marginLeft: "8px", textAlign: "center" }}>Register </span><br />
            </div>
            <label htmlFor="username" className="label" style={{ color: darkMode ? "#15c6ed" : "#a20afa" }}>Username</label>
            <Input
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username..."
              value={username}
              onChange={handleChange}
              className="input"
            />
            {/* {errors.username && <p style={{ color: "red",fontSize:"0.8em" }}>{errors.username}</p>} */}

            <label htmlFor="password" className="label" style={{ color: darkMode ? "#15c6ed" : "#a20afa" }}>Password</label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password..."
              value={password}
              onChange={handleChange}
              className="input"
            />
            {/* {errors.password && <p style={{ color: "red",fontSize:"0.8em" }}>{errors.password}</p>} */}

            <label htmlFor="email" className="label" style={{ color: darkMode ? "#15c6ed" : "#a20afa" }}>Email</label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email..."
              value={email}
              onChange={handleChange}
              className="input"
            />
            {/* {errors.email && <p style={{ color: "red",fontSize:"0.8em" }}>{errors.email}</p>} */}
            
              <Button type="submit" id="submit" variant="contained" style={{padding: "0.7em 6.45em 0.7em 9em",marginTop:"5px"}}>
                Register
              </Button>
           
            <hr />
            <div className="google_button">
              <img src={Image} alt="Google" style={{ height: "40px", width: "40px" }} />
              <button
                onClick={handleGoogleSignUp}
                id="signUp"
                style={{ border: "none", outline: "none", backgroundColor: "white" }}
                type="button"
              >
                Sign Up With Google
              </button>
            </div> <br />
            <Link to={'/login'} style={{color: "white"}}>Go To Login </Link>
          </form>
        </div>


      )
      }

    </>
  );
}
export default Register;
