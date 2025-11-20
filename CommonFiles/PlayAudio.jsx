import React, { useState, useRef, useEffect } from 'react';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

export default function PlayAudio({ obj }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Cleanup when component unmounts
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Early return AFTER hooks
  if (!obj?.question_audio) return null;

  function handleTogglePlay() {
    if (!audioRef.current) {
      audioRef.current = new Audio(obj.question_audio);
      audioRef.current.onended = () => {
        setIsPlaying(false);
      };
    }

    if (!isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }

  return (
    <VolumeUpIcon sx={volumeupStyle(isPlaying)} onClick={handleTogglePlay} />
  );
}

const volumeupStyle = (isPlaying) => ({
  color: isPlaying ? '#86C440' : '#32C7FF',
  fontSize: 30,
  cursor: 'pointer',
  marginRight: '5px',
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    color: isPlaying ? '#6aa92e' : '#1da8e0',
  },
});
