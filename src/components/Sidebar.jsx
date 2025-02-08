
import styled from 'styled-components'
import {CloseRounded,LightModeRounded,LogoutRounded, DarkModeRounded, CloudUploadRounded, Category} from '@mui/icons-material';
import LogoImage from '../images/logo_project.png'
import {Link} from 'react-router-dom'
import { menuItems} from './Menu';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from 'react';

const MenuContainer = styled.div`
        //the part the sidebar occupy in the webpage
        flex:0.5;
        flex-direction:column;
        height: 100vh;
        display: flex;
        
        background:${({theme})=> theme.bg};
        color:${({theme})=> theme.text_primary};
        @media (max-width : 1100px){

            position : fixed;
            z-index : 1000;
            width: 100%;
            max-width: 250px;
            left: ${({$menuOpen})=> ($menuOpen ? "0" : "-100%")};
            transition : 0.3s ease-in-out;
        }
        
      
`;
const Image = styled.img`
    height:60px;

`;
const Logo = styled.div`
    color:${({theme})=> theme.primary};
    display: flex;
    align-items: center;
    justify-content:center;
    gap:6px;
    font-weight: bold;
    font-size: 20px;
    margin: 16px 0px;
   
    
`;
const Flex = styled.div`
    width:100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 5px;

`;
const Elements = styled.div`
    padding: 4px 16px;
    display: flex;
    justify-content: flex-start; 
    align-items: center;
    cursor: pointer;
    color: ${({ theme }) => theme.text_secondary};
 

    &:hover {
        background-color: ${({ theme }) => theme.hover_background}; /* Example background change */
        color: ${({ theme }) => theme.text_primary}; /* Example text color change */
    }
`;
const NavText = styled.div`
    padding: 12px 0px;
   

`;

const HR = styled.div`

      width: 100%;
      height: 1px;
      background-color: ${({theme})=> theme.text_secondary};
      margin: 10px 0px;

`;

const Close = styled.div`
    display: none; /* Initially hidden */
    
    @media (max-width: 440px) {
        display: block; /* Show the close icon in smaller screens */
        cursor: pointer;
    }
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 400px;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 2000;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;
const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin: 2px 0;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  font-size: 14px;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 8px 0;
  &:hover {
    background-color: ${({ theme }) => theme.hover_background};
    color:blue;
  }
`;
const Sidebar = ({menuOpen,setMenuOpen,setDarkMode,darkMode,isLogined,onLogout,isAdmin}) => {
  const [state,setState] = useState({
    Category:"",
    type:"",
    image:null,
    title:"",
    description:"",
    creatorName:"",
    views:"",
    file:null,
   
  })
  
  const buttons = [
 
    {
      func: () => setIsModalOpen(true), // Opens the modal
      name: "Upload",
      icon: CloudUploadRounded,
    }
    ,{
        func: ()=> setDarkMode((prev) => !prev),
        name:darkMode ? "Light Mode" : "Dark mode",
        icon:darkMode ? LightModeRounded : DarkModeRounded,
    }
    ,
    {
        func: ()=> onLogout() ,
        name:isLogined ? "Logout" : "Login",
        icon:LogoutRounded,
        path:"/login"
    }
]
const [isModalOpen, setIsModalOpen] = useState(false);
const handleFavoriteClick = (e) => {
  

  if (!isLogined) {
    // Show toast if the user isn't logged in
    e.preventDefault(); // Prevent the default navigation behavior
    toast.warning("Please log in to set or view favorites!", {
      position: "top-center",
      autoClose: 3000,
    });
    return;
  }

};
const handleChange = (e) => {
  const { name, value, files } = e.target;
  if (files) {
    setState((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  } else {
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};


const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  Object.keys(state).forEach((key) => {
    formData.append(key, state[key]);
  });

  try {
    const response = await fetch('https://api-backend-hejj.onrender.com/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const result = await response.json();
      toast.success('Upload successful!');
      console.log(result);
      setIsModalOpen(false); // Close modal after successful upload
    } else {
      toast.error('Upload failed. File size may exceed the 40MB limit.');
    }
  } catch (error) {
    console.error('Error uploading files:', error);
    toast.error('Upload failed. Please try again.');
  }
};
const {Category,type,title,description,creatorName,views} = state;

  return (
   
    <>
          <MenuContainer $menuOpen={menuOpen}>
          <Flex>
              <Logo>
                  <Image src={LogoImage} alt="image not found" style={{width:"60px"}}/>
                  MELOMANIAC
              </Logo>
              <Close onClick={()=> setMenuOpen((prev) => !prev)}>
                    <CloseRounded></CloseRounded>
              </Close>
            </Flex>
            {
              menuItems.map((item,index) => (
                   
                    item.name == "Favorites" ?
                    (
                      <Link to={item.link}  key={index} style={{ textDecoration: 'none' }} onClick={handleFavoriteClick}  >
                      <Elements >
                            {<item.icon/>}
                            <NavText>{item.name}</NavText>
                      </Elements>
                    </Link>
                    ):
                    (
                      <Link to={item.link}  key={index} style={{ textDecoration: 'none' }}  >
                      <Elements >
                            {<item.icon/>}
                            <NavText>{item.name}</NavText>
                      </Elements>
                    </Link>
                    )
                   
                    
                
              
              ))
            }
            
            <HR/>
            
            {
                buttons.map((item, index) => {
                  if (item.name === "Upload" && !isAdmin) {
                    // Skip rendering the upload button if not admin
                    return null;
                  }
                  return !isLogined && index === 2 ? (
                    <Link to={item.path} key={index} style={{ textDecoration: "none" }} onClick={() => setMenuOpen(false)}>
                      <Elements>
                        <item.icon />
                        <NavText>{item.name}</NavText>
                      </Elements>
                    </Link>
                  ) : (
                    <Elements key={index} onClick={item.func}>
                      <item.icon />
                      <NavText>{item.name}</NavText>
                    </Elements>
                  );
                })
              }
        </MenuContainer>
        {isModalOpen && (
            <>
              <Overlay onClick={() => setIsModalOpen(false)} /> {/* Closes modal on click */}
              <Modal>
              <h1>Upload</h1>
                  <form onSubmit={handleSubmit}>
                    <label htmlFor="Category">Category:</label>
                    <Input type="text" name="Category" value={Category} onChange={handleChange} />
                    <label htmlFor="type">Type:</label>
                    <Input type="text" name="type" value={type} onChange={handleChange} />
                    <label htmlFor="title">Title:</label>
                    <Input type="text" name="title" value={title} onChange={handleChange} />
                    <label htmlFor="description">Description:</label>
                    <Input type="text" name="description" value={description} onChange={handleChange} />
                    <label htmlFor="creatorName">Creator Name:</label>
                    <Input type="text" name="creatorName" value={creatorName} onChange={handleChange} />
                    <label htmlFor="views">Views:</label>
                    <Input type="text" name="views" value={views} onChange={handleChange} />
                    <label htmlFor="image">Image:</label>
                    <Input type="file" name="image" accept="image/*" onChange={handleChange} />
                    <label htmlFor="file">File:</label>
                    <Input type="file" name="file" onChange={handleChange} />
                    <Button type="submit">Submit</Button>
                    <Button onClick={() => setIsModalOpen(false)}>Close</Button>
                  </form>
              </Modal>
            </>
          )}
        <ToastContainer />
        
    </>
    
  )
}

export default Sidebar;


