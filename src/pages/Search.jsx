
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useState ,useEffect} from "react";
import { Category } from "../utils/Data";
import { Link } from "react-router-dom";
import { DefaultCard } from "../components/DefaultCard";
import getData from "../components/api";
// import { CircularProgress } from "@mui/material";
import styled from "styled-components";
import PodcastCard from "../components/PodcastCard";

const SearchMain = styled.div`
    padding: 20px 30px;
    padding-bottom: 200px;
    height: 100%;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    gap: 20px;

    @media (max-width: 768px) {
        padding: 20px 9px;
    }
`;

const SearchBar = styled.div`
    max-width: 700px;
    display: flex; /* Fixed typo 'disply' */
    width: 100%;
    border: 1px solid ${({ theme }) => theme.text_secondary};
    border-radius: 30px;
    cursor: pointer;
    padding: 12px 16px;
    justify-content: flex-start;
    align-items: center;
    gap: 6px;
    color: ${({ theme }) => theme.text_secondary};

    @media (max-width: 768px) {
        max-width: 100%;
        padding: 10px;
    }
`;
  const Catagories = styled.div`
      margin: 20px 10px;

  `;
  const Heading = styled.div`
      align-items: flex-start;
      color: ${({theme})=> theme.text_primary};
      font-size: 22px;
      font-weight: 540;
      margin: 10px 14px;
  `;
  const BrowseAll = styled.div`
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      padding: 14px;

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


const Search = () => {
  const [searched,setSearched] = useState("");
  const [loading,setLoading] = useState(true);
  const [data, setData] = useState(null); // State to store fetched data
    const [error, setError] = useState(null); // State to handle errors
  const handleChange = async(e)=>{
    setSearched(e.target.value);
    console.log(searched);
  }
  
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
  if (loading) {
    return (
      <Loader>
        {/* <CircularProgress /> */}
        <Spinner>

        </Spinner>
      </Loader>
    );
  }
if(data){
  const filteredData = data.filter((element) => {
    // Check if any file in the element has a matching title, description, or creatorName
    return element.files.some((item) => (
      item.title.toLocaleLowerCase().includes(searched.toLocaleLowerCase()) ||
      item.description.toLocaleLowerCase().includes(searched.toLocaleLowerCase()) ||
      item.creatorName.toLocaleLowerCase().includes(searched.toLocaleLowerCase())
    ));
  });
 console.log(filteredData);
}
 
  return (
    <SearchMain>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <SearchBar>
          <SearchOutlinedIcon style={{ color: "inherit" }} />
          <input
            type="text"
            placeholder="Search artist/Podcasts"
            aria-label="Search for podcasts or artists"
            style={{
              border: "none",
              outline: "none",
              width: "100%",
              backgroundColor: "inherit",
              padding: "4px 8px", // Add some padding to input for better alignment
              fontSize: "14px", // Adjust font size
              color: "blue",
            }}
            value={searched}
            onChange={(e)=> handleChange(e)}
          />
        </SearchBar>
      </div>
      {searched == "" ?
        <Catagories>
          <Heading>Browse all</Heading>
          <BrowseAll>
              {
                Category.map((element,index)=>(
                  <>
                    <Link to={`/displaypodcast/${element.name.toLocaleLowerCase()}`} style={{textDecoration:"none"}} key={index}>
                        <DefaultCard category={element}/>
                    </Link>
                  </>
                ))
              }
          </BrowseAll>
        </Catagories> :
        (
          <>
           
             
          
          </>
        )
      }
    </SearchMain>
    
  );
};

export default Search;
