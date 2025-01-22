

import { Link } from 'react-router-dom';
import styled from 'styled-components'
import PodcastCard from '../components/PodcastCard';
import { useState ,useEffect} from 'react';
import getData from '../components/api';
import { CircularProgress } from "@mui/material";
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
        grid-template-columns: repeat(1,1fr)
    }
`;
const Loader = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;

  `;
const Dashboard = () => {
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
  return (
   
    <>
        {loading ? (
            <Loader>
                <CircularProgress />
            </Loader>
        )
        :
        (
            <DashboardMain>
                <FilterContainer>
                <Topic>
                    Most Popular
                    <Link to={"/displaypodcast/mostpopular"} style={{textDecoration: "none"}} >
                        <Span>Show All</Span>
                    </Link>
                </Topic>
                    <Podcasts >
                        {
                            data && <PodcastCard apiData={data} />
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
