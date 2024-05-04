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
  Timestamp,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
import { getUser, getUserWithEmail } from "./Auth";

const colChat = collection(db, "chats");

onSnapshot(colChat, (snapshot) => {
  let chats = [];
  snapshot.docs.forEach((chat) => {
    chats.push({ ...chat.data(), id: chat.id });
  });
  console.log("chats ", chats);
});

async function getDocsToDos() {
  const snapshot = await getDocs(colChat);
  return snapshot.docs;
}

async function addChat(u1, email) {
  const user = await getUserWithEmail(email);
  console.log("dddddddd", u1);
  let res = await addDoc(colChat, {
    user1: u1,
    user2: user,
  });
  return res;
}

async function getChat(id) {
  const d = doc(colChat, id);
  const docSnap = await getDoc(d);
  console.log("chatchat", { ...docSnap.data(), id: docSnap.id });

  return { ...docSnap.data(), id: docSnap.id };
}

async function getChatsForUser() {
  const uid = auth.currentUser.uid;
  const q1 = query(colChat, where("user1.uid", "==", uid));
  const q2 = query(colChat, where("user2.uid", "==", uid));
  const chatOfUser = [...(await getDocs(q1)).docs, ...(await getDocs(q2)).docs];
  const ch = [];
  chatOfUser.forEach((chat) => {
    if (chat.data().user1.uid == uid) {
      ch.push({
        my: chat.data().user1,
        friend: chat.data().user2,
        id: chat.id,
      });
    } else {
      ch.push({
        my: chat.data().user2,
        friend: chat.data().user1,
        id: chat.id,
      });
    }
  });
  console.log("chatOfUser", ch);
  return ch;
}
// async function get(chatOfUser, uid) {
//   const chats = [];
//   chatOfUser.forEach(async (chat) => {
//     let t;
//     if (chat.data().uid1 == uid) {
//       t = await getUser(chat.data().uid2);
//       chats.push({
//         id: chat.id,
//         myId: chat.data().uid1,
//         friend: [{ id: t.uid, name: t.name }],
//       });
//     } else {
//       t = await getUser(chat.data().uid1);
//       chats.push({
//         id: chat.id,
//         myId: chat.data().uid2,
//         friend: [{ id: t.uid, name: t.name }],
//       });
//     }
//   });
//   console.log("chats for user is", chats);
//   return chats;
// }

async function delChat(id) {
  const docRef = doc(colChat, id);
  await deleteDoc(docRef);
}

async function updateChat(id, todo) {
  const docRef = doc(colChat, id);
  await updateDoc(docRef, todo);
}

async function addMessage(idChat, id, m) {
  const coll = collection(db, `chats/ ${idChat}/ messages`);
  let res = await addDoc(coll, {
    uid: id,
    message: m,
    time: serverTimestamp(),
  });
  return res;
}

async function getMessages(idChat) {
  const coll = collection(db, `chats/ ${idChat}/ messages`);
  const q = query(coll, orderBy("time"));
  const docSnap = (await getDocs(q)).docs;
  const All = [];
  docSnap.forEach((m) => {
    All.push({ ...m.data(), id: m.id });
  });
  // console.log("All", All);
  return All;
}
async function delMessage(id, idm) {
  const coll = collection(db, `chats/ ${id}/ messages`);
  const docRef = doc(coll, idm);
  await deleteDoc(docRef);
}

async function updateMessage(id, item) {
  console.log(id , item)
  const coll = collection(db, `chats/ ${id}/ messages`);
  const docRef = doc(coll, item.id);
  await updateDoc(docRef, item);
}
// updateMessage()
// function subscribe(id) {
//   const unsubscribe = onSnapshot(
//     collection(db, `chats/ ${id}/ messages`),
//     (snapshot) => {
//       const source = snapshot.metadata.hasPendingWrites ? "Local" : "Server";
//       // snapshot.docChanges().forEach((change) => {
//       //   console.log("changes", change, snapshot.metadata);
//       // });
//       // snapshot.docs.forEach((snap) => {
//       //   console.log("dataa", snap.data());
//       // });
//       const All = [];
//       snapshot.docs.forEach((m) => {
//         All.push({ ...m.data(), id: m.id });
//       });
//       console.log("All", All);
//       return All;
//     }
//   );
//   return unsubscribe;
// }
export {
  addChat,
  getChatsForUser,
  delChat,
  updateChat,
  getChat,
  addMessage,
  getMessages,
  delMessage,
  updateMessage,
  // subscribe,
};
