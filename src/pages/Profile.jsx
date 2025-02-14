import styled from "styled-components"
import ProfileImg from "../images/profile_dummy.webp";
import PodcastCard from "../components/PodcastCard";
import { useState } from "react";
import { useEffect } from "react";
import getData from "../components/api";
import Modal from "@mui/material/Modal";
import { TextField, Button, Box } from "@mui/material";
import { toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ProfileTotal = styled.div`
    height:100%;
    overflow-x: hidden;
    overflow-y: scroll;
        
`;

const ProfileContainer = styled.div`

        // border: 2px solid white;
        background-color: ${({ theme }) => theme.bg};
        
        margin: 6px;
        border-radius: 10px;
        &:hover{
              box-shadow: 1px 1px 8px ${({ theme }) => theme.hover_background};
        }
`;

const FavoritesContainer = styled.div`
      padding: 10px;
       background-color: ${({ theme }) => theme.bg};
        
        margin: 10px;
        border-radius: 10px;
        &:hover{
              box-shadow: 2px 2px 10px ${({ theme }) => theme.hover_background};
        }
`;
const BackgroundImg = styled.img`
   
    height: 300px;
    width: 100%;
     @media (max-width: 550px) {
       height: 200px;
       width:100%;
        
    }
`;

const ProfileImage = styled.img`
      border: 2px solid blue;
    height: 250px;
    width: 250px;
    border-radius: 50%;
    @media (max-width: 550px) {
       height: 100px;
       width:100px;
        
    }
`;
const UserName = styled.div`
    font-size: 1.5em;
    font-weight: bolder;
    color :  ${({ theme }) => theme.primary};
   @media (max-width: 550px) {
        font-size: 1em;
        
    }
`;
const Email = styled.div`
        font-size: 1.5em;
    font-weight: bolder;
    color :  ${({ theme }) => theme.primary};
     @media (max-width: 550px) {
        font-size: 1em;
        
    }
`;

const Details = styled.div`
      display: "block";
     
`;


const ProfileBottom = styled.div`

   color :  ${({ theme }) => theme.text_secondary};
  // background-image: url("/profile_fav_bg.jpg");
  // background-size: cover;
    

`;


const ProfileTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  position: relative;
  top: -90px;

  @media (max-width: 550px) {
    text-align: center;
    font-size: 0.5em;
  }
`;

const EditButton = styled.button`
  margin-top: 10px;
  padding: 10px;
  background-color: ${({ theme }) => theme.primary};
  color:black ;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  // &:hover {
  //   background-color: ${({ theme }) => theme.hover_background};
  // }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const Favorites = styled.div`
     font-size: 1.5em;
    font-weight: bolder;
    color: blue;
    display: flex;
    flex-wrap: wrap;
    margin: 2em;
    gap: 1em;
    padding: 10px;
     @media (max-width: 550px) {
        justify-content: center;
        align-items: center;
        justify-items: center;
        display: grid;
        grid-template-columns: 1fr;
        
    }
       
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
const ProfilePhoto = styled.div``;
const Profile = ({ isFavorite, onFavorite, isLogined }) => {
  const [data, setData] = useState(null); // State to store fetched data
  const [error, setError] = useState(null); // State to handle errors
  const [loading, setLoading] = useState(true); // State for loading status
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState({
    image: "",
    country: "",
    about: "",
    gender: "",
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData(); // Call your getData function
        setData(result); // Update state with the fetched data
      } catch (err) {
        setError(err.message); // Handle and display errors
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchData();
  }, []); // Empty dependency array to fetch data only once on mount
  console.log(error)
  const filteredFav = data?.filter((item) => isFavorite.includes(item.id)) || [];
  const display = JSON.parse(localStorage.getItem("display")) || {};
  // const { email} = display;
  const {username} = display;
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 console.log(username);
  const fetchProfile = async () => {
    setLoading(true)
    if ( !username) return;
    // const val = email ? email : username;
    try {
      const response = await fetch(`https://podcast-profile-details.onrender.com/api/getProfile/${username}`);
      if (!response.ok) throw new Error("Profile not found");
      const data = await response.json();
      
      setProfile({
        image: data.file && data.file.data
          ? `data:${data.file.contentType};base64,${data.file.data}`
          : ProfileImg,
        country: data.country || "",
        about: data.about || "",
        gender: data.gender || "",
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };
  
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    fetchProfile();
  }, [username]); // Runs only when email changes
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (profile.image instanceof File) {
      formData.append("file", profile.image);
    }
    formData.append("country", profile.country);
    formData.append("about", profile.about);
    formData.append("gender", profile.gender);
    formData.append("username", username);
  
    try {
      const response = await fetch("https://podcast-profile-details.onrender.com/api/updateProfile", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to update profile");
  
      toast.success("Profile updated successfully!");
      setOpen(false);
  
      // **Re-fetch profile data to see changes instantly**
      fetchProfile();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };
  
  
  

  // console.log(display);
  if (loading) {
    return (
      <Loader>
        {/* <CircularProgress /> */}
        <Spinner>

        </Spinner>
      </Loader>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <>
      <ToastContainer/>
      <ProfileTotal>

        <ProfileContainer>
          <BackgroundImg src="/profile_bg5.1.png" />
          <ProfileTop>

            <ProfilePhoto>

            <ProfileImage src={profile.image || ProfileImg} alt="Profile" />


            </ProfilePhoto>
            <Details>
              <UserName>

                {display?.username}
              </UserName>
              <Email>
                {display?.email}
              </Email>
              <UserName>{profile?.country}</UserName>
              <UserName>{profile?.about}</UserName>
              <UserName>{profile?.gender}</UserName><br />
              <EditButton onClick={handleOpen}>Edit Profile</EditButton>
            </Details>

          </ProfileTop>

        </ProfileContainer>
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,

            }}
          >
            <CloseButton onClick={handleClose}>&times;</CloseButton> {/* Close button */}
            <form onSubmit={handleSubmit}>
              <label htmlFor="file">Upload your DP </label><br />
              <input
                type="file"
                accept="image/*"
                name="image"
                id="file"
                onChange={(e) => setProfile({ ...profile, image: e.target.files[0] })}
              />

              <TextField
                fullWidth
                label="Country"
                name="country"
                value={profile.country}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="About"
                name="about"
                value={profile.about}
                onChange={handleChange}
                margin="normal"
                multiline
              />
              <TextField
                fullWidth
                label="Gender"
                name="gender"
                value={profile.gender}
                onChange={handleChange}
                margin="normal"
              />
              <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                Save Changes
              </Button>
            </form>
          </Box>
        </Modal>
        <FavoritesContainer>
          <UserName>
            Your favorites
          </UserName>
          <ProfileBottom>

            <Favorites>
              <PodcastCard apiData={filteredFav} type={"all"} isFavorite={isFavorite} onFavorite={onFavorite} isLogined={isLogined} />
            </Favorites>

          </ProfileBottom>
        </FavoritesContainer>

      </ProfileTotal>

    </>


  )
}

export default Profile
