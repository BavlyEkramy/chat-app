import { Link, Redirect, router } from "expo-router";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { DelUser, getUser } from "../../firebase/Auth";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { auth } from "../../firebase/Config";
import { addChat, delChat, getChatsForUser } from "../../firebase/Chat";
import { AntDesign } from "@expo/vector-icons";

export default function Page() {
  const [chats, setChats] = useState([]);
  const [user, setUser] = useState({});
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      init();
      init2();
    }, 2000);
  }, []);
  const init = async () => {
    try {
      const user = await getUser(auth.currentUser.uid);
      setUser(user);
    } catch (e) {
      console.error(e.message);
    }
  };
  const init2 = async () => {
    try {
      getChatsForUser().then((e) => {
        setChats(e);
        console.log("chatssssssss", e);
      });
    } catch (e) {
      console.error(e.message);
    }
  };
  const AddChat = async () => {
    const email = prompt(
      "Please enter your email for your friend to chat with you."
    );
    try {
      if (email) {
        await addChat(user, email);
      }
    } catch (e) {
      if (e.message == "Cannot read properties of undefined (reading 'data')")
        alert("Invalid email. Please verify the recipient's email address.");
    }
  };

  return (
    <View
      style={{
        height: "100%",
        backgroundColor: "#111",
        padding: 10,
      }}
    >
      <Text style={styles.title}>Chats</Text>
      <ActivityIndicator
        size="small"
        color="#fff"
        animating={chats.length === 0}
      />
      <View style={styles.container}>
        <FlatList
          data={chats}
          renderItem={({ item, index }) => (
            <Pressable
              style={styles.btn}
              onPress={() => {
                router.navigate({
                  pathname: "/Chats/Call/[user]",
                  params: {
                    myId: item.my.uid,
                    frId: item.friend.uid,
                    id: item.id,
                    name: item.friend.name,
                    index: 1,
                  },
                });
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  color: "white",
                  paddingLeft: 10,
                }}
              >
                {item.friend.name}
              </Text>
            </Pressable>
          )}
        />
      </View>
      <View style={styles.inputWithBtn}>
        <Pressable onPress={AddChat} style={styles.pressBtn}>
          <AntDesign style={styles.textBtn} name="plus" />
        </Pressable>
      </View>
      <StatusBar style="dark" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-end",
    padding: 10,
    backgroundColor: "#111",
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#fff",
    margin: "auto",
  },
  btn: {
    borderRadius: 10,
    minWidth: 100,
    minHeight: 40,
    backgroundColor: "#333",
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    marginVertical: 10,
    paddingRight: 15,
  },
  inputWithBtn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#111",
    padding: 10,
  },
  pressBtn: {
    width: 50,
  },
  textBtn: {
    fontSize: 35,
    lineHeight: 50,
    backgroundColor: "rgb(20,180,180)",
    color: "#fff",
    borderRadius: 25,
    paddingHorizontal: 8,
    height: 50,
    width: "100%",
  },
});
