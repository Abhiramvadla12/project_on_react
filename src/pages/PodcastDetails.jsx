// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import getData from "../components/api";
// import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
// import styled from "styled-components";
// import Logo from "../images/profile_dummy.webp";
// import "./PodcastDetails.css"
// const Loader = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100%;
//   width: 100%;
// `;

// const Spinner = styled.div`

//     --d:22px;
//   width: 4px;
//   height: 4px;
//   border-radius: 50%;
//   color: #25b09b;
//   box-shadow: 
//     calc(1*var(--d))      calc(0*var(--d))     0 0,
//     calc(0.707*var(--d))  calc(0.707*var(--d)) 0 1px,
//     calc(0*var(--d))      calc(1*var(--d))     0 2px,
//     calc(-0.707*var(--d)) calc(0.707*var(--d)) 0 3px,
//     calc(-1*var(--d))     calc(0*var(--d))     0 4px,
//     calc(-0.707*var(--d)) calc(-0.707*var(--d))0 5px,
//     calc(0*var(--d))      calc(-1*var(--d))    0 6px;
//   animation: l27 1s infinite steps(8);

// @keyframes l27 {
//   100% {transform: rotate(1turn)}
// }
// `;
// const EpisodeTop = styled.div`
//   padding: 10px;
//   color: ${({ theme }) => theme.text_secondary};
//   // display: flex;
//   // gap: 5px;
//    @media (max-width: 430px) {
//         display: block;
//         text-align: center;
//     }
// `;

// const Episodebottom = styled.div`


// `;
// const Episodes = styled.div`
//   border-radius: 6px;
//   margin: 1em;
//   padding: 10px;
//   color: ${({ theme }) => theme.text_secondary};
//   background-color: ${({ theme }) => theme.bg};
//   max-height: 10em;
//   overflow: hidden;
//   display: -webkit-box;
//   max-width: 100%;
//   -webkit-line-clamp: 6;
//   -webkit-box-orient: vertical;
//   text-overflow: ellipsis;
//   display: flex;
//   gap: 5px;
//   &:hover {
//     cursor: pointer;
//     transform: translateY(-4px);
//     transition: all 0.4s ease-in-out;
//     box-shadow: 0 0 18px 0 rgba(0, 0, 0, 0.3);
//     filter: brightness(1.3);
//   }
// `;

// const Information = styled.div`
//        @media (max-width: 430px) {
//        font-size: 12px;
//          overflow: hidden;
//     display: -webkit-box;
//     max-width: 100%;
//     -webkit-line-clamp: 4;
//     -webkit-box-orient: vertical;
//     text-overflow: ellipsis;
//     }
// `;

// const Views = styled.div`
//   padding: 10px;
//   color: ${({ theme }) => theme.text_secondary};
//   display: flex;
//   gap: 8px;
// `;

// const ChannelTotal = styled.div`
//       display: grid;
//       justify-content: center;
//       // align-items: center;
//       grid-template-columns: 1.5fr 1fr;
//       gap:1em;
//       @media (max-width: 430px) {
//         display: block;
//         text-align: center;
//     }
// `;
// const PodcastDetails = () => {
//   const [data, setData] = useState(null); // Store fetched data
//   const [error, setError] = useState(null); // Handle errors
//   const [loading, setLoading] = useState(true); // Loading state
//   const [openModal, setOpenModal] = useState(false); // Modal visibility
//   const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(null); // Track current episode index
//   const { id } = useParams(); // Get podcast ID from URL

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const result = await getData(); // Fetch data
//         setData(result); // Set data
//       } catch (err) {
//         setError(err.message); // Set error
//       } finally {
//         setLoading(false); // Stop loading
//       }
//     };

//     fetchData();
//   }, []);

//   // Filter podcasts by ID
//   const filteredData = data ? data.filter((item) => item.id === id) : [];

//   if (loading) {
//     return (
//       <Loader>
//         {/* <CircularProgress /> */}
//         <Spinner>

//         </Spinner>
//       </Loader>
//     );
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (filteredData.length === 0) {
//     return <div>No podcast found with the provided ID.</div>;
//   }

//   const podcast = filteredData[0];
//   const currentEpisode = currentEpisodeIndex !== null ? podcast.files[currentEpisodeIndex] : null;

//   const handleOpenModal = (index) => {
//     setCurrentEpisodeIndex(index);
//     setOpenModal(true);
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);
//     setCurrentEpisodeIndex(null);
//   };

