import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// Firebase configuration (kept from App.js)
const firebaseConfig = {
  apiKey: "AIzaSyDgHQ_ICAAN2xDcUhq_TXL_hcIOsBEXi7Q",
  authDomain: "superchat-dbbdb.firebaseapp.com",
  projectId: "superchat-dbbdb",
  storageBucket: "superchat-dbbdb.firebasestorage.app",
  messagingSenderId: "734341682831",
  appId: "1:734341682831:web:95a56c8ba3b4df6fb942fa",
  measurementId: "G-23T169N49P"
};


// Initialize Firebase app if not already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const firestore = firebase.firestore();

// Export legacy firebase objects for existing code
export { firebase, auth, firestore };

// Export modular messaging helpers
const messaging = getMessaging(firebase.app());

export const generateToken = async () =>{
  const permission = await Notification.requestPermission();
  console.log(permission);

  if(permission === "granted"){
      const token = await getToken(messaging, {
      vapidKey: "BLnMQOT8nQ-ValDTr4N_eR8EEKpVAjJGa6EBGml4KPYdfFze7yHILOFWIRXwDuH2NVr36XGmbik7UI6jVtFRnX4"
    })
    console.log(token);
  }
  
}
export async function getFcmToken(vapidKey) {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    console.error('Service workers are not supported in this environment.');
    return null;
  }

  try {
    // Ensure we use the already-registered service worker (scoped under PUBLIC_URL)
    // so Firebase doesn't attempt to register the SW at the site root and get an HTML response.
    const registration = await navigator.serviceWorker.ready;
    const currentToken = await getToken(messaging, {
      vapidKey,
      serviceWorkerRegistration: registration,
    });
    return currentToken;
  } catch (err) {
    console.error('Error getting FCM token', err);
    return null;
  }
}

export { onMessage, messaging };
