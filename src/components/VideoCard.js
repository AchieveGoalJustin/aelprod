import React from 'react';
import { VStack, Divider, Text, Image, Container } from '@chakra-ui/react'

const Card = ({ video }) => {
  return (

    <Container
      background="blue.100"
      boxShadow="md"
      maxWidth="30ch"
      p={5}
      m={5}
      borderRadius="md"
      _hover={{
        background: 'blue.200',
        color: "gray.700",
        cursor: "pointer",
        transform: 'scale(1.03)'
      }}
    >
      <VStack>
        <Image borderRadius="md" src={`${process.env.NEXT_PUBLIC_EK3_ROOT}/EK3/EK3TN/EK3TN-${video.day}.png`} />
        <Text fontSize="xl" fontWeight="bold">{video.title}</Text>
        <Divider borderColor={'blue.600'} />
        <Text textAlign={"left"}>{video.shortDesc}</Text>
      </VStack>
    </Container>
  )
};

export default Card;
