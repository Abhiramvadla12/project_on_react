import styled from "styled-components"
import ProfileImg from "../images/profile_dummy.webp";
import PodcastCard from "../components/PodcastCard";
import { useState } from "react";
import { useEffect } from "react";
import getData from "../components/api";


const ProfileTotal = styled.div`
    height:100%;
    overflow-x: hidden;
    overflow-y: scroll;
        
`;
const ProfileLogo= styled.div`
    border: 2px solid blue;
    height: 250px;
    width: 250px;
    border-radius: 50%;
`;
const ProfileImage = styled.img`
      border: 2px solid blue;
    height: 250px;
    width: 250px;
    border-radius: 50%;
`;
const UserName = styled.div`
    font-size: 1.5em;
    font-weight: bolder;
    color :  ${({theme})=> theme.text_secondary};
   
`;
const Email = styled.div`
        font-size: 1.5em;
    font-weight: bolder;
    color :  ${({theme})=> theme.text_secondary};
`;
const ProfileTop = styled.div`

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 40px;
   
    padding :10px 0 10px 0;

`;
const Details = styled.div`
      
      padding: 70px
`;

const HR = styled.div`

      width: 100%;
      height: 1px;
      background-color: ${({theme})=> theme.text_secondary};
      margin: 30px 0px;

`;
const ProfileBottom = styled.div`

   color :  ${({theme})=> theme.text_secondary};
  
    

`;
const Favorites = styled.p`
     font-size: 1.5em;
    font-weight: bolder;
    color: blue;
    display: flex;
    margin: 2em;
    gap: 1em;
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
const Profile = ({isFavorite,onFavorite,isLogined}) => {
    const [data, setData] = useState(null); // State to store fetched data
  const [error, setError] = useState(null); // State to handle errors
  const [loading, setLoading] = useState(true); // State for loading status
  

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
  const display = JSON.parse(localStorage.getItem("display"));
  console.log(display);
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
        <ProfileTotal>
                <ProfileTop>
                    <ProfilePhoto>
                        <ProfileLogo>
                            <ProfileImage src={ProfileImg} />
                        </ProfileLogo>
                        {/* <input type="file" placeholder="upload profile photo" style={{color: 'white'}}/> */}
                    </ProfilePhoto>
                    <Details>
                        <UserName>

                            {
                            display.username
                            }
                        </UserName>
                        <Email>
                            {
                            display.email
                            }
                        </Email>
                    </Details>
                
                </ProfileTop>
                <HR/>
                <ProfileBottom>
                        <UserName>
                            Your favorites
                        </UserName>
                        <Favorites>
                                <PodcastCard apiData={filteredFav} type={"all"} isFavorite={isFavorite} onFavorite={onFavorite} isLogined={isLogined}/>
                        </Favorites>

                </ProfileBottom>
        </ProfileTotal>
        
    </>
    
    
  )
}

export default Profile
