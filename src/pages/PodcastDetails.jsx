import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import getData from "../components/api";
import { CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import styled from "styled-components";
import Logo from "../images/profile_dummy.webp";

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const EpisodeTop = styled.div`
  padding: 10px;
  color: ${({ theme }) => theme.text_secondary};
  display: flex;
  gap: 5px;
`;

const Episodes = styled.div`
  border-radius: 6px;
  margin: 10px;
  padding: 10px;
  color: ${({ theme }) => theme.text_secondary};
  background-color: ${({ theme }) => theme.bg};
  max-height: 10em;
  overflow: hidden;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  display: flex;
  gap: 5px;
  &:hover {
    cursor: pointer;
    transform: translateY(-4px);
    transition: all 0.4s ease-in-out;
    box-shadow: 0 0 18px 0 rgba(0, 0, 0, 0.3);
    filter: brightness(1.3);
  }
`;

const Information = styled.div``;

const Views = styled.div`
  padding: 10px;
  color: ${({ theme }) => theme.text_secondary};
  display: flex;
  gap: 8px;
`;

const PodcastDetails = () => {
  const [data, setData] = useState(null); // Store fetched data
  const [error, setError] = useState(null); // Handle errors
  const [loading, setLoading] = useState(true); // Loading state
  const [openModal, setOpenModal] = useState(false); // Modal visibility
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(null); // Track current episode index
  const { id } = useParams(); // Get podcast ID from URL

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

  // Filter podcasts by ID
  const filteredData = data ? data.filter((item) => item.id === id) : [];

  if (loading) {
    return (
      <Loader>
        <CircularProgress />
      </Loader>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (filteredData.length === 0) {
    return <div>No podcast found with the provided ID.</div>;
  }

  const podcast = filteredData[0];
  const currentEpisode = currentEpisodeIndex !== null ? podcast.files[currentEpisodeIndex] : null;

  const handleOpenModal = (index) => {
    setCurrentEpisodeIndex(index);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentEpisodeIndex(null);
  };

  const handleNext = () => {
    if (currentEpisodeIndex < podcast.files.length - 1) {
      setCurrentEpisodeIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentEpisodeIndex > 0) {
      setCurrentEpisodeIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div style={{ overflowY: "scroll" }}>
      <EpisodeTop>
        <img src={podcast.image} alt="image not found" style={{ height: "250px", width: "250px" }} />
        <Information>
          <h4>{podcast.files[0].title}</h4>
          <h6>{podcast.files[0].description}</h6>
          <Views>
            <img src={Logo} alt="image not found" style={{ height: "50px", width: "50px", borderRadius: "50%" }} />
            <h6>{podcast.files[0].creatorName}</h6>
            <h6>{podcast.files[0].views}</h6>
          </Views>
        </Information>
      </EpisodeTop>

      {podcast.files.map((item, index) => (
        <Episodes key={item.id} onClick={() => handleOpenModal(index)}>
          <img src={podcast.image} alt="image not found" style={{ height: "150px", width: "150px" }} />
          <Information>
            <h4>{item.title}</h4>
            <h6>{item.description}</h6>
          </Information>
        </Episodes>
      ))}

      {/* Modal for playing video/audio */}
      <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="md">
        <DialogTitle>{currentEpisode ? currentEpisode.title : ''}</DialogTitle>
        <DialogContent>
          {currentEpisode && (
            <>
              {podcast.type === "audio" ? (
                <audio key={currentEpisode.source} controls>
                  <source src={currentEpisode.source} type="audio/mp3" />
                  Your browser does not support the audio element.
                </audio>
              ) : podcast.type === "video" ? (
                <video key={currentEpisode.source} controls width="100%">
                  <source src={currentEpisode.source} type="video/mp4" />
                  Your browser does not support the video element.
                </video>
              ) : (
                <div>Invalid media type</div>
              )}
              <p>{currentEpisode.description}</p>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePrev} disabled={currentEpisodeIndex === 0}>
            Previous
          </Button>
          <Button onClick={handleNext} disabled={currentEpisodeIndex === podcast.files.length - 1}>
            Next
          </Button>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PodcastDetails;
