import { Link, router } from "expo-router";
import {
  TextInput,
  Button,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import { useEffect, useState } from "react";
import { addUser,  register } from "../../firebase/Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  const handlePress = async () => {
    try {
      const yy = await register(email, password);
      addUser(email, name);
      router.replace(`/Chats/`);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (error == "Firebase: Error (auth/invalid-email).") {
      setError("invalid email");
    }
    if (error == "Firebase: Error (auth/missing-email).") {
      setError("Enter the email");
    } else if (error == "Firebase: Error (auth/invalid-credential).") {
      setError("invalid password");
    } else if (error == "Firebase: Error (auth/missing-password).") {
      setError("Enter the password");
    }
  }, [error]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <View>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <Pressable onPress={handlePress}>
          <Text style={styles.login}>Sign up</Text>
        </Pressable>{" "}
        <Pressable onPress={() => router.replace("/auth/login")}>
          <Text style={styles.forgotpassword}>You have an account</Text>
        </Pressable>
        <Pressable onPress={() => router.replace("/auth/reset")}>
          <Text style={styles.forgotpassword}>forgot password</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#111",
    gap: 30,
    paddingBottom: 100,
  },
  title: {
    fontSize: 44,
    color: "#fff",
  },
  forgotpassword: {
    alignSelf: "center",
    color: "#fff",
    marginTop: 10,
    textDecorationLine: "underline",
  },
  login: {
    backgroundColor: "#555",
    alignSelf: "center",
    paddingHorizontal: 25,
    borderRadius: 10,
    paddingVertical: 10,
    color: "#fff",
    marginTop: 20,
  },
  error: {
    fontSize: 20,
    color: "rgb(200,50,50)",
  },
  input: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#333",
    color: "#fff",
  },
});
