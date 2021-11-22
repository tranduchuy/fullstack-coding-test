import {useState} from 'react';
import {
    Flex,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    Button,
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalCloseButton,
    ModalBody,
    useToast,
} from '@chakra-ui/react';
import {AddIcon} from '@chakra-ui/icons';
import firestore from "firebase/db";

import {Post, PostInfo} from 'services/types';
import {api} from 'services/api';
import {AxiosError} from 'axios';


type Props = {
    initPosts: Post[];
}
const DashboardPage = ({initPosts}: Props): JSX.Element => {
    const [posts, setPosts] = useState<PostInfo[]>(initPosts);
    const [isOpen, setOpen] = useState(false);
    const toast = useToast();
    const onClose = () => setOpen(false);

    const openCreateModal = () => {
        setOpen(true);
    }

    const openEditModal = () => {
        setOpen(true);
    }

    const onSubmit = () => {
        console.log('Submit the form');
    }

    const onDelete = (id: string) => {
        const val = window.confirm('Are you sure deleting this blog?');
        if (val) {
            api.delete('/blog/' + id)
                .then(() => reloadList())
                .catch((err: AxiosError) => {
                    toast({
                        title: 'Cannot delete blog',
                        description: err.response?.data?.message || err.message,
                        status: 'error',
                        duration: 5000,
                        isClosable: true
                    });
                })
        }
    }

    const reloadList = () => {
        api.get<PostInfo[]>('/blog')
            .then(res => setPosts(res.data))
            .catch((err: AxiosError) => {
                toast({
                    title: 'Cannot load blog list',
                    description: err.response?.data?.message || err.message,
                    status: 'error',
                    duration: 5000,
                    isClosable: true
                });
            })
    }

    return (
        <>
            <Flex direction="column" color="gray.800" p={6}>
                <Box>
                    <Button colorScheme="blue" leftIcon={<AddIcon />} size="sm" onClick={openCreateModal}>Create blog</Button>
                </Box>

                <Table variant="simple">
                    <TableCaption>Blog list</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>#</Th>
                            <Th>Title</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            posts.map((p, index) => {
                                return (
                                    <Tr key={p.id}>
                                        <Td>{index + 1}</Td>
                                        <Td>{p.title}</Td>
                                        <Td>
                                            <Button colorScheme="red" size="sm" onClick={() => onDelete(p.id)}>Delete</Button>
                                        </Td>
                                    </Tr>
                                )
                            })
                        }
                    </Tbody>
                </Table>
            </Flex>
            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Add / edit blog
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onSubmit}>
                            Save
            </Button>
                        <Button variant="ghost" onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export async function getServerSideProps() {
    try {
        const posts = await firestore
            .collection("blog")
            .get();

        return {
            props: {
                initPosts: posts.docs.map(entry => {
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

export default DashboardPage;
