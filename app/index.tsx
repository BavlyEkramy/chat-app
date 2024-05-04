import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, router, Redirect } from "expo-router";
import { useEffect } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";

export default function Page() {

  useEffect(() => {
    userName()
},[])
    const userName = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        if(user){
          router.replace("/Chats/");
        }
      } catch (e) {
        console.log(e);
      }
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Get Started !</Text>
      <Pressable
        onPress={() => router.push("/auth/reg")}
        style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
      >
        <Text style={styles.link}> Create new Account , sign Up</Text>
      </Pressable>
      <Pressable
        onPress={() => router.push("/auth/login")}
        style={({ pressed }) => [{ opacity: pressed ? 0.2 : 1 }]}
      >
        <Text style={styles.link}>I have Account , sign in</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#111",
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#fff",
  },
  link: {
    fontSize: 22,
    backgroundColor: "#333",
    color: "#fff",
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
  },
});
