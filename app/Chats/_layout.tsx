import { Stack, Tabs, useLocalSearchParams } from "expo-router";
import { Link, router } from "expo-router";
import { Alert, Button, Pressable, StyleSheet, Text, View } from "react-native";
import { getUser, logout } from "../../firebase/Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase/Config";
import { collection, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Header } from "react-native/Libraries/NewAppScreen";
export default function Layout() {
  const [user, setUser] = useState({ name: "name", uid: "" });
  const { myId, FrId } = useLocalSearchParams();

  const lout = async () => {
    try {
      await logout();
      alert("your signed out");
    } catch (err) {
      console.log(err.message);
    }
  };
  onAuthStateChanged(auth, (use) => {
    const y = setTimeout(userName, 1500);
    return () => clearTimeout(y);
  });
  const userName = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      setUser(JSON.parse(user));

      // const user = await getUser(auth.currentUser.uid);
      // setUser(user);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#333" },
        headerTintColor:"#fff"
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: user.name,
          headerRight: () => (
            <Pressable
              style={{
                backgroundColor: "#333",
                paddingHorizontal: 10,
                paddingVertical: 10,
                marginRight: 15,
                borderRadius: 10,
              }}
              onPress={() => {
                router.push("/auth/login");
                lout();
              }}
            >
              <Text style={{ color: "#fff" }}>Sign UP</Text>
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="Call"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
