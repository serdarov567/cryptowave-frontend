import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalFooter,
  Heading,
  ModalContent,
  useBreakpointValue,
} from "@chakra-ui/react";

const PopUp = (props) => {
  console.log(props.children);
  return (
    <Modal
      size={useBreakpointValue({
        base: "xs",
        sm: "sm",
        md: "md",
        lg: "lg",
        xl: "xl",
      })}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <ModalOverlay bg="none" backdropFilter={"auto"} backdropBlur={"2px"} />
      <ModalContent bgColor={"background.200"} alignSelf={"center"}>
        <ModalHeader>
          <Heading fontSize={useBreakpointValue({ base: "md", md: "2xl" })}>
            {props.title}
          </Heading>
          <ModalCloseButton color={"#FFF"} _focus={{}} _hover={{}} />
        </ModalHeader>

        <ModalBody>{props.children}</ModalBody>

        <ModalFooter>{props.footerComponents}</ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PopUp;
