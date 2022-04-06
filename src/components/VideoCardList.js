import React from 'react';
import VideoModal from './VideoModal'
import { Flex, Wrap } from '@chakra-ui/react'


const VideoCardList = ({ videos }) => {
    return (
        <Flex
            flexDir="row"
        >
            <Flex
                mt={10}
            >
                <Wrap spacing="15px">
                    {videos.map((video) => {
                        return (
                            <VideoModal key={video.id} video={video} />
                        );
                    })}
                </Wrap>
            </Flex>

        </Flex>
    );
};

export default VideoCardList;
