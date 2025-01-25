import { useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'; //Styled-components is a popular library in the React ecosystem that allows you to write CSS directly within JavaScript files, using tagged template literals. It enables you to style components in a modular and maintainable way, keeping your styles scoped to specific components.
import { lightTheme, darkTheme } from './utils/Themes'; //these themes imported from another file

import Sidebar from './components/Sidebar';
import NavBar from './components/NavBar';
import { Routes,Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Search from './pages/Search';
import Favorite from './pages/Favorite';
import Profile from './pages/Profile';
import PodcastDetails from './pages/PodcastDetails';
import DisplayPodcast from './pages/DisplayPodcast';
import Login from './components/Login';
import Register from './components/Register';
import Otp from './components/Otp';
//here we style the componet and for div i am Container as a name
const Container = styled.div`
    // i am taking bg from themes file in which bg refers to background, theme is an object that is typically provided by a ThemeProvider from styled-components.
    background: ${({theme}) => theme.bgLight}; 
    //to display the side and total content of App side by side
    display:flex;
    width:100%;
    height:100vh;
    //to scroll on x and y axis
    overflow-x: hidden;
    overflow-y: hidden;
`;
const Frame = styled.div`
    display:flex;
    flex-direction:column;
    flex:3;
`;
function App() {
  //hooks(useState) for darkmode
  const [darkMode, setDarkMode] = useState(true);
  //for menuBar another hook
  const [menuOpen, setMenuOpen] = useState(true);
  
  const [isLogined, setIsLogined] = useState(false); // Track login state

   // Initialize favorites from localStorage
   const favData = JSON.parse(localStorage.getItem("favData")) || [];

  const [favorite,setFavorite] = useState(favData);

  const handleLoginStatus = (status) => {
    setIsLogined(status); // Update login state
  };
  
  const handleLogout = () => {
    setIsLogined(false); // Reset login state
    localStorage.removeItem("display"); // Optional: Clear user data
  };

  const handleFavorites = (podcastId)=>{
    setFavorite((prevFavorites) => {
      const updatedFavorites = prevFavorites.includes(podcastId)
        ? prevFavorites.filter((id) => id !== podcastId) // Remove if already favorite
        : [...prevFavorites, podcastId]; // Add if not favorite

      // Update localStorage
      localStorage.setItem("favData", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  }
  console.log(isLogined)
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme} >
         
     
      {/* theme provider is present in styled components */}
        < Container>
        {
          menuOpen && (
            <Sidebar  setMenuOpen={setMenuOpen} setDarkMode={setDarkMode} darkMode={darkMode} menuOpen={menuOpen} isLogined={isLogined} onLogout={handleLogout}/>
          )
        }
      
           <Frame>
              <NavBar setMenuOpen={setMenuOpen} menuOpen={menuOpen} isLogined={isLogined} onLogout={handleLogout} darkMode={darkMode} />
              <Routes>
                    <Route path="/" exact element={<Dashboard isFavorite={favorite} onFavorite={handleFavorites} isLogined={isLogined}/>} />
                    <Route path="/search" exact element={<Search/>} />
                    <Route path="/favorite" exact element={<Favorite  isFavorite={favorite} onFavorite={handleFavorites} isLogined={isLogined}/>}  />
                    <Route path="/profile" exact element={<Profile isFavorite={favorite} onFavorite={handleFavorites} isLogined={isLogined}/>} />
                    <Route path="/podcast/:id" exact element={<PodcastDetails/>} />
                    <Route path="/displaypodcast/:type" exact element={<DisplayPodcast  isFavorite={favorite} onFavorite={handleFavorites} isLogined={isLogined} />} />
                    <Route path="/login"  element={<Login onLogin={handleLoginStatus} />} />
                    <Route path="/register"  element={<Register />} />
                    <Route path="/otp"  element={<Otp />} />
              </Routes>
              
           </Frame>
        </Container>
    </ThemeProvider>
    
  )
}

export default App
