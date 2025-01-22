import { Link } from "react-router-dom"; // Import Link for navigation
import styled from "styled-components";
import { IconButton, Avatar } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
// import podcastImage from "../images/podcast-icon.jpeg";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const PlayIcon = styled.div`

        padding: 10px;
        border-radius: 50%;
        z-index: 100;
        display: flex;
        align-items: center;
        background: #9000ff !important;
        color: white !important;
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        position: absolute !important;
        top: 45%;
        right: 10%;
        display: none;
        transition: all 0.45s ease-in-out;
        box-shadow: 0 0 16px 4px #9000ff50 !important;
        
`;
const Card = styled.div`
    position: relative;
    text-decoration: none;
    background-color: ${({theme})=> theme.card};
    max-width: 220px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 16px;
    border-radius: 6px;
    box-shadow: 0 0 16px 0 rgba(0,0,0,0.1);
    &:hover {
        cursor: pointer;
        transform: translateY(-8px);
        transition: all 0.4s ease-in-out;
        box-shadow: 0 0 18px 0 rgba(0,0,0,0.3);
        filter: brightness(1.3); 
    }
        &:hover ${PlayIcon}{
            display: flex;
        }

`;
const Favorite = styled(IconButton)`
        color: white;
        position: absolute !important;
        top: 8px;
        right: 6px;
        padding: 6px !important;
        border-radius: 50%;
        z-index: 100;
        display: flex;
        align-items: center;
        background: ${({theme})=> theme.text_secondary};
        color: white !important;
        backdrop-filter: blur(4px);
        box-shadow: 0 0 16px 6px #222423 !important;
`;
const Top = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
     position: relative;
    height: 150px;

`;
const CardImage = styled.img`
      object-fit: cover;
      width: 220px;
      height: 140px;
      border-radius: 6px;
     box-shadow: 0 4px 30px 0 rgba(0,0,0,0.3);
      &:hover {
        
        box-shadow: 0 4px 30px 0 rgba(0,0,0,0.4);
     
    }

`;
const CardInformation = styled.div`
    display: flex;
    align-items: flex-grid;
    font-weight: 450;
    padding: 14px 0px 0px 0px;
    width:220px;
`;
const MainInfo = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: flex-start;
    gap: 4px;
`;
const Title = styled.div`
    overflow: hidden;
    display: -webkit-box;
    max-width: 100%;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    color :  ${({theme})=> theme.text_primary};
`;
const Description = styled.div`
     overflow: hidden;
    display: -webkit-box;
    max-width: 100%;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    color :  ${({theme})=> theme.text_secondary};
    font-size: 12px;
`;
const CreatorInfo = styled.div`
     display: flex;
    align-items: center;
     justify-content: space-between;
     gap: 8px;
     margin-top: 6px;
`;
const Creator = styled.div`
        display: flex;
        gap: 8px;
        align-items: center;

`;

const CreatorName =styled.div`
        font-size: 12px;
         overflow: hidden;
         white-space: nowrap;
         text-overflow: ellipsis;
         color :  ${({theme})=> theme.text_secondary};

`;
const Views = styled.div`
    font-size: 10px;
    color :  ${({theme})=> theme.text_secondary};
    width: max-content;
`;

const PodcastCard = ({apiData}) => {
    // console.log("received",apiData);
    if (!apiData || !Array.isArray(apiData)) {
        return <div>No Data Available</div>;
      }
    
  return (
    <>
        {apiData.map((element, index) => {
                if (["business", "crime", "education", "history", "comedy"].includes(element?.Category)) {
                    console.log(element.image)
                    return (
                        <Link to={`/podcast/${element.id}`} key={index} style={{ textDecoration: "none" }}>
                            <Card>
                                <div>
                                    <Top>
                                        <Favorite>
                                            <FavoriteIcon style={{ width: "16px", height: "16px" }} />
                                        </Favorite>
                                        <CardImage src={element.image} alt="Podcast" />
                                    </Top>
                                    <CardInformation>
                                        <MainInfo>
                                            <Title>{element.files[0].title || "Podcast Title"}</Title>
                                            <Description>
                                                {element.files[0].description || "No description available for this podcast."}
                                            </Description>
                                            <CreatorInfo>
                                                <Creator>
                                                    <Avatar style={{ width: "26px", height: "26px" }}>A</Avatar>
                                                    <CreatorName>{element.files[0].creatorName || "Unknown Creator"}</CreatorName>
                                                </Creator>
                                                <Views>{element.files[0].views || 0}</Views>
                                            </CreatorInfo>
                                        </MainInfo>
                                    </CardInformation>
                                </div>
                                <PlayIcon>
                                    {element.type === "video" ? (
                                        <PlayArrowIcon style={{ width: "28px", height: "28px" }} />
                                    ) : (
                                        <HeadphonesIcon style={{ width: "28px", height: "28px" }} />
                                    )}
                                </PlayIcon>
                            </Card>
                        </Link>
                    );
                }
                return null;
            })}
    </>
    
    
  )
};

export default PodcastCard;

