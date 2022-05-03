import { useEffect, useState } from "react";
import { checkToken } from "./network";

const useIsSignedIn = () => {
  const [isSignedIn, setIsSignedIn] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    checkToken(localStorage.getItem("email"), localStorage.getItem("token"))
      .then((result) => {
        if (result.status === 200) {
          setIsSignedIn(true);
        } else {
          setIsSignedIn(false);
        }
        setLoading(false);
      })
      .catch((error) => {
        setIsSignedIn(false);
        setLoading(false);
      });
  }, []);

  return [isSignedIn, loading];
};

const signOut = () => {
  localStorage.clear();
};

export { useIsSignedIn, signOut };
