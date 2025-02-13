import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input,Button } from "@mui/material";
import "./Otp.css";



const Otp = ({darkMode}) => {
  const navigate = useNavigate();
  const otp = JSON.parse(localStorage.getItem("otp"));

  const [enteredOtp, setEnteredOtp] = useState("");

  useEffect(() => {
    toast.success("Please wait a few seconds to get the OTP!");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (enteredOtp === otp) {
      toast.success("Successfully registered!");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } else {
      toast.error("Entered OTP is wrong. Please try again.");
      toast.error("Please wait a few seconds to get the OTP!");
    }
  };

  return (<>
            <ToastContainer/>
    <div className="form-container1">
      
      <form onSubmit={handleSubmit} className="form1">
        <span style={{ color: darkMode ? "#15c6ed" : "#a20afa",fontSize:"1.75em",fontWeight:"bolder",marginLeft:"8px" }}>OTP</span><br />
        <label htmlFor="otp" className="label1"  style={{ color: darkMode ? "#15c6ed" : "#a20afa" }}>Enter the OTP here:</label>
        <Input
          type="text"
          name="otp"
          id="otp"
          placeholder="Enter OTP here..."
          value={enteredOtp}
          onChange={(e) => setEnteredOtp(e.target.value)}
          required
          className="input1"
          // style={{display:"block"}}
        />
        <Button type="submit"  variant="contained" style={{padding: "1em 12.3em 1em 12.3em"}}>Submit</Button>
      </form>
    </div>
  </>
    
  );
};

export default Otp;
