// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDgHQ_ICAAN2xDcUhq_TXL_hcIOsBEXi7Q",
  authDomain: "superchat-dbbdb.firebaseapp.com",
  projectId: "superchat-dbbdb",
  storageBucket: "superchat-dbbdb.firebasestorage.app",
  messagingSenderId: "734341682831",
  appId: "1:734341682831:web:95a56c8ba3b4df6fb942fa",
  measurementId: "G-23T169N49P"
});

const messaging = firebase.messaging();

// Handle background notifications
messaging.onBackgroundMessage((payload) => {
  console.log('Background message received: ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/favicon.ico',
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});