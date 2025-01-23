import getData from "../components/api";
import { useState,useEffect } from "react";
// import { CircularProgress } from "@mui/material";
import PodcastCard from '../components/PodcastCard';
import styled from "styled-components";
import { useParams } from "react-router-dom";
const DisplayMain = styled.div`
    padding: 20px 30px;
    padding-bottom: 200px;
    height: calc(100vh - 60px); /* Subtract the height of any header/footer */
    overflow-y: auto; /* Enable vertical scrolling */
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
const DisplayPodcast = () => {
  const [data, setData] = useState(null); // Store fetched data
  const [error, setError] = useState(null); // Handle errors
  const [loading, setLoading] = useState(true); // Loading state
  const [genere,setGenere] = useState('all');
  const {type} = useParams();
  console.log(type);
  useEffect(()=>{
        setGenere(type);
  },[])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData(); // Fetch data
        setData(result); // Set data
      } catch (err) {
        setError(err.message); // Set error
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData();
  }, []);
  console.log(genere);

  if (loading) {
      return (
        <Loader>
          <Spinner>

          </Spinner>
          {/* <CircularProgress /> */}
        </Loader>
      );
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }
    if (!data || !Array.isArray(data)) {
      return <div>No Data Available</div>;
    }
  
  return (
    <div>
        <DisplayMain>
                <FilterContainer>
                    <Topic>
                        {genere[0].toLocaleUpperCase() + genere.slice(1)}
                    </Topic>
                    <Podcasts >
                        {
                            data && <PodcastCard apiData={data} type={genere}/>
                        }
                        
                    
                    </Podcasts>
                </FilterContainer>


        </DisplayMain>
    </div>
  )
}

export default DisplayPodcast;
