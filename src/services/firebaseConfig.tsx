import { initializeApp } from "firebase/app";
import * as firebaseAuth from "firebase/auth";

import { getFirestore } from "firebase/firestore";

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBb8odXKZB9BlgQDwiQ_Zn8l7YKGWyu-Ys",
  authDomain: "n1-mobile.firebaseapp.com",
  projectId: "n1-mobile",
  storageBucket: "n1-mobile.appspot.com",
  messagingSenderId: "377613745153",
  appId: "1:377613745153:web:55ff2e2fbcd4feb8c91400",
  measurementId: "G-0VT0NYF4EE",
};

const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;

const app = initializeApp(firebaseConfig);
export const getApp = firebaseAuth.initializeAuth(app, {
  persistence: reactNativePersistence(ReactNativeAsyncStorage),
});
export const dataBaseApp = getFirestore(app);
