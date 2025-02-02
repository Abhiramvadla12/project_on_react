import { useEffect, useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'; //Styled-components is a popular library in the React ecosystem that allows you to write CSS directly within JavaScript files, using tagged template literals. It enables you to style components in a modular and maintainable way, keeping your styles scoped to specific components.
import { lightTheme, darkTheme } from './utils/Themes'; //these themes imported from another file
import { useNavigate, useLocation } from "react-router-dom";
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
const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const Spinner = styled.div`

    --d:22px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  color: #25b09b;
  box-shadow: 
    calc(1*var(--d))      calc(0*var(--d))     0 0,
    calc(0.707*var(--d))  calc(0.707*var(--d)) 0 1px,
    calc(0*var(--d))      calc(1*var(--d))     0 2px,
    calc(-0.707*var(--d)) calc(0.707*var(--d)) 0 3px,
    calc(-1*var(--d))     calc(0*var(--d))     0 4px,
    calc(-0.707*var(--d)) calc(-0.707*var(--d))0 5px,
    calc(0*var(--d))      calc(-1*var(--d))    0 6px;
  animation: l27 1s infinite steps(8);

@keyframes l27 {
  100% {transform: rotate(1turn)}
}
`;
function App() {
  //hooks(useState) for darkmode
  const [darkMode, setDarkMode] = useState(true);
  //for menuBar another hook
  const [menuOpen, setMenuOpen] = useState(true);
  
  const [isLogined, setIsLogined] = useState(false); // Track login state

  const [userDetails, setUserDetails] = useState({});

  const [favorite,setFavorite] = useState([]);

  const [isAdmin,setIsAdmin] = useState(false);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location1 = useLocation();

  useEffect(() => {
    // Check if user is logged in on initial load or refresh
    const storedUser = JSON.parse(localStorage.getItem("display"));
    if (storedUser && storedUser.username) {
      setIsLogined(true);
      setUserDetails(storedUser);
      setIsAdmin(true);
    }
  }, []);
  useEffect(() => {
    // If user is logged in and tries to go back to login, redirect to home
    if (isLogined && location1.pathname === "/login") {
      navigate("/", { replace: true });
    }
  }, [isLogined, location1.pathname, navigate]);
  // Initialize user data and favorites from LocalStorage
  useEffect(() => {
    const favData = async () => {
      setLoading(true);
      try {
        const storedUser = JSON.parse(localStorage.getItem("display")) || {};
        setUserDetails(storedUser);  // Update user details
  
        if (!storedUser.username) {  
          setLoading(false);  
          return;  // Stop execution if no user is logged in
        }
  
        let res = await fetch("https://podcast-fav-data-mongodb.onrender.com/fav_ids_get");
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        let data = await res.json();
        // console.log("Fetched favorite data:", data);
  
        // Ensure `filterData[0]` exists before setting state
        const filterData = data.filter((val) => val.name === `${storedUser.username} 's fav`);
        if (filterData.length > 0) {
          // console.log("Filtered favorites:", filterData[0].fav_ids);
          setFavorite(filterData[0].fav_ids);
        } else {
          setFavorite([]);  // Ensure favorites are reset if no data is found
        }
      } catch (error) {
        console.error("Error initializing data:", error);
      }
      setLoading(false);
    };
  
    favData();
  }, [isLogined]);  // Run only when `isLogined` changes
  

 

  const handleLoginStatus = (status) => {
    setIsLogined(status); // Update login state
    
  };
  
  const handleLogout = () => {
    setIsLogined(false); // Reset login state
    setUserDetails({});  // Clear user details
    setFavorite([]);  // Reset favorite list
    setIsAdmin(false); // Ensure admin state is reset (if needed)
    localStorage.removeItem("display"); // Remove user data from localStorage
  };

 // Handle favorites update
 const handleFavorites = (podcastId) => {
  setFavorite((prevFavorites) => {
    const updatedFavorites = prevFavorites.includes(podcastId)
      ? prevFavorites.filter((id) => id !== podcastId) // Remove if already favorite
      : [...prevFavorites, podcastId]; // Add if not favorite

    
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fav_ids: updatedFavorites }),
      };

      if (favorite.length === 0) {
        fetch("https://podcast-fav-data-mongodb.onrender.com/fav_ids_post", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: `${userDetails.username} 's fav`,
            fav_ids: updatedFavorites,
          }),
        })
          .then((response) => response.json())
          .then((result) => console.log("New favorite list created:", result))
          .catch((error) => console.error(error));
      } else {
        fetch(`https://podcast-fav-data-mongodb.onrender.com/update/${userDetails.username} 's fav`, requestOptions)
          .then((response) => response.json())
          .then((result) => console.log("Updated favorites:", result))
          .catch((error) => console.error(error));
      }
      // localStorage.setItem(
      //   `${userDetails.username} 's fav`,
      //   JSON.stringify(updatedFavorites)
      // );

    

    return updatedFavorites;
  });
};

const handleISAdmin = (val)=>{
    setIsAdmin(val)
}
// console.log("checking is he admin or not",isAdmin);
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
              {loading ? (
                   <Loader>
                   {/* <CircularProgress /> */}
                   <Spinner>
           
                   </Spinner>
                 </Loader>
                ) : (
                  <Routes>
                    <Route path="/" exact element={<Dashboard isFavorite={favorite} onFavorite={handleFavorites} isLogined={isLogined} />} />
                    <Route path="/search" exact element={<Search isFavorite={favorite} onFavorite={handleFavorites} isLogined={isLogined}  darkMode={darkMode}/>} />
                    <Route path="/favorite" exact element={<Favorite isFavorite={favorite} onFavorite={handleFavorites} isLogined={isLogined} />} />
                    <Route path="/profile" exact element={<Profile isFavorite={favorite} onFavorite={handleFavorites} isLogined={isLogined} />} />
                    <Route path="/podcast/:id" exact element={<PodcastDetails />} />
                    <Route path="/displaypodcast/:type" exact element={<DisplayPodcast isFavorite={favorite} onFavorite={handleFavorites} isLogined={isLogined} />} />
                    <Route path="/login" element={<Login onLogin={handleLoginStatus} onAdminLogin={handleISAdmin} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/otp" element={<Otp />} />
                    <Route path="*" element={<NoPage />} />
                  </Routes>
                )}
              
           </Frame>
        </Container>
    </ThemeProvider>
    
  )
}

export default App
