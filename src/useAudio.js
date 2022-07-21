import React, { useState, useEffect } from "react";

export const useAudio = (url, options={cycle: false}) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = (value) => {
    if(value === undefined || value === null) {
      setPlaying(!playing)
    } else {
      setPlaying(value);
    }
  };

  useEffect(() => {
      playing ? audio.play() : audio.pause();
    },
    [playing]
  );

  useEffect(() => {
    audio.addEventListener('ended', () => {
      if(options.cycle === true) {
        audio.play();
      }
      setPlaying(options.cycle)
    });
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};