//   const handleNext = () => {
//     if (currentEpisodeIndex < podcast.files.length - 1) {
//       setCurrentEpisodeIndex((prevIndex) => prevIndex + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (currentEpisodeIndex > 0) {
//       setCurrentEpisodeIndex((prevIndex) => prevIndex - 1);
//     }
//   };

//   return (
//     <ChannelTotal style={{ overflowY: "scroll" }} >
//       <EpisodeTop>
//         <img src={podcast.image} alt="image not found"  className="channel_img" />
//         <Information>
//           <Views>
//             <img src={Logo} alt="image not found" style={{ height: "50px", width: "50px", borderRadius: "50%" }} />
//             <h6>{podcast.files[0].creatorName}</h6>
//             <h6>{podcast.files[0].views}</h6>
//           </Views>
//           <h4>{podcast.files[0].title}</h4>
//           <h6 style={{textAlign: "justify"}}>{podcast.files[0].description}</h6>

//         </Information>
//       </EpisodeTop>
//       <Episodebottom>
//           {podcast.files.map((item, index) => (
//             <Episodes key={item.id} onClick={() => handleOpenModal(index)}>
//               <img src={podcast.image} alt="image not found" style={{ height: "150px", width: "150px",borderRadius:"10px" }} />
//               <Information>
//                 <h4>{item.title}</h4>
//                 <h6 style={{textAlign: "justify"}}>{item.description}</h6>
//               </Information>
//             </Episodes> 
//           ))}
//       </Episodebottom>


//       {/* Modal for playing video/audio
//       <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="md" >
//         <DialogTitle style={{color:"blue"}}>{currentEpisode ? currentEpisode.title : ''}</DialogTitle>
//         <DialogContent style={{background: `linear-gradient(to bottom,#8635d4 , aqua)`,padding:"10px",color:"#33064d",fontWeight:"bolder",textAlign:"center"}}>
//           {currentEpisode && (
//             <>
//               {podcast.type === "audio" ? (
//                 <audio key={currentEpisode.source} controls autoPlay loop >
//                   <source src={currentEpisode.source} type="audio/mp3" />
//                   Your browser does not support the audio element.
//                 </audio>
//               ) : podcast.type === "video" ? (
//                 <video key={currentEpisode.source} controls width="100%" autoPlay loop style={{borderRadius:"10px"}}>
//                   <source src={currentEpisode.source} type="video/mp4" />
//                   Your browser does not support the video element.
//                 </video>
//               ) : (
//                 <div>Invalid media type</div>
//               )}
//               <p>{currentEpisode.description}</p>
//             </>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handlePrev} disabled={currentEpisodeIndex === 0}  variant="contained">
//             Previous
//           </Button>
//           <Button onClick={handleNext} disabled={currentEpisodeIndex === podcast.files.length - 1}  variant="contained">
//             Next
//           </Button>
//           <Button onClick={handleCloseModal} color="primary"  variant="contained">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog> */}
//     </ChannelTotal>
//   );
// };

// export default PodcastDetails;




import CustomAudioPlayer from "./CustomAudioPlayer";
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import getData from "../components/api";
import styled from "styled-components";
import "./PodcastDetails.css";
// import { Button } from "@mui/material";

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const Spinner = styled.div`
  --d: 22px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  color: #25b09b;
  box-shadow: 
    calc(1 * var(--d)) calc(0 * var(--d)) 0 0,
    calc(0.707 * var(--d)) calc(0.707 * var(--d)) 0 1px,
    calc(0 * var(--d)) calc(1 * var(--d)) 0 2px,
    calc(-0.707 * var(--d)) calc(0.707 * var(--d)) 0 3px,
    calc(-1 * var(--d)) calc(0 * var(--d)) 0 4px,
    calc(-0.707 * var(--d)) calc(-0.707 * var(--d)) 0 5px,
    calc(0 * var(--d)) calc(-1 * var(--d)) 0 6px;
  animation: l27 1s infinite steps(8);

  @keyframes l27 {
    100% { transform: rotate(1turn); }
  }
`;

const EpisodeTop = styled.div`
  padding: 10px;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
`;

const Episodes = styled.div`
  border-radius: 6px;
  margin: 1em;
  padding: 10px;
  color: ${({ theme }) => theme.text_secondary};
  background-color: ${({ theme }) => theme.bg};
  display: flex;
  gap: 5px;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
  box-shadow: ${({ isActive }) => (isActive ? "0 0 15px rgba(37, 176, 155, 0.6)" : "none")};

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 0 18px 0 rgba(0, 0, 0, 0.3);
    filter: brightness(1.3);
  }
`;

