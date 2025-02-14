import { useState, useRef, useEffect } from "react";
import { IconButton, Slider, Box, Typography } from "@mui/material";
import { PlayArrow, Pause, SkipNext, SkipPrevious, Download, VolumeUp, VolumeOff, Replay10, Forward10 } from "@mui/icons-material";
import styled from "styled-components";

const AudioPlayerContainer = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.bg || "#fff"};
  color: primary;
  padding: 15px;
  border-radius: 10px;
  gap: 5px;
  justify-content: center;
  // flex-wrap: wrap; /* Allows wrapping on smaller screens */
  // width: 100%;
  max-width: 600px; /* Max width to keep it centered */
  margin: auto;

  @media (max-width: 600px) {
    flex-direction: column;
    padding: 10px;
    gap: 5px;
  }
`;

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 600px) {
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
  }
`;

const CustomAudioPlayer = ({ episodes, currentEpisodeIndex, setCurrentEpisodeIndex }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showRemainingTime, setShowRemainingTime] = useState(false);

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
    const audio = audioRef.current;
    if (audio) {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
      setProgress((audio.currentTime / (audio.duration || 1)) * 100);
    }
  };

  const handleSeek = (event, newValue) => {
    if (audioRef.current) {
      const newTime = (newValue / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setProgress(newValue);
    }
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
    if (audioRef.current) {
      audioRef.current.volume = newValue;
    }
  };

  const toggleMute = () => {
    setMuted(!muted);
    if (audioRef.current) {
      audioRef.current.muted = !muted;
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = currentEpisode.source;
    link.download = currentEpisode.title || "podcast_episode.mp3";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleEnded = () => {
    if (currentEpisodeIndex < episodes.length - 1) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    } else {
      setIsPlaying(false);
    }
  };

  const handleSkip = (seconds) => {
    if (audioRef.current) {
      let newTime = audioRef.current.currentTime + seconds;
      if (newTime < 0) newTime = 0;
      if (newTime > audioRef.current.duration) newTime = audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      setProgress((newTime / (audioRef.current.duration || 1)) * 100);
    }
  };

  const toggleTimeDisplay = () => {
    setShowRemainingTime(!showRemainingTime);
  };

  const formatTime = (time) => {
    if (isNaN(time) || time < 0) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <AudioPlayerContainer>
      <ControlsContainer>
        <IconButton
          onClick={handlePrev}
          disabled={currentEpisodeIndex === 0}
          color="primary"
          sx={{ '&.Mui-disabled': { color: 'lightgray' } }}
        >
          <SkipPrevious />
        </IconButton>

        <IconButton onClick={() => handleSkip(-10)} color="primary">
          <Replay10 />
        </IconButton>

        <IconButton onClick={togglePlayPause} color="primary">
          {isPlaying ? <Pause /> : <PlayArrow />}
        </IconButton>

        <IconButton onClick={() => handleSkip(10)} color="primary">
          <Forward10 />
        </IconButton>

        <IconButton
          onClick={handleNext}
          disabled={currentEpisodeIndex === episodes.length - 1}
          color="primary"
          sx={{ '&.Mui-disabled': { color: 'lightgray' } }}
        >
          <SkipNext />
        </IconButton>
      </ControlsContainer>

      <Box display="flex" alignItems="center" gap="10px" width="100%" maxWidth="400px">
        <Typography variant="body2" >{formatTime(currentTime)}</Typography>
        <Slider value={progress} onChange={handleSeek} sx={{ flex: 1 }} />
        <Typography variant="body2" onClick={toggleTimeDisplay} style={{ cursor: "pointer" }}>
          {showRemainingTime ? `-${formatTime(duration - currentTime)}` : formatTime(duration)}
        </Typography>
      </Box>

      <ControlsContainer>
        <IconButton onClick={toggleMute} color="primary">
          {muted ? <VolumeOff /> : <VolumeUp />}
        </IconButton>

        <Box sx={{ width: 100 }} color="primary">
          <Slider value={muted ? 0 : volume} onChange={handleVolumeChange} step={0.01} min={0} max={1} />
        </Box>

        <IconButton onClick={handleDownload} color="primary">
          <Download />
        </IconButton>
      </ControlsContainer>

      <audio ref={audioRef} src={currentEpisode.source} onTimeUpdate={handleProgress} onEnded={handleEnded} />
    </AudioPlayerContainer>
  );
};

export default CustomAudioPlayer;
