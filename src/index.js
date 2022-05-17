import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBP5DWISpiiaZk3ld0yDyI7FDtZlYcaH_M",
  authDomain: "cryptowaveclub.firebaseapp.com",
  projectId: "cryptowaveclub",
  storageBucket: "cryptowaveclub.appspot.com",
  messagingSenderId: "529700855210",
  appId: "1:529700855210:web:34f8666ea27e6da820dfd3",
  measurementId: "G-L1V9FTCS9G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);
getToken(messaging, {
  vapidKey:
    "BJVnUY8icJDTZ_B42odm6f3o4NA83HgUEm8eiYsekPrWR3hiBshuSO4nuxupfhLsWLHBu3Kn3bxq39lSuHsPEL8",
});

onMessage(messaging, (payload) => {
  console.log(payload);
  toast(`${payload.notification.title}: ${payload.notification.body}`);
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
