import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Otp = () => {
  const navigate = useNavigate();
  const otp = JSON.parse(localStorage.getItem("otp"));

  const [enteredOtp, setEnteredOtp] = useState("");

  useEffect(() => {
    alert("Please wait a few seconds to get the OTP!");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (enteredOtp === otp) {
      alert("Successfully registered!");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } else {
      alert("Entered OTP is wrong. Please try again.");
      alert("Please wait a few seconds to get the OTP!");
    }
  };

  return (
    <>
      <h1>OTP Page</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="otp">Enter the OTP here:</label>
        <input
          type="text"
          name="otp"
          id="otp"
          placeholder="Enter OTP here..."
          value={enteredOtp}
          onChange={(e) => setEnteredOtp(e.target.value)}
          required
        />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
};

export default Otp;
