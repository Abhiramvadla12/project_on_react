import { useState, useRef, useEffect } from "react";
import { IconButton, Slider, Box } from "@mui/material";
import { PlayArrow, Pause, SkipNext, SkipPrevious, Download, VolumeUp, VolumeOff } from "@mui/icons-material";
import styled from "styled-components";

const AudioPlayerContainer = styled.div`
  display: flex;
  align-items: center;
  background: black;
  color: white;
  padding: 15px;
  border-radius: 10px;
  gap: 10px;
  width: 100%;
  justify-content: center;
`;

const CustomAudioPlayer = ({ episodes, currentEpisodeIndex, setCurrentEpisodeIndex }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1); // Default volume 100%
  const [muted, setMuted] = useState(false);

  const currentEpisode = episodes[currentEpisodeIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentEpisodeIndex]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgress = () => {
    const currentTime = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    setProgress((currentTime / duration) * 100);
  };

  const handleSeek = (event, newValue) => {
    const newTime = (newValue / 100) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setProgress(newValue);
  };

  const handleNext = () => {
    if (currentEpisodeIndex < episodes.length - 1) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentEpisodeIndex > 0) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }
  };

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
    audioRef.current.volume = newValue;
  };

  const toggleMute = () => {
    setMuted(!muted);
    audioRef.current.muted = !muted;
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = currentEpisode.source;
    link.download = currentEpisode.title || "podcast_episode.mp3"; // Default filename if title is missing
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AudioPlayerContainer>
      <IconButton onClick={handlePrev} disabled={currentEpisodeIndex === 0} color="primary">
        <SkipPrevious />
      </IconButton>

      <IconButton onClick={togglePlayPause} color="primary">
        {isPlaying ? <Pause /> : <PlayArrow />}
      </IconButton>

      <Slider
        value={progress}
        onChange={handleSeek}
        sx={{ color: "white", width: "200px" }}
      />

      <IconButton onClick={handleNext} disabled={currentEpisodeIndex === episodes.length - 1} color="primary">
        <SkipNext />
      </IconButton>

      {/* Volume Control */}
      <IconButton onClick={toggleMute} color="primary">
        {muted ? <VolumeOff /> : <VolumeUp />}
      </IconButton>
      <Box sx={{ width: 100 }}>
        <Slider
          value={muted ? 0 : volume}
          onChange={handleVolumeChange}
          step={0.01}
          min={0}
          max={1}
          sx={{ color: "white" }}
        />
      </Box>

      {/* Download Button */}
      <IconButton onClick={handleDownload} color="primary">
        <Download />
      </IconButton>

      <audio ref={audioRef} src={currentEpisode.source} onTimeUpdate={handleProgress} />
    </AudioPlayerContainer>
  );
};

export default CustomAudioPlayer;
