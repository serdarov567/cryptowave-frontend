/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyBP5DWISpiiaZk3ld0yDyI7FDtZlYcaH_M",
  authDomain: "cryptowaveclub.firebaseapp.com",
  projectId: "cryptowaveclub",
  storageBucket: "cryptowaveclub.appspot.com",
  messagingSenderId: "529700855210",
  appId: "1:529700855210:web:34f8666ea27e6da820dfd3",
  measurementId: "G-L1V9FTCS9G",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});