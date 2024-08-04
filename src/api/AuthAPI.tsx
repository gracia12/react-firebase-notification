import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  updateProfile
} from "firebase/auth";
import { auth } from "../firebaseConfig";

export const LoginAPI = (email: string, password: string): Promise<any> => {
  try {
    const response: Promise<any> = signInWithEmailAndPassword(auth, email, password);
    return response;
  } catch (err) {
    return err;
  }
};

export const RegisterAPI = async (email: string, password: string, displayName: string): Promise<any> => {
  try {
    const userCredential: any = await createUserWithEmailAndPassword(auth, email, password);

    if (userCredential && auth.currentUser) {
      updateProfile(auth.currentUser, {
          displayName: displayName
      });
    }

    return userCredential;
  } catch (err) {
    return err;
  }
};

export const GoogleSignInAPI = (): Promise<any> => {
  try {
    const googleProvider: GoogleAuthProvider = new GoogleAuthProvider();
    const res: Promise<any> = signInWithPopup(auth, googleProvider);
    return res;
  } catch (err) {
    return err;
  }
};

export const onLogout = (): void => {
  try {
    signOut(auth);
  } catch (err) {
    return err;
  }
};
