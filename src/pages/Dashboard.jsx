

import { Link } from 'react-router-dom';
import styled from 'styled-components'
import PodcastCard from '../components/PodcastCard';
import { useState ,useEffect} from 'react';
import getData from '../components/api';
// import { CircularProgress } from "@mui/material";
const DashboardMain = styled.div`
    padding: 20px 30px;
    padding-bottom: 200px;
    height:100%;
    overflow-x: hidden;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    gap: 20px;
    @media (max-width: 768px) {
        padding: 6px 10px;
    }
`;
const FilterContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${({ theme})=> theme.bg};
    border-radius: 10px;
    padding: 20px 30px;
    

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
const Span = styled.div`
    color:  ${({ theme})=> theme.primary};
    font-size: 16px;
    font-weight: 400;
    @media (max-width: 768px) {
        font-size: 14px;
    }
`;
const Podcasts = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4,1fr);
    margin: 10px;
    gap: 14px;
    padding: 18px 6px;
    @media (max-width: 550px) {
       justify-content: center;
      align-items: center;
        grid-template-columns: repeat(1,1fr);
        padding: 0;
        
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
const Dashboard = ({isFavorite,onFavorite,isLogined}) => {
    const [data, setData] = useState(null); // State to store fetched data
   
    const [loading, setLoading] = useState(true); // State for loading status
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getData(); // Call your getData function
                setData(result); // Update state with the fetched data
            } catch (err) {
                console.log(err.message); // Handle and display errors
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchData();
    }, []); // Empty dependency array to fetch data only once on mount
    // console.log(error)
    
  return (
   
    <>
        {loading ? (
            <Loader>
                <Spinner>

                </Spinner>
                {/* <CircularProgress /> */}
            </Loader>
        )
        :
        (
            <DashboardMain>
                <FilterContainer>
                <Topic>
                    Most Popular
                    <Link to={"/displaypodcast/mostpopular"} style={{textDecoration: "none"}}  >
                        <Span>Show All</Span>
                    </Link>
                </Topic>
                    <Podcasts >
                        {
                            data && <PodcastCard apiData={data} type={"mostpopular"} isFavorite={isFavorite} onFavorite={onFavorite} isLogined={isLogined}/>
                        }
                        
                    
                    </Podcasts>
                </FilterContainer>

                <FilterContainer>
                <Topic>
                    Comedy
                    <Link to={"/displaypodcast/comedy"} style={{textDecoration: "none"}} >
                        <Span>Show All</Span>
                    </Link>
                </Topic>
                    <Podcasts >
                        {
                            data && <PodcastCard apiData={data} type={"comedy"} isFavorite={isFavorite} onFavorite={onFavorite} isLogined={isLogined}/>
                        }
                        
                    
                    </Podcasts>
                </FilterContainer>

                <FilterContainer>
                <Topic>
                    Culture
                    <Link to={"/displaypodcast/culture"} style={{textDecoration: "none"}} >
                        <Span>Show All</Span>
                    </Link>
                </Topic>
                    <Podcasts >
                        {
                            data && <PodcastCard apiData={data} type={"culture"} isFavorite={isFavorite} isLogined={isLogined} onFavorite={onFavorite}/>
                        }
                        
                    
                    </Podcasts>
                </FilterContainer>
                


            </DashboardMain>

        )
    }
    </>
      )
}

export default Dashboard
