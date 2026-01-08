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
// Put your VAPID public key here (from Firebase Console -> Project settings -> Cloud Messaging)
export const VAPID_KEY = "BLnMQOT8nQ-ValDTr4N_eR8EEKpVAjJGa6EBGml4KPYdfFze7yHILOFWIRXwDuH2NVr36XGmbik7UI6jVtFRnX4";

// Log the VAPID key on load (only in browser)
if (typeof window !== 'undefined') {
  // Slightly obfuscate in logs in case someone accidentally exposes console output publicly
  const short = VAPID_KEY.slice(0, 10) + '...' + VAPID_KEY.slice(-8);
  console.log('Using VAPID key:', short);
}

export const generateToken = async () => {
  const permission = await Notification.requestPermission();
  console.log('permission ->', permission);

  if (permission === 'granted') {
    try {
      // Wait for the already-registered service worker and pass it to getToken
      const registration = await navigator.serviceWorker.ready;
      console.log('service worker scope ->', registration.scope);
      const token = await getToken(messaging, {
        vapidKey: VAPID_KEY,
        serviceWorkerRegistration: registration,
      });
      console.log('generated token ->', token);
      return token || null;
    } catch (err) {
      console.error('Error generating token', err);
      return null;
    }
  }
  return null;
};
export async function getFcmToken(vapidKey) {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    console.error('Service workers are not supported in this environment.');
    return null;
  }

  try {
    // Ensure we use the already-registered service worker (scoped under PUBLIC_URL)
    // so Firebase doesn't attempt to register the SW at the site root and get an HTML response.
    const registration = await navigator.serviceWorker.ready;
    console.log('getFcmToken: registration.scope ->', registration.scope);
    try {
      console.log('getFcmToken: messaging object ->', messaging);
    } catch (e) {
      console.warn('getFcmToken: cannot inspect messaging object', e);
    }

    console.log('Calling getToken with vapidKey and serviceWorkerRegistration...');
    const currentToken = await getToken(messaging, {
      vapidKey,
      serviceWorkerRegistration: registration,
    });
    console.log('getFcmToken ->', currentToken);
    return currentToken;
  } catch (err) {
    console.error('Error getting FCM token', err);
    return null;
  }
}

export { onMessage, messaging };

// Expose debug helpers to the window so you can call them from the browser console
if (typeof window !== 'undefined') {
  try {
    window.__generateToken = generateToken;
    window.__getFcmToken = getFcmToken;
    window.__VAPID_KEY = VAPID_KEY;
    console.log('Debug helpers attached: __generateToken(), __getFcmToken(vapidKey), __VAPID_KEY');
  } catch (e) {
    // ignore in non-browser environments
  }
}
