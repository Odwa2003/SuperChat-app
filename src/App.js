import React, { useState, useRef, useEffect } from 'react';
import './App.css';

import { firebase, auth, firestore, getFcmToken, onMessage, messaging } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { generateToken } from './firebase';

function App() {
  const [user] = useAuthState(auth);
  const [fcmToken, setFcmToken] = useState(null);
  useEffect(() =>{
    (async () => {
      const token = await generateToken();
      console.log('generateToken returned ->', token);
      if (token) setFcmToken(token);
    })();
  }, [])

  // ✅ Handle foreground messages
  useEffect(() => {
    onMessage(messaging, (payload) => {
      console.log("📩 Message received in foreground:", payload);
      if (payload?.notification) {
        const { title, body } = payload.notification;
        new Notification(title, { body });
      }
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>SUPERCHAT</h1>
        <SignOut />
      </header>

      {/* FCM Token UI for testing */}
      <div style={{ padding: 12, textAlign: 'center' }}>
        <h3>Push Notifications</h3>
        {fcmToken ? (
          <div>
            <textarea readOnly value={fcmToken} style={{ width: '80%', height: 80 }} />
            <br />
            <button onClick={() => { navigator.clipboard.writeText(fcmToken); }}>Copy token</button>
          </div>
        ) : (
          <div>
            <p>No FCM token yet. Allow notifications and reload if needed.</p>
          </div>
        )}
      </div>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  );
}

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  );
}

function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });
  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    });

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <main>
        {messages && messages.map(msg => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        <div ref={dummy}></div>
      </main>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Say something nice..."
        />
        <button type="submit" disabled={!formValue}>@</button>
      </form>
    </>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://api.iconify.design/mdi:account-circle.svg'} alt="user" />
      <p>{text}</p>
    </div>
  );
}

export default App;
