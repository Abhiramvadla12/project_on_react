
import styled from 'styled-components'
import {CloseRounded,LightModeRounded,LogoutRounded, DarkModeRounded, CloudUploadRounded} from '@mui/icons-material';
import LogoImage from '../images/logo_project.png'
import {Link} from 'react-router-dom'
import { menuItems} from './Menu';

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

const Sidebar = ({menuOpen,setMenuOpen,setDarkMode,darkMode,isLogined,onLogout}) => {
  const buttons = [
 
    {
        func: ()=> console.log("upload"),
        name:"Upload",
        icon:CloudUploadRounded
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
  return (
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
              
                <Link to={item.link}  key={index} style={{ textDecoration: 'none' }} >
                  <Elements >
                        {<item.icon/>}
                        <NavText>{item.name}</NavText>
                  </Elements>
                </Link>
            
          
          ))
        }
        
        <HR/>
        
        {
          buttons.map((item, index) => (
            index === 2 && !isLogined ? (
              <Link to={item.path} key={index} style={{ textDecoration: 'none' }} onClick={()=>{ setMenuOpen()}}>
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
            )
          ))
          
        }
      
    </MenuContainer>
  )
}

export default Sidebar;


