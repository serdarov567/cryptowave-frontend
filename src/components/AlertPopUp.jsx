import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";

const AlertPopUp = (props) => {
  return (
    <AlertDialog isOpen={props.isOpen} isCentered>
      <AlertDialogOverlay
        bg="none"
        backdropFilter={"auto"}
        backdropBlur={"2px"}
      />
      <AlertDialogContent bgColor={'background.200'} maxW={useBreakpointValue({base:'250px', md: '500px'})}>
        <AlertDialogHeader color={'#FFF'}>{props.title}</AlertDialogHeader>
        <AlertDialogBody>{props.children}</AlertDialogBody>
        <AlertDialogFooter>{props.footerComponents}</AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertPopUp
