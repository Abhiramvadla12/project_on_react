
import { useNavigate } from "react-router-dom"; 

const Otp = () => {
    const navigate = useNavigate();
  let otp = JSON.parse(localStorage.getItem("otp"));
  display()
  function display(){
        alert("please wait for 3 seconds to get otp!!!")
        setTimeout(()=>{
        alert(`please enter otp in the input ${otp}`)
        },3000);
  }
  
  
  function handlesubmit(e){
        e.preventDefault();
        console.log(e.target.elements.otp.value);
        let user_value = e.target.elements.otp.value;
        if(user_value==otp){
            alert("successfully registerd !!!!");
            setTimeout(()=>{
                navigate("/login");
            },3000)
        }
        else{
            alert("entered otp is wrong!!!");
            display();
        }
  }
  
  return (
    <> 
        <h1>Otp Page</h1>
        <form onSubmit={(e)=>{
                handlesubmit(e)
            }}>
            <label htmlFor="otp">Enter the otp here: </label>
            <input type="text" name="otp" id="otp" placeholder="enter the otp here .... " required />
            <input type="submit" value="submit"   />
        </form>
        
    </>
  )
}

export default Otp;

