import { useBreakpointValue } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const useFade = (initial) => {
  const [show, setShow] = useState(initial);
  const [isVisible, setVisible] = useState(show);

  // Update visibility when show changes
  useEffect(() => {
    if (show) setVisible(true);
  }, [show]);

  // When the animation finishes, set visibility to false
  const onAnimationEnd = () => {
    if (!show) setVisible(false);
  };

  const style = {
    animation: useBreakpointValue({
      base: "",
      md: `${show ? "fadeIn" : "fadeOut"} 200ms forwards`,
    }),
  };

  // These props go on the fading DOM element
  const fadeProps = {
    style,
    onAnimationEnd,
  };

  return [isVisible, setShow, fadeProps];
};

const useHeight = (initial) => {
  const [grow, setGrow] = useState(initial);
  const [isGrow, setIsGrow] = useState(grow);

  // Update visibility when show changes
  useEffect(() => {
    if (grow) setIsGrow(true);
  }, [grow]);

  // When the animation finishes, set visibility to false
  const onAnimationEnd = () => {
    if (!grow) setIsGrow(false);
  };

  const style = {
    animation: useBreakpointValue({
      base: "",
      md: `${grow ? "grow" : "shrink"} 200ms forwards`,
    }),
  };

  // These props go on the fading DOM element
  const growProps = {
    style,
    onAnimationEnd,
  };

  return [isGrow, setGrow, growProps];
};

const useButtonHover = (effect) => {
  const [hover, setHover] = useState(false);

  let fadeEffect = hover ? effect : {};

  return { hover, setHover, fadeEffect };
};

export { useFade, useHeight, useButtonHover };
