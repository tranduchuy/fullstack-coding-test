import {
    Flex, Grid, Modal, ModalOverlay, ModalHeader, ModalFooter, ModalContent, Button,
    ModalCloseButton, ModalBody,
} from "@chakra-ui/react";
import {useState} from "react";
import firestore from "firebase/db";
import {PostInfo} from 'services/types';
import Post from "components/Post";


type Props = {
    posts: PostInfo[];
}

const BlogPage = ({posts}: Props): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<PostInfo | null>(null);

    const clickOnPost = (key: string) => {
        const post = posts.find(p => p.id === key);
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
            maxW={{xl: "1200px"}}
            m="0 auto"
            minH="100vh"
        >
            <Grid
                w="full"
                gridGap="10"
                gridTemplateColumns="repeat( auto-fit, minmax(300px, 1fr) )"
            >
                {posts.map((p) => (
                    <Post
                        key={p.id} {...p}
                        onClick={() => {
                            clickOnPost(p.id);
                        }} />
                ))}
            </Grid>

            <Modal isOpen={isOpen}
                size="xl"
                onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{selected?.title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div dangerouslySetInnerHTML={{__html: selected?.content || ""}} />
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

export async function getServerSideProps() {
    try {
        const posts = await firestore
            .collection("blog")
            .get();

        return {
            props: {
                posts: posts.docs.map(entry => {
                    return {
                        id: entry.id,
                        ...entry.data(),
                    };
                }),
            },
        };
    } catch (e) {
        console.error(e);
        return {
            props: {
                posts: [],
            },
        };
    }
}

export default BlogPage;
