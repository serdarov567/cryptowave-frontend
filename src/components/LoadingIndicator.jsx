import { Box, Spinner, Text } from "@chakra-ui/react";
import React from "react";

const LoadingIndicator = (props) => {
  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      w={'full'}
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="background.200"
        color="violet.500"
        h={"50px"}
        w={"50px"}
      />
      <Text fontSize={'sm'} marginTop={'10px'}>{props.title}</Text>
    </Box>
  );
};

export default LoadingIndicator;
