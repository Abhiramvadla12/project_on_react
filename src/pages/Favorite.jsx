import { useEffect, useState } from "react";
import PodcastCard from "../components/PodcastCard"
import styled from "styled-components"
import getData from "../components/api";
const Container = styled.div`
   padding: 20px 30px;
    padding-bottom: 200px;
    height:100%;
    overflow-x: hidden;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    gap: 20px;
    
`;
const Topic = styled.div`
    color:  ${({ theme})=> theme.text_primary};
    font-size: 24px;
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 768px) {
        font-size: 18px;
    }
`;
const FavoriteContainer = styled.div`
    
    display: flex;
    felxwrap: wrap;
    gap: 14px;
    padding: 18px 6px;
    @media (max-width: 550px) {
        justify-content: center;
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
const Favorite = ({isFavorite,onFavorite,isLogined}) => {
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

  // console.log("favFiltered data",filteredFav);
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
  // console.log(isLogined);
  return (
    <Container>
      <Topic>
        Favorites
      </Topic>
      <FavoriteContainer >
          <PodcastCard apiData={filteredFav} type={"all"} isFavorite={isFavorite} onFavorite={onFavorite} isLogined={isLogined}/>
      </FavoriteContainer>
    </Container>
  )
}

export default Favorite
