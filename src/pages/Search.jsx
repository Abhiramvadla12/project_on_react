
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useState } from "react";
import { Category } from "../utils/Data";
import { Link } from "react-router-dom";
import { DefaultCard } from "../components/DefaultCard";

import { CircularProgress } from "@mui/material";
import styled from "styled-components";

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
  const SearchContainer = styled.div`
        display: flex;
        gap: 20px;
        @media (max-width: 768px) {
              flex-direction: column;
        }
  `;


const Search = () => {
  const [searched,setSearched] = useState("");
  const [searchedPodcasts,setSearchedPodcasts] = useState([1,2,3,4,5,6]);
  const [loading,setLoading] = useState(false);
  const handleChange = async(e)=>{
    setSearched(e.target.value);
    // setLoading(true)
    console.log(searched);
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
                    <Link to={`/displaypodcast/${element.name.toLocaleLowerCase}`} style={{textDecoration:"none"}}>
                        <DefaultCard category={element}/>
                    </Link>
                  </>
                ))
              }
          </BrowseAll>
        </Catagories> :
        (
          <>
            {
              loading ? (
              <Loader>
                  <CircularProgress />
              </Loader>)
              :
              (
                <>
                {
                  searchedPodcasts.length != 0 ?(
                    <>
                      <SearchContainer>

                      </SearchContainer>
                    </>

                      
                  ) 
                  :(
                    <>
                      No podcast Found
                    </>
                    )
                }
                </>
              )
            }
          </>
        )
      }
    </SearchMain>
    
  );
};

export default Search;
