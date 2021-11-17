import Head from "next/head";
import DynamicText, { DynamicTextRefMethod } from "components/DynamicText";
import { Box, Center, Flex, Input } from "@chakra-ui/react";
import { useRef, useState } from "react";

const Home = () => {
  const [txt, setTxt] = useState("Random text");
  const dynamicRef = useRef<DynamicTextRefMethod>();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    dynamicRef.current.changeValue(newValue);
    setTxt(newValue);
  };

  return (
    <Center  h="100vh">
      <Head>
        <title>Coding Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex width="100%" justifyContent="center">
        <Center minW="200px" maxW="100%">
          <Box maxW="100%">
            <DynamicText ref={dynamicRef} />
            <Input value={txt} onChange={onChange} />
          </Box>
        </Center>
      </Flex>
    </Center>
  )
};

export default Home;
