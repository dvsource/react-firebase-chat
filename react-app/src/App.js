import React from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

// Firebase web app configs
const firebaseConfig = {
  apiKey: "AIzaSyCB_0zQa6nkvHTIC7etmock2HENu2Oj72E",
  authDomain: "fourroad-activities.firebaseapp.com",
  databaseURL: "https://fourroad-activities.firebaseio.com",
  projectId: "fourroad-activities",
  storageBucket: "fourroad-activities.appspot.com",
  messagingSenderId: "384653006496",
  appId: "1:384653006496:web:51fb740d3bf90db7c11bc5",
  measurementId: "G-W3FE4ZLDQJ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestrore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth)

  return (
    <div className="App">
      <header>
        chat app
      </header>

      <section>{user ? <ChatRoom /> : <SignIn />}</section>

    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return <button onClick={signInWithGoogle}>Sign in with Google</button>
}

function SignOut() {
  console.log(auth);
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom() {
  const messageRef = firestrore.collection('messages');
  const query = messageRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  console.log(messages);


  return (
    <>
    <SignOut/>
      <div>
        {messages && messages.map(msg => <ChatMessage key={msg.id} messgae={msg} />)}
      </div>
    </>
  )
}

function ChatMessage(props) {
  console.log(props);
  const { text, uid } = props.message
  return (
    <div>
      <pre>{uid}</pre>
      <p>{text}</p>
    </div>
  )
}

export default App;
