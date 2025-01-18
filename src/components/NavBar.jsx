
import styled from 'styled-components'
import MenuIcon from '@mui/icons-material/Menu';
import { PersonRounded } from '@mui/icons-material';
import { IconButton } from '@mui/material';
// import {Link} from 'react-router-dom';
// import {useState} from "react";
import { useNavigate } from "react-router-dom";
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
    border: 1px solid ${({theme})=> theme.primary};
    border-radius: 10px;
    gap: 8px;
`; 
const NavBar = ({setMenuOpen,menuOpen, isLogined,onLogout,darkMode }) => {
    const navigate = useNavigate();
  return (
    <NavBardiv>
        <IcoButton onClick={()=> setMenuOpen((prev)=> !prev)} >
            <MenuIcon />
        </IcoButton>
        
        <ButtonDIv>
            <PersonRounded />
            <button
            style={{ border: "none", outline: "none", backgroundColor: darkMode ? "#1C1E27" : '#f0f0f0' }}
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
                color: "blue",
                }}
            >
                {isLogined ? "profile" : "Login"}
            </span>
            </button>
        </ButtonDIv>
    </NavBardiv>
  )
}

export default NavBar
