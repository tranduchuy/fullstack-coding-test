import React, { useState } from "react";
import {
  Flex,
  Table,
  Thead,
  Tbody,
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
  ModalCloseButton,
  ModalBody,
  useToast,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import firestore from "firebase/db";
import { FullPageSpinner } from "components/FullPageSpinner";
import { PostInfo } from "services/types";
import { api } from "services/api";
import { AxiosError } from "axios";
import BlogForm from "components/BlogForm";

type Props = {
  initPosts: PostInfo[];
};
const DashboardPage = ({ initPosts }: Props): JSX.Element => {
  const [posts, setPosts] = useState<PostInfo[]>(initPosts);
  const [isOpen, setOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<PostInfo | null>(null);
  const toast = useToast();
  const onClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);

  const openCreateModal = () => {
    setOpen(true);
  };

  const openEditModal = (post: PostInfo) => {
    setOpen(true);
    setSelectedPost({ ...post });
  };

  const onDelete = (id: string) => {
    const val = window.confirm("Are you sure deleting this blog?");
    if (val) {
      setLoading(true);
      api
        .delete("/blog/" + id)
        .then(() => reloadList())
        .catch((err: AxiosError) => {
          toast({
            title: "Cannot delete blog",
            description: err.response?.data?.message || err.message,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        })
        .finally(() => {
          setLoading(false);
        })
    }
  };

  const handleOnSubmit = async (newData: PostInfo) => {
    try {
      console.log("Submit the form");
      console.log("newData: ", newData);
      setLoading(true);
      if (selectedPost) {
        await api.put("/blog/" + selectedPost.id, newData);
        toast({
          title: "Update blog successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        await api.post("/blog", newData);
        toast({
          title: "Create blog successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }

      onClose();
      reloadList();
    } catch (e) {
      setLoading(false);
      const err = e as AxiosError;
      toast({
        title: "Cannot set blog",
        description: err.response?.data?.message || err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const reloadList = () => {
    api
      .get<PostInfo[]>("/blog")
      .then((res) => setPosts(res.data))
      .catch((err: AxiosError) => {
        toast({
          title: "Cannot load blog list",
          description: err.response?.data?.message || err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      })
      .finally(() => {
        setLoading(false);
      })
  };

  return (
    <>
      <Flex direction="column" color="gray.800" p={6}>
        <Box>
          <Button colorScheme="blue" leftIcon={<AddIcon />} size="sm" onClick={openCreateModal}>
            Create blog
          </Button>
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
            {posts.map((p, index) => {
              return (
                <Tr key={p.id}>
                  <Td>{index + 1}</Td>
                  <Td>{p.title}</Td>
                  <Td>
                    <Button colorScheme="green" size="sm" onClick={() => openEditModal(p)}>
                      Edit
                    </Button>
                    <Button ml={2} colorScheme="red" size="sm" onClick={() => onDelete(p.id)}>
                      Delete
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <BlogForm data={selectedPost} onClose={onClose} onSubmit={handleOnSubmit} />
          </ModalBody>
        </ModalContent>
      </Modal>
      {loading && <FullPageSpinner />}
    </>
  );
};

export async function getServerSideProps() {
  try {
    const posts = await firestore.collection("blog").get();

    return {
      props: {
        initPosts: posts.docs.map((entry) => {
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
