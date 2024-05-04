import { useState } from "react";
import { auth, db } from "./Config";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  onSnapshot,
  deleteDoc,
  doc,
  query,
  where,
  getDoc,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  signInWithCredential,
  verifyPasswordResetCode,
  EmailAuthProvider,
  signOut,
  deleteUser,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

onAuthStateChanged(auth, (user) => {
  if (user != null) {
    getUser(user.uid)
      .then((us) => AsyncStorage.setItem("user", JSON.stringify(us)))
      .catch((e) => console.log(e));
  } else {
    AsyncStorage.setItem("user", "");
  }
});

async function register(email, password) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  return cred;
}

async function resetEmail(email) {
  const cred = await sendPasswordResetEmail(auth, email);
  return cred;
}

async function login(email, password) {
  await signInWithEmailAndPassword(auth, email, password);
}

async function logout() {
  await signOut(auth);
}

const colUser = collection(db, "users");

onSnapshot(colUser, (snapshot) => {
  let user = [];
  snapshot.docs.forEach((use) => {
    user.push({ ...use.data(), id: use.id });
  });
  console.log("Users ", user);
});

async function getDocsUser() {
  const snapshot = await getDocs(colUser);
  return snapshot.docs;
}

async function addUser(mail, uname) {
  let res = await addDoc(colUser, {
    uid: auth.currentUser.uid,
    name: uname,
    email: mail,
  });
  return res;
}

async function DelUser(user) {
  const docRef = doc(colUser, user.id);
  // await deleteDoc(docRef);
  await deleteUser(auth.currentUser);
}

async function getUsers() {
  let User = await getDocsUser();
  let users = [];
  User.forEach((user) => {
    users.push({ ...user.data(), id: user.id });
  });
  return users;
}
async function getUser(uid) {
  const user = (await getDocs(query(colUser, where("uid", "==", uid)))).docs;
  console.log("current User", { ...user[0].data(), id: user[0].id });
  return { ...user[0].data(), id: user[0].id };
}
async function getUserWithEmail(email) {
  const user = (await getDocs(query(colUser, where("email", "==", email))))
    .docs;
  console.log("current User", { ...user[0].data(), id: user[0].id });
  return { ...user[0].data(), id: user[0].id };
}

export {
  register,
  login,
  resetEmail,
  getUser,
  logout,
  addUser,
  DelUser,
  getUserWithEmail,
};
