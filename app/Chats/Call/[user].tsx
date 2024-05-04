import { Stack, router, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextInputBase,
  View,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  addMessage,
  delMessage,
  getMessages,
  updateChat,
  updateMessage,
} from "../../../firebase/Chat";
import { auth, db } from "../../../firebase/Config";
import { FontAwesome, Feather, MaterialIcons } from "@expo/vector-icons";
import { collection, onSnapshot } from "firebase/firestore";

export default function Page() {
  const { id, name, myId, frId, index } = useLocalSearchParams();
  const [Messages, setMessages] = useState([]);
  const [value, setValue] = useState("Messaging");
  const [flag, setFlag] = useState(true);
  const [mid, setMid] = useState("");
  const first = useRef(null);
  const f = useRef(null);

  useEffect(() => {
    onSnapshot(collection(db, `chats/ ${id}/ messages`), (snapshot) => {
      init();
    });
    setTimeout(() => {
      first.current.scrollBy(0, 84651302789987);
    }, 800);
  }, []);

  const init = async () => {
    try {
      const y = await getMessages(id);
      setMessages(y);
    } catch (e) {
      console.log(e);
    }
  };
  const addM = async (text) => {
    try {
      setFlag(true);
      setValue("");
      if (text && text.trim() != "") {
        await addMessage(id, myId, text);
      } else alert("Enter your message");
      first.current.scrollBy(0, 789987);
    } catch (e) {
      console.log(e);
    }
  };
  const delM = async (mid) => {
    try {
      await delMessage(id, mid);
    } catch (e) {
      console.log(e);
    }
  };
  const updateM = async (id, item) => {
    try {
      const text = prompt("Enter your updated");
      if (text && text.trim() != "") {
        item = { ...item, message: text };
        await updateMessage(id, item);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#111" }}>
      <Stack.Screen
        options={{
          presentation: "modal",
          headerTitle: `${name}`,
          headerTitleAlign: "center",
          headerTintColor: "#fff",
        }}
      />
      <ScrollView style={styles.container} ref={first}>
        <FlatList
          data={Messages}
          renderItem={({ item }) => (
            <View
              style={[
                styles.btn,
                {
                  justifyContent: item.uid == myId ? "flex-start" : "flex-end",
                },
              ]}
            >
              <Text
                onPress={() => setMid(item.id)}
                style={{
                  fontSize: 15,
                  fontWeight: "500",
                  color: "white",
                  borderRadius: 10,
                  backgroundColor:
                    item.uid == myId
                      ? `rgb(112,150,181)`
                      : `rgb(${(13 * index * 7) % 200},${
                          (23 * index * 4) % 200
                        },${(57 * index * 2) % 200})`,
                  padding: 10,
                  maxWidth: "70%",
                }}
              >
                {item.message}
              </Text>
              {item.uid == myId && item.id == mid ? (
                <View>
                  <Pressable
                    onPress={() => updateM(id, item)}
                    style={styles.pressBtn1}
                  >
                    <Feather name="edit" style={styles.textBtn1} />
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      delM(item.id);
                    }}
                    style={styles.pressBtn1}
                  >
                    <MaterialIcons name="delete" style={styles.textBtn1} />
                  </Pressable>
                </View>
              ) : (
                ""
              )}
            </View>
          )}
        />
      </ScrollView>

      <View style={styles.inputWithBtn}>
        <Pressable
          onPress={() => {
            addM(value);
            setValue("");
          }}
          style={styles.pressBtn}
        >
          {/* <Text style={styles.textBtn}>Send</Text> */}
          <FontAwesome style={styles.textBtn} name="send" size={24} />
        </Pressable>
        <TextInput
          onChangeText={setValue}
          onKeyPress={(e) => {
            if (e.key == "Enter") addM(value);
          }}
          onFocus={() => {
            if (flag) {
              setValue("");
              setFlag(false);
            }
          }}
          value={value}
          style={styles.input}
        />
      </View>
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    padding: 10,
  },
  btn: {
    borderRadius: 10,
    minHeight: 40,
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginVertical: 10,
  },
  inputWithBtn: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#111",
    padding: 10,
    width: "100%",
  },
  input: {
    height: 40,
    width: "88%",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  pressBtn: {
    width: 40,
  },
  textBtn: {
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 36,
    backgroundColor: "rgb(20,180,180)",
    color: "#fff",
    borderRadius: 20,
    paddingHorizontal: 10,
    height: 40,
    width: "100%",
  },
  pressBtn1: {
    width: 28,
    marginBottom: 6,
  },
  textBtn1: {
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 28,
    backgroundColor: "rgb(20,180,180)",
    color: "#fff",
    borderRadius: 20,
    paddingHorizontal: 6,
    height: 28,
    width: "100%",
  },
});
