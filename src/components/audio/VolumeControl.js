import React from "react";

import { useState, useEffect, useContext } from "react";

import AudioPlayerContext from "../../context/AudioPlayerContext";

import {
  Box,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";

import {
  IoVolumeHigh,
  IoVolumeMedium,
  IoVolumeLow,
  IoVolumeMute,
} from "react-icons/io5";

const VolumeControl = ({ isYoshu, isFukushu }) => {
  const [vol, setVol] = useState(0);

  useEffect(() => {});

  const { audioLevel, setAudioLevel } = useContext(AudioPlayerContext);

  const setVolIcon = () => {
    if (audioLevel <= 0) {
      return <Icon h={6} w={6} as={IoVolumeMute} />;
    } else if (0 < audioLevel && audioLevel <= 0.3) {
      return <Icon h={6} w={6} as={IoVolumeLow} />;
    } else if (0.3 < audioLevel && audioLevel <= 0.7) {
      return <Icon h={6} w={6} as={IoVolumeMedium} />;
    } else if (0.7 < audioLevel && audioLevel <= 1) {
      return <Icon h={6} w={6} as={IoVolumeHigh} />;
    }
  };

  return (
    <>
      <Popover placement={"right"}>
        <PopoverTrigger>
          <Box
            borderRadius={"md"}
            p={2}
            pb={1}
            outline="none"
            as="button"
            me={5}
            _hover={{ bg: "white" }}
            _active={{
              bg: "gray",
              transform: "scale(0.98)",
            }}
          >
            {setVolIcon()}
          </Box>
        </PopoverTrigger>
        <PopoverContent
          w={10}
          h={150}
          p={3}
          ms={1}
          bg={isYoshu ? "blue.50" : isFukushu && "red.100"}
          border="none"
          boxShadow="md"
        >
          <Slider
            orientation="vertical"
            min={0}
            max={100}
            aria-label="slider-ex-1"
            defaultValue={audioLevel * 100}
            onChange={(v) => setAudioLevel(v / 100)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default VolumeControl;
