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
  SkeletonText,
} from "@chakra-ui/react";

import AudioPlayerContext from "../../context/AudioPlayerContext";

import PlayButton from "./PlayButton";
import PauseButton from "./PauseButton";
import TopBar from "./TopBar";
import VideoContext from "../../context/VideoContext";

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
  const [fukushuOnly, setFukushuOnly] = useState(false);
  const [yoshuOnly, setYoshuOnly] = useState(false);

  const [currentPlaying, setCurrentPlaying] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [dataIndex, setDataIndex] = useState(0);
  const [isMax, setIsMax] = useState(false);
  const [max, setMax] = useState(0);

  const audioPlayer = useRef();

  const { audioLevel } = useContext(AudioPlayerContext);
  const { currentVideo } = useContext(VideoContext);

  useEffect(() => {
    if (isNaN(duration)) {
      debugger;
    }
  });

  useEffect(() => {
    if (!isNaN(audioPlayer?.current?.duration)) {
      const seconds = Math.floor(audioPlayer.current.duration);
      setDuration(seconds);
      setSliderMax(seconds);
    }
    console.log("source", audioPlayer.current.src);
    console.log("duration", audioPlayer.current.duration);
  }, [audioPlayer?.current?.duration]);

  useEffect(() => {
    if (duration !== 0) {
      if (currentTime >= duration) {
        setIsPlaying(false);
      }
    }
  }, [currentTime]);

  //Setting and Manipulating Data

  //Load data on component load
  useEffect(() => {
    if (audioData.予習) {
      setYoshuData(formatAudioData(audioData?.予習, videoData, courseData));
    }
    if (audioData.復習) {
      setFukushuData(formatAudioData(audioData?.復習, videoData, courseData));
    }
    if (audioData.予習 === undefined) {
      setCurrentData(fukushuData);
      setFukushuOnly(true);
      setIsFukushu(true);
      setIsYoshu(false);
    }
  }, []);

  useEffect(() => {
    if (audioData.予習 && audioData.復習) {
      setYoshuOnly(false);
      setFukushuOnly(false);
    }
    if (audioData.予習) {
      setYoshuData(formatAudioData(audioData?.予習, videoData, courseData));
    }
    if (audioData.復習) {
      setFukushuData(formatAudioData(audioData?.復習, videoData, courseData));
    }
    if (audioData.予習) {
      setIsYoshu(true);
      setIsFukushu(false);
      setCurrentData(yoshuData);
    } else if (!audioData.予習) {
      setIsFukushu(true);
      setIsYoshu(false);
      setCurrentData(fukushuData);
      setFukushuOnly(true);
    }
    setCurrentTime(0);
    console.log("Video change data:");
    console.log(currentData);
  }, [currentVideo]);

  //Set initial data state
  useEffect(() => {
    if (audioData.予習) {
      setCurrentData(yoshuData);
      setCurrentPlaying(yoshuData[0]);
    } else if (!audioData.予習) {
      setCurrentData(fukushuData);
      setCurrentPlaying(fukushuData[0]);
      setFukushuOnly(true);
    }
  }, [yoshuData, fukushuData]);

  //Set data upon change in data index
  useEffect(() => {
    setCurrentPlaying(currentData[dataIndex]);
  }, [dataIndex]);

  useEffect(() => {
    setIsPlaying(false);
    setDataIndex(0);
    setCurrentPlaying(currentData[0]);
    setIsMax(false);
    setMax(currentData.length - 1);
  }, [currentData]);

  // useEffect(() => {
  //   console.log(audioPlayer.current.src);
  //   const seconds = Math.floor(audioPlayer.current.duration);
  //   setDuration(seconds);
  //   setSliderMax(seconds);
  // }, [audioPlayer?.current?.src]);

  useEffect(() => {
    if (isPlaying) {
      audioPlayer.current.play();
      setLoop(
        setInterval(() => {
          console.log("tick");
          setCurrentTime(audioPlayer?.current?.currentTime);
          setSliderValue(audioPlayer?.current?.currentTime);
        }, 10)
      );
    } else if (!isPlaying) {
      audioPlayer.current.pause();
      clearInterval(loop);
    }
  }, [isPlaying]);

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    if (!isNaN(seconds) && seconds !== undefined) {
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
    console.log(audioData);
    const formatted = audioData.map((file) => {
      const url = `${process.env.NEXT_PUBLIC_EK3_ROOT}/${courseData}/${courseData}L/${file.slug}/D${videoData.day}${file.slug}${file.id}.mp3`;
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

  const handleQuestionTypeYS = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setIsYoshu(true);
    setIsFukushu(false);
    setCurrentData(yoshuData);
    setCurrentPlaying(yoshuData[0]);
    setThumbColor("blue.500");
  };

  const handleQuestionTypeFS = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setIsYoshu(false);
    setIsFukushu(true);

    setThumbColor("red.500");
    setCurrentData(fukushuData);
    setCurrentPlaying(fukushuData[0]);
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
    setDuration(0);
    setCurrentTime(0);
    setIsPlaying(false);
    setDataIndex((dataIndex) => dataIndex + 1);
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
        yoshuOnly={yoshuOnly}
        fukushuData={fukushuData}
        fukushuOnly={fukushuOnly}
        formatTime={formatTime}
        duration={duration}
        isYoshu={isYoshu}
        isFukushu={isFukushu}
        handleQuestionTypeYS={handleQuestionTypeYS}
        handleQuestionTypeFS={handleQuestionTypeFS}
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
            // preload="metadata"
          ></audio>
          {duration !== 0 && !isNaN(duration) ? (
            <Text fontWeight="bold" bg="white" borderRadius="md" p={2}>
              {"-" + formatTime(duration - currentTime)}
            </Text>
          ) : (
            <Box p={4} bg={"white"} borderRadius="md">
              <SkeletonText noOfLines={1} w={6} fontSize="md" />
            </Box>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default PlayerScaffold;