const Information = styled.div`
  @media (max-width: 430px) {
    font-size: 12px;
    overflow: hidden;
    display: -webkit-box;
    max-width: 100%;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
  }
`;

// const AudioPlayerContainer = styled.div`
//   position: fixed;
//   bottom: 0;
//   width: 100%;
//   background: #fff;
//   display: flex;
//   align-items: center;
//   padding: 10px;
//   box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
// `;

const ChannelTotal = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: 1.5fr 1fr;
  gap: 1em;
  overflow-y: scroll;
  overflow-x: hidden;
  @media (max-width: 770px) {
    display: block;
    text-align: center;
  }
`;

const PodcastDetails = ({ darkMode }) => {
  const [data, setData] = useState(null);
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(true);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const { id } = useParams();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const result = await getData();
  //       setData(result);
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

  let main_data = JSON.parse(localStorage.getItem("main_data"));
  useEffect(()=>{
    setData(main_data)
},[]);
  const filteredData = data ? data.filter((item) => item.id === id) : [];

  // if (loading) {
  //   return (
  //     <Loader>
  //       <Spinner />
  //     </Loader>
  //   );
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  if (filteredData.length === 0) {
    return <div>No podcast found with the provided ID.</div>;
  }

  const podcast = filteredData[0];
  const currentEpisode = podcast.files[currentEpisodeIndex];

  const playMedia = () => {
    if (podcast.type === "audio" && audioRef.current) {
      audioRef.current.load();
      audioRef.current.play();
    } else if (podcast.type === "video" && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
    }
  };

  const handleEpisodeChange = (index) => {
    setCurrentEpisodeIndex(index);
    setTimeout(playMedia, 100);
  };

  // const handleNext = () => {
  //   if (currentEpisodeIndex < podcast.files.length - 1) {
  //     setCurrentEpisodeIndex((prevIndex) => prevIndex + 1);
  //     setTimeout(playMedia, 100);
  //   }
  // };

  // const handlePrev = () => {
  //   if (currentEpisodeIndex > 0) {
  //     setCurrentEpisodeIndex((prevIndex) => prevIndex - 1);
  //     setTimeout(playMedia, 100);
  //   }
  // };

  return (
    <>
      <ChannelTotal>
        <EpisodeTop>
          <Information>
            {podcast.type === "video" ? (
              <>

                <video ref={videoRef} controls width="100%" height="auto" poster={podcast.image} style={{ maxHeight: "500px", objectFit: "cover", borderRadius: "10px" }}  >
                  <source src={currentEpisode.source} type="video/mp4" />
                </video>
                {/* <Button onClick={handlePrev} disabled={currentEpisodeIndex === 0} style={{margin:"10px"}} variant="contained">
                  Prev
                </Button >
                <Button onClick={handleNext} disabled={currentEpisodeIndex === podcast.files.length - 1} style={{margin:"10px"}} variant="contained">
                  Next
                </Button> */}
              </>
            ) : (
              <>
                <img src={podcast.image} alt="Podcast Cover" className="channel_img" />
                {/* <h4>{currentEpisode.title}</h4>
                <h6 style={{ textAlign: "justify" }}>{currentEpisode.description}</h6> */}
              </>
            )} <br />
            {podcast.type === "audio" && (


              // <Button onClick={handlePrev} disabled={currentEpisodeIndex === 0} style={{margin:"10px"}} variant="contained">
              //   Prev
              // </Button>
              <CustomAudioPlayer
                episodes={podcast.files}
                currentEpisodeIndex={currentEpisodeIndex}
                setCurrentEpisodeIndex={setCurrentEpisodeIndex}
                darkMode={darkMode}
              />

              // <Button onClick={handleNext} disabled={currentEpisodeIndex === podcast.files.length - 1} style={{margin:"10px"}} variant="contained">
              //   Next
              // </Button>

            )}
          </Information>
        </EpisodeTop>




        {/* Episodes List for both Audio & Video */}
        <div>
          {podcast.files.map((item, index) => (
            <Episodes
              key={item.id}
              onClick={() => handleEpisodeChange(index)}
              isActive={index === currentEpisodeIndex}
            >
              <img src={podcast.image} alt="Episode Cover" style={{ height: "150px", width: "150px", borderRadius: "10px" }} />
              <Information>
                <h4>{item.title}</h4>
                <h6 style={{ textAlign: "justify" }}>{item.description}</h6>
              </Information>
            </Episodes>
          ))}
        </div>
      </ChannelTotal>
    </>

  );
};

export default PodcastDetails;
