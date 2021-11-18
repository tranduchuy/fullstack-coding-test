import { Flex, Spinner, Stack } from "@chakra-ui/react";

export const FullPageSpinner = (): JSX.Element => {
  return (
    <Flex
      style={{ position: "absolute", top: 0, left: 0 }}
      height="100vh"
      width="100vw"
      justifyContent="center"
      alignItems="center">
      <Stack direction="row" spacing={4}>
        <Spinner size="xl" />
      </Stack>
    </Flex>
  );
};