import { createContext, useState } from "react";

const AudioPlayerContext = createContext();

export const AudioPlayerProvider = ({ children }) => {
  const [audioLevel, setAudioLevel] = useState(0.5);

  return (
    <AudioPlayerContext.Provider
      value={{
        audioLevel,
        setAudioLevel,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};

export default AudioPlayerContext;
