import { initializeApp } from "firebase/app";
import * as firebaseAuth from "firebase/auth";

import { getFirestore } from "firebase/firestore";

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;

const app = initializeApp(firebaseConfig);
export const getApp = firebaseAuth.initializeAuth(app, {
  persistence: reactNativePersistence(ReactNativeAsyncStorage),
});

export const dataBaseApp = getFirestore(app);
