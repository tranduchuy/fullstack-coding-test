import { FormControl, FormLabel, Input, Box, Button, Alert, AlertIcon, AlertDescription } from "@chakra-ui/react";
import { PostInfo } from "services/types";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { useState } from "react";
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

type PostData = Omit<PostInfo, "id">;

type Props = {
  data?: PostData;
  onSubmit?: (data: PostData) => void;
  onClose?: () => void;
};

const BlogForm = ({ data, onSubmit, ...rest }: Props): JSX.Element => {
  const [title, setTitle] = useState(data?.title || "");
  const [imageSrc, setImageSrc] = useState(data?.imageSrc || "");
  const [content, setContent] = useState(data?.content || "");
  const [errorMsg, setErrorMsg] = useState("");

  const checkURL = (url): boolean => {
      return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
  }

  const emptyFormInputs = (): boolean => {
    return [title, imageSrc, content].some((v) => v.trim() === "");
  };

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (emptyFormInputs()) {
      setErrorMsg("Should fill out all inputs");
      return;
    }

    if (!checkURL(imageSrc)) {
      setErrorMsg("Invalid image source url string");
      return;
    }

    if (onSubmit) {
      onSubmit({ title, imageSrc, content });
    }
  };

  const onClose = () => {
    if (rest.onClose) {
      rest.onClose();
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      {errorMsg.trim() !== "" && (
        <Box my={4}>
          <Alert status="error" borderRadius={4}>
            <AlertIcon />
            <AlertDescription>{errorMsg}</AlertDescription>
          </Alert>
        </Box>
      )}

      <FormControl isRequired>
        <FormLabel>Title</FormLabel>
        <Input type="text" value={title} onChange={(event) => setTitle(event.currentTarget.value)} />
      </FormControl>

      <FormControl isRequired mt={6}>
        <FormLabel>Image Url</FormLabel>
        <Input type="text" value={imageSrc} onChange={(event) => setImageSrc(event.currentTarget.value)} />
      </FormControl>

      <FormControl isRequired mt={6}>
        <FormLabel>Content</FormLabel>
        <QuillNoSSRWrapper
          modules={modules}
          formats={formats}
          theme="snow"
          value={content}
          onChange={(v) => setContent(v)}
        />
      </FormControl>

      <Box mt={6} mb={6}>
        <Button colorScheme="blue" mr={3} type="submit">
          Save
        </Button>
        <Button variant="ghost" onClick={onClose}>
          Close
        </Button>
      </Box>
    </form>
  );
};

export default BlogForm;
