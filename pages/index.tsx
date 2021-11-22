import Head from "next/head";
import Link from "next/link";
import DynamicText, { DynamicTextRefMethod } from "components/DynamicText";
import { Box, Center, Flex, Input, Text, Link as L } from "@chakra-ui/react";
import { useRef, useState } from "react";

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

const Home = () => {
  const [txt, setTxt] = useState("Random text");
  const dynamicRef = useRef<DynamicTextRefMethod>();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    dynamicRef.current.changeValue(newValue);
    setTxt(newValue);
  };

  return (
    <Center h="100vh">
      <Head>
        <title>Coding Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex width="100%" justifyContent="center">
        <Center minW="200px" maxW="100%" flexDirection="column">
          <Box maxW="100%">
            <DynamicText ref={dynamicRef} />
            <Input value={txt} onChange={onChange} />
            <Box mt={12}>
              <L>
                <div>
                  <Link href="/blog">Go to blog</Link>
                </div>
              </L>
              <L>
                <div>
                  <Link href="/dashboard">Go to dashboard</Link>
                </div>
              </L>
            </Box>
          </Box>
        </Center>
      </Flex>
    </Center>
  );
};

export default Home;
