import {
  Flex, Grid, Modal, ModalOverlay, ModalHeader, ModalFooter, ModalContent, Button,
  ModalCloseButton, ModalBody,
} from "@chakra-ui/react";
import Post from "components/Post";
import { useState } from "react";

type Post = {
  id: string;
  title: string;
  imageSrc: string;
  content: string;
}

export const products: Post[] = [
  {
    id: "1",
    title: "Factory farming: the real climate culprit",
    imageSrc: "//dkt6rvnu67rqj.cloudfront.net/sites/default/files/styles/305x205/public/media/Plant-Based-Treaty_0.jpg?itok=Bb2eCmHX",
    content: '',
  },
  {
    id: "2",
    title: "What’s the real cost of your burger?",
    imageSrc: "//dkt6rvnu67rqj.cloudfront.net/sites/default/files/styles/305x205/public/media/GettyImages-76747748.jpg?itok=e2BWsGD6",
    content: '',
  },
  {
    id: "1",
    title: "Factory farming: the real climate culprit",
    imageSrc: "//dkt6rvnu67rqj.cloudfront.net/sites/default/files/styles/305x205/public/media/Plant-Based-Treaty_0.jpg?itok=Bb2eCmHX",
    content: '',
  },
  {
    id: "2",
    title: "What’s the real cost of your burger?",
    imageSrc: "//dkt6rvnu67rqj.cloudfront.net/sites/default/files/styles/305x205/public/media/GettyImages-76747748.jpg?itok=e2BWsGD6",
    content: '',
  },
  {
    id: "1",
    title: "Factory farming: the real climate culprit",
    imageSrc: "//dkt6rvnu67rqj.cloudfront.net/sites/default/files/styles/305x205/public/media/Plant-Based-Treaty_0.jpg?itok=Bb2eCmHX",
    content: '',
  },
  {
    id: "2",
    title: "What’s the real cost of your burger?",
    imageSrc: "//dkt6rvnu67rqj.cloudfront.net/sites/default/files/styles/305x205/public/media/GettyImages-76747748.jpg?itok=e2BWsGD6",
    content: '',
  },
  {
    id: "1",
    title: "Factory farming: the real climate culprit",
    imageSrc: "//dkt6rvnu67rqj.cloudfront.net/sites/default/files/styles/305x205/public/media/Plant-Based-Treaty_0.jpg?itok=Bb2eCmHX",
    content: '',
  },
  {
    id: "2",
    title: "What’s the real cost of your burger?",
    imageSrc: "//dkt6rvnu67rqj.cloudfront.net/sites/default/files/styles/305x205/public/media/GettyImages-76747748.jpg?itok=e2BWsGD6",
    content: '',
  },
  {
    id: "1",
    title: "Factory farming: the real climate culprit",
    imageSrc: "//dkt6rvnu67rqj.cloudfront.net/sites/default/files/styles/305x205/public/media/Plant-Based-Treaty_0.jpg?itok=Bb2eCmHX",
    content: '',
  },
  {
    id: "2",
    title: "What’s the real cost of your burger?",
    imageSrc: "//dkt6rvnu67rqj.cloudfront.net/sites/default/files/styles/305x205/public/media/GettyImages-76747748.jpg?itok=e2BWsGD6",
    content: '',
  },
];

const BlogPage = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Post | null>(null);

  const clickOnPost = (key: string) => {
    const post = products.find(p => p.id === key);
    if (post) {
      setSelected(post);
      setIsOpen(true);
    }
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <Flex
      direction="column"
      justifyContent="center"
      maxW={{ xl: "1200px" }}
      m="0 auto"
      minH="100vh"
    >
      <Grid
        w="full"
        gridGap="10"
        gridTemplateColumns="repeat( auto-fit, minmax(300px, 1fr) )"
      >
        {products.map((p) => (
          <Post
            key={p.id} {...p}
            onClick={() => {
              clickOnPost(p.id);
            }} />
        ))}
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selected?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selected?.content}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default BlogPage;