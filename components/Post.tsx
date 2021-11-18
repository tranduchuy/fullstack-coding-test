import { Text, Image, Box, Stack, Heading } from "@chakra-ui/react";

type Props = {
  imageSrc: string;
  imageAlt?: string;
  title: string;
  onClick?: () => void;
}

const Post = ({ imageSrc, imageAlt, title, onClick }: Props): JSX.Element => (
  <Stack p={{ base: "0 2rem" }} onClick={onClick}>
    <Image objectFit="cover" src={imageSrc} alt={imageAlt || ''} />
    <Heading color="teal.300" size="md" textTransform="capitalize">
      {title}
    </Heading>
  </Stack>
);

export default Post;
