import React, { useState, useRef, useEffect, useContext } from "react";

import {
  Box,
  Flex,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
  Tooltip,
  Spinner,
} from "@chakra-ui/react";

import AudioPlayerContext from "../../context/AudioPlayerContext";

import PlayButton from "./PlayButton";
import PauseButton from "./PauseButton";
import TopBar from "./TopBar";

const PlayerScaffold = ({ audioData, videoData, courseData }) => {
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loop, setLoop] = useState();

  const [sliderMax, setSliderMax] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const [pauseSliderValue, setPauseSliderValue] = useState(false);
  const [thumbColor, setThumbColor] = useState("red.500");
  const [showTooltip, setShowTooltip] = useState(false);

  const [isFukushu, setIsFukushu] = useState(false);
  const [isYoshu, setIsYoshu] = useState(true);
  const [yoshuData, setYoshuData] = useState([]);
  const [fukushuData, setFukushuData] = useState([]);

  const [currentPlaying, setCurrentPlaying] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [dataIndex, setDataIndex] = useState(0);
  const [isMax, setIsMax] = useState(false);
  const [max, setMax] = useState(0);

  const audioPlayer = useRef();

  const { audioLevel } = useContext(AudioPlayerContext);

  useEffect(() => {
    setIsPlaying(false);
    setIsMax(false);
    setMax(currentData.length - 1);
    setDataIndex(0);
  }, [currentData]);

  useEffect(() => {
    if (currentTime >= duration) {
      setIsPlaying(false);
    }
  }, [currentTime]);

  useEffect(() => {
    setYoshuData(formatAudioData(audioData.予習, videoData, courseData));
    setFukushuData(formatAudioData(audioData.復習, videoData, courseData));
  }, []);

  useEffect(() => {
    if (isYoshu) {
      setCurrentData(yoshuData);
    } else if (isFukushu) {
      setCurrentData(fukushuData);
    }
  }, [isFukushu, isYoshu]);

  useEffect(() => {
    setCurrentPlaying(currentData[dataIndex]);
  }, [dataIndex]);

  useEffect(() => {
    setCurrentData(yoshuData);
    setCurrentPlaying(yoshuData[0]);
  }, [yoshuData, fukushuData]);

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    setSliderMax(seconds);
  }, [currentPlaying]);

  useEffect(() => {
    if (isPlaying) {
      audioPlayer.current.play();
      setLoop(
        setInterval(() => {
          console.log("tick");
          setCurrentTime(audioPlayer?.current?.currentTime);
          setSliderValue(audioPlayer?.current?.currentTime);
        }, 1)
      );
    } else {
      audioPlayer.current.pause();
      clearInterval(loop);
    }
  }, [isPlaying]);

  useEffect(() => {
    console.log(audioPlayer.current.readyState);
    if (audioPlayer.current.readyState === 4) {
      const seconds = Math.floor(audioPlayer.current.duration);
      setDuration(seconds);
      setSliderMax(seconds);
    }
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  useEffect(() => {
    audioPlayer.current.volume = audioLevel;
    setCurrentTime(audioPlayer.current.currentTime);
  }, [audioPlayer?.current?.currentTime]);

  const formatTime = (rawSeconds) => {
    const minutes = Math.floor(rawSeconds / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(rawSeconds % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

    if (minutes * 60 + seconds < 0) {
      return "00:00";
    } else {
      return `${returnedMinutes}:${returnedSeconds}`;
    }
  };

  const formatAudioData = (audioData, videoData, courseData) => {
    const formatted = audioData.map((file) => {
      const url = `${process.env.NEXT_PUBLIC_EK3_ROOT}/${courseData}/${courseData}L/${file.slug}/D${videoData.day}${file.slug}${file.id}.wav`;
      return { ...file, url: url };
    });
    console.log(formatted);
    return formatted;
  };

  const handlePlayerButton = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSliderValue = () => {
    if (isFukushu) {
      setThumbColor("blue.700");
    } else if (isYoshu) {
      setThumbColor("red.700");
    }
  };

  const handleSliderChange = (v) => {
    audioPlayer.current.currentTime = v;
    setSliderValue(v);
    setPauseSliderValue(false);
  };

  const handleQuestionType = () => {
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
    setIsYoshu(!isYoshu);
    setIsFukushu(!isFukushu);

    if (isYoshu) {
      setThumbColor("blue.500");
      setCurrentData(yoshuData);
      setCurrentPlaying(yoshuData[0]);
    } else if (isFukushu) {
      setThumbColor("red.500");
      setCurrentData(fukushuData);
      setCurrentPlaying(fukushuData[0]);
    }
  };

  const handleQuestionNumberLeft = () => {
    if (dataIndex === 0) {
      return;
    }
    setDuration(0);
    setCurrentTime(0);
    setIsPlaying(false);
    setIsMax(false);
    setDataIndex((dataIndex) => dataIndex - 1);
  };
  const handleQuestionNumberRight = () => {
    if (isMax) {
      return;
    } else if (dataIndex + 1 === max) {
      setIsMax(true);
    }
    setIsPlaying(false);
    setDataIndex((dataIndex) => dataIndex + 1);
    console.log(dataIndex);
  };

  return (
    <Box
      boxShadow="md"
      mt={5}
      bg={isYoshu ? "blue.100" : isFukushu && "red.200"}
      pt={3}
      pb={2}
      px={2}
      borderRadius="md"
    >
      <TopBar
        dataIndex={dataIndex}
        isMax={isMax}
        currentPlaying={currentPlaying}
        currentData={currentData}
        yoshuData={yoshuData}
        fukushuData={fukushuData}
        formatTime={formatTime}
        duration={duration}
        isYoshu={isYoshu}
        isFukushu={isFukushu}
        handleQuestionType={handleQuestionType}
        handleQuestionNumberLeft={handleQuestionNumberLeft}
        handleQuestionNumberRight={handleQuestionNumberRight}
        audioData={audioData}
      />
      <Flex alignItems="center">
        <Flex>
          {!isPlaying ? (
            <PlayButton handlePlayerButton={handlePlayerButton} />
          ) : (
            <PauseButton handlePlayerButton={handlePlayerButton} />
          )}
        </Flex>
        <Flex alignItems={"center"} p={3} ms={4} w="100%">
          <Flex
            flexDir={"column"}
            fontWeight="bold"
            bg="white"
            borderRadius="md"
            p={2}
            alignItems={"center"}
          >
            <Text>{currentTime ? formatTime(currentTime) : "00:00"}</Text>
            <Text fontStyle={"italic"} fontSize="sm" fontWeight={"normal"}>
              {duration ? formatTime(duration) : "00:00"}
            </Text>
          </Flex>
          <Slider
            value={pauseSliderValue ? undefined : currentTime}
            mx={5}
            minW={100}
            defaultValue={0}
            max={sliderMax}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onChangeStart={handleSliderValue}
            onChange={(v) => handleSliderChange(v)}
            onChangeEnd={() =>
              isYoshu
                ? setThumbColor("red.500")
                : isFukushu && setThumbColor("blue.500")
            }
            focusThumbOnChange={false}
          >
            <SliderTrack
              bg={isYoshu ? "blue.50" : isFukushu && "red.50"}
              onMouseDown={() => {
                setPauseSliderValue(true);
              }}
              onMouseUp={() => setPauseSliderValue(false)}
            >
              <SliderFilledTrack bg={isYoshu ? "blue.300" : "red.300"} />
            </SliderTrack>
            <Tooltip
              fontWeight="bold"
              hasArrow
              bg="white"
              color="black"
              placement="top"
              isOpen={showTooltip}
              label={formatTime(sliderValue)}
            >
              <SliderThumb bg={thumbColor} boxSize={5} />
            </Tooltip>
          </Slider>
          {}
          <audio
            ref={audioPlayer}
            src={currentPlaying ? currentPlaying.url : ""}
            preload="metadata"
          ></audio>
          <Text fontWeight="bold" bg="white" borderRadius="md" p={2}>
            {!isNaN(duration) ? (
              "-" + formatTime(duration - currentTime)
            ) : (
              <Spinner size="sm" />
            )}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default PlayerScaffold;
