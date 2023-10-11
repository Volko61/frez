import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = async () => {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (error) {
        console.error(error);
      }
    };
    const signInWithGoogle = async () => {
      try {
        await signInWithPopup(auth, googleProvider);
      } catch (error) {
        console.error(error);
      }
    };
    const logOut = async () => {
      try {
        await signOut(auth);
      } catch (error) {
        console.error(error);
      }
    };
    return (
      <div>
        <div>
          {auth?.currentUser ? <h1>{auth.currentUser.email}🟩</h1> : <h1>Not Logged In🟥</h1>}
        </div>
        <div>
          <input placeholder="Email..." onChange={(e) => setEmail(e.target.value)}/>
          <input placeholder="Password..." type="password" onChange={(e) => setPassword(e.target.value)}/>
          <button onClick={signIn}>Sign In</button>
          <button onClick={signInWithGoogle}>Sign In With Google</button>
          <button onClick={logOut}>Log Out</button>
        </div>
      </div>
    );
};