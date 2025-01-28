import { useEffect, useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'; //Styled-components is a popular library in the React ecosystem that allows you to write CSS directly within JavaScript files, using tagged template literals. It enables you to style components in a modular and maintainable way, keeping your styles scoped to specific components.
import { lightTheme, darkTheme } from './utils/Themes'; //these themes imported from another file

import Sidebar from './components/Sidebar';
import NavBar from './components/NavBar';
import { Routes,Route,useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Search from './pages/Search';
import Favorite from './pages/Favorite';
import Profile from './pages/Profile';
import PodcastDetails from './pages/PodcastDetails';
import DisplayPodcast from './pages/DisplayPodcast';
import Login from './components/Login';
import Register from './components/Register';
import Otp from './components/Otp';
import Breadcrumb from './components/Breadcrumbs';
import NoPage from './pages/NoPage';
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

  const [userDetails, setUserDetails] = useState({});

  const [favorite,setFavorite] = useState([]);

  const [isAdmin,setIsAdmin] = useState(false)
  // Initialize user data and favorites from LocalStorage
  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('display')) || {};
      setUserDetails(storedUser);
      setIsLogined(!!storedUser.username);

      const storedFavorites = JSON.parse(
        localStorage.getItem(`${storedUser.username} 's fav`) || '[]'
      );
      setFavorite(storedFavorites);
    } catch (error) {
      console.error('Error initializing data from localStorage:', error);
    }
  },  [isLogined]);

  

  const handleLoginStatus = (status) => {
    setIsLogined(status); // Update login state
  };
  
  const handleLogout = () => {
    setIsLogined(false); // Reset login state
    localStorage.removeItem("display"); // Optional: Clear user data
  };

 // Handle favorites update
 const handleFavorites = (podcastId) => {
  setFavorite((prevFavorites) => {
    const updatedFavorites = prevFavorites.includes(podcastId)
      ? prevFavorites.filter((id) => id !== podcastId) // Remove if already favorite
      : [...prevFavorites, podcastId]; // Add if not favorite

    // Update LocalStorage
    try {
      localStorage.setItem(
        `${userDetails.username} 's fav`,
        JSON.stringify(updatedFavorites)
      );
    } catch (error) {
      console.error('Error updating favorites in localStorage:', error);
    }

    return updatedFavorites;
  });
};

const handleISAdmin = (val)=>{
    setIsAdmin(val)
}
console.log("checking is he admin or not",isAdmin);
const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const getBreadcrumbs = () => {
    const paths = {
      '/': 'Dashboard', 
      '/search': 'Search',
      '/favorite': 'Favorites',
      '/profile': 'Profile',
      '/login': 'Login',
      '/register': 'Register',
      '/otp': 'OTP',
    };

    // If the path segments are empty (i.e., we're on the home route), show Dashboard
    const breadcrumbs = pathSegments.map((segment, index) => {
      const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
      return {
        name: paths[path] || segment.charAt(0).toUpperCase() + segment.slice(1),
        link: path
      };
    });

    // Always include Dashboard breadcrumb for the home route
    if (pathSegments.length === 0) {
      return [{ name: 'Dashboard', link: '/' }];
    }

    return [{ name: 'Dashboard', link: '/' }, ...breadcrumbs];
  };

  // console.log(isLogined)
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme} >
         
     
      {/* theme provider is present in styled components */}
        < Container>
        {
          menuOpen && (
            <Sidebar  setMenuOpen={setMenuOpen} setDarkMode={setDarkMode} darkMode={darkMode} menuOpen={menuOpen} isLogined={isLogined} onLogout={handleLogout} isAdmin={isAdmin}/>
          )
        }
      
           <Frame>
              <NavBar setMenuOpen={setMenuOpen} menuOpen={menuOpen} isLogined={isLogined} onLogout={handleLogout} darkMode={darkMode} />
              {/* Render Breadcrumbs here */}
              <Breadcrumb routes={getBreadcrumbs()} />
              <Routes>
                    <Route path="/" exact element={<Dashboard isFavorite={favorite} onFavorite={handleFavorites} isLogined={isLogined}/>} />
                    <Route path="/search" exact element={<Search isFavorite={favorite} onFavorite={handleFavorites} isLogined={isLogined}/>} />
                    <Route path="/favorite" exact element={<Favorite  isFavorite={favorite} onFavorite={handleFavorites} isLogined={isLogined}/>}  />
                    <Route path="/profile" exact element={<Profile isFavorite={favorite} onFavorite={handleFavorites} isLogined={isLogined}/>} />
                    <Route path="/podcast/:id" exact element={<PodcastDetails/>} />
                    <Route path="/displaypodcast/:type" exact element={<DisplayPodcast  isFavorite={favorite} onFavorite={handleFavorites} isLogined={isLogined} />} />
                    <Route path="/login"  element={<Login onLogin={handleLoginStatus}    onAdminLogin={handleISAdmin}/>} />
                    <Route path="/register"  element={<Register />} />
                    <Route path="/otp"  element={<Otp />} />
                    <Route path="*" element={<NoPage />} />
              </Routes>
              
           </Frame>
        </Container>
    </ThemeProvider>
    
  )
}

export default App
