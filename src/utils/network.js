import axios from "axios";

const axiosInstance = axios.create({ baseURL: "http://192.168.1.154:1919/" });

const signUp = (email, username, password) => {
  return axiosInstance.post(
    "api/sign/up",
    { email, username, password },
    { timeout: 3000 }
  );
};

const verify = (email, code) => {
  return axiosInstance.post(
    "api/sign/verify",
    { email, code },
    { timeout: 3000 }
  );
};

const signIn = (email, password) => {
  return axiosInstance.post(
    "api/sign/in",
    { email, password },
    { timeout: 3000 }
  );
};

export { signUp, verify };
