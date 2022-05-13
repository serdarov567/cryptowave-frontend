import { useLayoutEffect, useState } from "react";
import { checkToken } from "./network";

const useIsSignedIn = () => {
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  const [isSignedIn, setIsSignedIn] = useState(
    email !== null && token !== null
  );
  const [loading, setLoading] = useState(true);

  const verifyUser = async () => {
    try {
      const result = await checkToken(email, token);
      if (result.status === 200) {
        if (localStorage.getItem("username") === null)
          localStorage.setItem("username", result.data);
        setIsSignedIn(true);
      } else {
        setIsSignedIn(false);
      }
      setLoading(false);
    } catch (error) {
      setIsSignedIn(false);
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    verifyUser();
  }, []);

  return [isSignedIn, loading];
};

const signOut = () => {
  localStorage.clear();
};

export { useIsSignedIn, signOut };
