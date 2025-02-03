import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Otp = () => {
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
    <div className="form-container">
      
      <form onSubmit={handleSubmit} className="form">
        <span style={{ color: "white",fontSize:"1.75em",fontWeight:"bolder",marginLeft:"8px" }}>Otp Page</span><br />
        <label htmlFor="otp" className="label">Enter the OTP here:</label>
        <input
          type="text"
          name="otp"
          id="otp"
          placeholder="Enter OTP here..."
          value={enteredOtp}
          onChange={(e) => setEnteredOtp(e.target.value)}
          required
          className="input"
        />
        <input type="submit" value="Submit"  className="input"/>
      </form>
    </div>
  </>
    
  );
};

export default Otp;
