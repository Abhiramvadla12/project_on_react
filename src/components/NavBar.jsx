
import styled from 'styled-components'
import MenuIcon from '@mui/icons-material/Menu';
import { PersonRounded } from '@mui/icons-material';
import { IconButton } from '@mui/material';
// import {Link} from 'react-router-dom';
// import {useState} from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css"
const NavBardiv = styled.div`

    display: flex;
    justify-content : space-between;
    padding: 16px 40px;
    align-items: center;
    gap: 30px;
    background: ${({theme})=> theme.bgLight};
    color: ${({theme})=> theme.text_primary};
    box-shadow: 0 4px 30px rgba(0,0,0,0.1);
    backdrop-filter: blur(5.7px);
    -webkit-backdrop-filter: blur(5.7px)
    @media (max-width: 768px) {
        padding: 16px;
    }
    @media (max-width: 320px) {
       gap:10px;
       justify-content: center;
        
    }
`;
const IcoButton = styled(IconButton)`
    color: ${({ theme }) => theme.text_secondary} !important;


`;
const ButtonDIv = styled.div`
    font-size: 14px;
    cursor: pointer;
    max-width: 85px;
    align-items: center;
    display: flex;
    padding: 8px 10px;
    color: ${({theme})=> theme.primary};
    border: 2px solid ${({theme})=> theme.primary};;
    border-radius: 10px;
    gap: 8px;
    &:hover{
        box-shadow: 1px 1px 8px ${({theme})=> theme.hover_background};
        background-color: ${({theme})=> theme.hover_background}
    }
    @media (max-width: 550px) {
       padding: 6px 8px;
        
    }
    @media (max-width: 320px) {
       gap: 4px;
       padding: 4px 6px;
        
    }
        
`; 


const DisplayToast = styled.div`

        font-size: 25px;
        font-weight: bolder;
         @media (max-width: 768px) {
                font-size: 8px;
        }
`;
const NavBar = ({setMenuOpen, isLogined,darkMode }) => {
    const navigate = useNavigate();
    const display = JSON.parse(localStorage.getItem("display"));

  return (
    <NavBardiv>
        <IcoButton onClick={()=> setMenuOpen((prev)=> !prev)} >
            <MenuIcon />
        </IcoButton>
        {(display && isLogined) && (
            <DisplayToast>
                Welcome {display?.username} !!! 
            </DisplayToast>
        )}
       
        <ButtonDIv className='buttonDiv'>
            <PersonRounded />
            <button
            
            style={{ border: "none", outline: "none", background: "transparent"}}
            onClick={() => {
                setMenuOpen(); // Call setMenuOpen
                if (isLogined) {
                // onLogout(); // Call onLogout if logged in
                navigate("/profile"); // Navigate to home
                } else {
                navigate("/login"); // Navigate to login
                }
            }}
            
            >
            <span
                style={{
                textDecoration: "none",
                fontSize: "15px",
                fontWeight: "bolder",
                color: darkMode ? "#15c6ed" : "#a20afa",
                }}
                className='login_button_nav'
            >
                {isLogined ? "profile" : "Login"}
            </span>
            </button>
        </ButtonDIv>
    </NavBardiv>
  )
}

export default NavBar

