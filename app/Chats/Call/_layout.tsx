import {  Stack, Tabs, useLocalSearchParams } from "expo-router";
import {  router } from "expo-router";
import {  Pressable, Text } from "react-native";
import { getUser, logout } from "../../../firebase/Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {  useEffect, useState } from "react";
import { auth } from "../../../firebase/Config";
import { onAuthStateChanged } from "firebase/auth";
export default function Layout() {
  const [user, setUser] = useState({ name: "name", uid: "" });
  const { myId, FrId } = useLocalSearchParams();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#333" },
      }}
    >
    </Stack>
  );
}
