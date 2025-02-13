import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import './login.css';
import styled from "styled-components";
// import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import Image from '../images/google.webp';
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
// import LogoImg from "../images/login_logo.jpeg";
import { Button, Input } from "@mui/material";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

function Login({ onLogin, onAdminLogin, darkMode }) {
  const navigate = useNavigate(); // Initialize useNavigate

  const [state, setState] = useState({
    username: "",
    password: "",

  });
  const [loading, setLoading] = useState(false);
  // const [errors, setErrors] = useState({}); // State to store validation errors
  // const [login_details_data, setLoginDetails] = useState([]);
  // const [google_signups_data, setGooleSignupsData] = useState([]);



  //   useEffect(() => {
  //     const login_data = async () => {
  //         setLoading(true)
  //         try {
  //             let res = await fetch("https://podcast-login-details-mongodb.onrender.com/login");
  //             if (!res.ok) {
  //                 throw new Error(`HTTP error! Status: ${res.status}`);
  //             }
  //             let data = await res.json();
  //             setLoading(false);
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
  // console.log("login details from database",login_details_data);
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
  // console.log("google signups details from database",google_signups_data);
  const validateFields = () => {
    const { username, password } = state;
    const usernameRegex = /^[a-zA-Z0-9_ ]{3,15}$/;
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!username || !usernameRegex.test(username)) {
      toast.error("Invalid Username: Use 3-15 characters (letters, numbers, or underscores).");
      return false;
    }

    // if (!email || !emailRegex.test(email)) {
    //   toast.error("Invalid Email: Enter a valid email address.");
    //   return false;
    // }

    if (!password || !passwordRegex.test(password)) {
      toast.error("Invalid Password: Must be at least 8 characters, with 1 letter, 1 number, and 1 special character.");
      return false;
    }

    return true;
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (!validateFields()) return;
  //   const obj = { username, password};

  //   // const localData = JSON.parse(localStorage.getItem("login_credential")) || [];
  //   const localData = login_details_data || [];
  //   const userFound = localData.some(
  //     (user) =>
  //       user.username === obj.username &&
  //       user.password === obj.password 
  //   );
  //   // console.log(userFound);

  //   if (userFound) {
  //     toast.success("Login successful! Redirecting to the home page...");
  //     // alert("Login successful! Redirecting to the home page...")

  //     setLoading((prev => !prev))
  //     localStorage.setItem("display", JSON.stringify(obj));
  //     setTimeout(() => {
  //       onLogin(true);//Notify parent component of login success
  //       setLoading((prev => !prev))
  //       navigate("/"); // Redirect to the home page
  //     }, 3000);

  //   } else {
  //     if (confirm("User not found. Do you want to register?")) {
  //       setLoading((prev => !prev))
  //       setTimeout(() => {
  //         setLoading((prev => !prev))
  //         navigate("/register"); // Redirect to the Register page
  //       }, 3000);
  //       // navigate("/register"); // Redirect to the Register page
  //     }
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    try {
      setLoading(true);
      const response = await fetch("https://podcast-login-details-mongodb.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      const adminCheck = () => {
        return username === "Abhiram" && password === "Abhiram@1234";
      }
      // console.log("is admin or not checking",adminCheck());
      onAdminLogin(adminCheck())
      // setLoginDetails(data);
      if (!response.ok) {
        toast.error(data.error || "Login failed");
        setLoading(false);
        return;
      }

      toast.success("Login successful! Redirecting...");
      localStorage.setItem("display", JSON.stringify({ username }));

      setTimeout(() => {
        onLogin(true);
        setLoading(false);
        navigate("/");
      }, 3000);
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
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
  // const signInWithGoogle = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, provider);
  //     const googleUser = result.user;

  //     // Check if the Google email exists in localStorage under google_signups
  //     // const googleData = JSON.parse(localStorage.getItem("google_signups")) || [];
  //     const googleData = google_signups_data || [];
  //     const googleUserFound = googleData.some(user => user.email === googleUser.email);
  //     const obj = {
  //     displayName: user.displayName || "Google User", // Use Google display name or fallback
  //       email: user.email,
  //     };
  //     localStorage.setItem("display", JSON.stringify(obj))

  //     if (googleUserFound) {
  //       toast.success("Login successful with Google. Redirecting to the home page...");
  //       // alert("Login successful with Google. Redirecting to the home page...")
  //       setTimeout(() => {
  //         onLogin(true); // Notify parent component of login success
  //         navigate('/');
  //       }, 3000)
  //     } else {
  //       toast.error("Google account not found in the system. Please register first.");
  //       setLoading((prev => !prev))
  //       setTimeout(() => {
  //         setLoading((prev => !prev))
  //         navigate("/register"); // Redirect to the Register page if the Google account is not found
  //       }, 2000);
  //       // navigate("/register");
  //     }
  //   } catch (error) {
  //     console.error("Error signing in with Google:", error);
  //     toast.error("There was an error signing in with Google.");
  //   }
  // };


  const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const googleUser = result.user;

        const obj = {
            displayName: googleUser.displayName || "Google User",
            email: googleUser.email,
        };

        // Send a POST request to the backend to check if the user exists
        const response = await fetch("https://google-signup-mongodb.onrender.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
        });

        const data = await response.json();
        console.log(data);
        if (response.ok) {
            localStorage.setItem("display", JSON.stringify(obj));
            toast.success("Login successful with Google. Redirecting to the home page...");
            
            setTimeout(() => {
                onLogin(true); // Notify parent component of login success
                navigate('/');
            }, 3000);
        } else {
            toast.error("Google account not found in the system. Please register first.");
            setLoading((prev) => !prev);
            setTimeout(() => {
                setLoading((prev) => !prev);
                navigate("/register");
            }, 2000);
        }
    } catch (error) {
        console.error("Error signing in with Google:", error);
        toast.error("There was an error signing in with Google.");
    }
};

  const handleGuestLogin = async () => {
    setLoading(true); // Show loading state
  
    const guestCredentials = {
      username: "guest",
      password: "Guest@1234",
    };
  
    try {
      const response = await fetch("https://podcast-login-details-mongodb.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(guestCredentials),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast.success("Guest login successful! Redirecting to home...");
        
        // Store guest details in localStorage
        localStorage.setItem("display", JSON.stringify(data.user));
  
        setTimeout(() => {
          onLogin(true);
          setLoading(false);
          navigate("/"); // Redirect to home page
        }, 2000);
      } else {
        toast.error(data.message || "Guest login failed. Please try again.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error in guest login:", error);
      toast.error("Error logging in as guest.");
      setLoading(false);
    }
  };
  


  const { username, password } = state;

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

        <div style={{ overflowX: "hidden", overflowY: scroll, backgroundColor: `${({ theme }) => theme.bg}` }} className="form-container" >

          <form onSubmit={handleSubmit} className="form" >
            <div className="loginTop" style={{ textAlign: "center" }}>
              {/* <img src={LogoImg} alt="image not found" style={{height:"60px",width:"60px",borderRadius:"50%"}} /> */}
              <span style={{ color: darkMode ? "#15c6ed" : "#a20afa", fontSize: "1.75em", fontWeight: "bolder", marginLeft: "8px", textAlign: "center" }}>Login </span><br />
            </div>

            <label htmlFor="username" className="label" style={{ color: darkMode ? "#15c6ed" : "#a20afa" }}>Username </label>
            <Input
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username..."
              value={username}
              onChange={handleChange}
              className="input"

            />


            <label htmlFor="password" className="label" style={{ color: darkMode ? "#15c6ed" : "#a20afa" }}>Password </label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password..."
              value={password}
              onChange={handleChange}
              className="input"


            />


            {/* <label htmlFor="email" className="label">Email: </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email..."
                    value={email}
                    onChange={handleChange}
                    className="input"
                  /> <br />
                   {errors.email && <p style={{ color: "red",fontSize:"0.8em" }}>{errors.email}</p>}
                  */}

           
              <Button type="submit" id="submit" variant="contained" style={{padding: "0.7em 8.3em 0.7em 9em",marginTop:"5px"}}>
                Login
              </Button>
           


            <hr />
            <div className="google_button" style={{ textAlign: "center" }}>
              <img src={Image} alt="image not Found" style={{ height: "40px", width: "40px" }} />
              <button onClick={signInWithGoogle} id="signIn" style={{ border: "none", outline: "none", backgroundColor: "white", color: "black", textAlign: "center" }} type="button">
                Sign In With Google
              </button>
            </div>
            <div className="lastRow">
              <Button
                onClick={handleGuestLogin}
                variant="contained"
                // color="secondary" 
                style={{ margin: "4px" }}
                className="guest"
              >
                Guest Login
              </Button>
              <Button variant="contained" style={{ margin: "4px" }}><Link to={"/register"} style={{ textDecoration: "none", fontSize: "10px", color: "white" }}>Create an account ?</Link></Button>
            </div>


          </form>
        </div>

      )
      }

    </>
  );
}

export default Login;


