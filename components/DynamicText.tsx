import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Heading } from "@chakra-ui/react";

export type DynamicTextRefMethod = {
  changeValue: (value: string) => void;
}

const DynamicText = forwardRef<DynamicTextRefMethod>(({}, ref): JSX.Element => {
  const [value, setValue] = useState("Random Text");

  const changeValue = (newValue) => {
    setValue(newValue);
  };

  useImperativeHandle(ref, () => {
    return {
      changeValue
    }
  })

  return <Heading as="h1">{value}</Heading>;
})

export default DynamicText;
