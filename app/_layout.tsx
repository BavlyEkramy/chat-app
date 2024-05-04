import { Tabs, Stack } from "expo-router";
import { Link, router } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";
export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
    </Stack>
    //   <>
    //     <Tabs>
    //       <Tabs.Screen
    //         name="index"
    //         options={{
    //           headerTitle: "Home",
    //           headerRight: () => (
    //             <Button
    //               onPress={() => {
    //                 router.push("test");
    //               }}
    //               title="Contact"
    //             />
    //           ),
    //         }}
    //       />
    //       <Tabs.Screen
    //         name="test"
    //         options={{
    //           freezeOnBlur: false,
    //           headerTitle: "teeeee",

    //           headerShown: true,
    //         }}
    //       />
    //       <Stack.Screen
    //         name="lol"
    //         options={{

    //           headerShown: false,
    //         }}
    //       />
    //     </Tabs>
    //   </>
  );
}

{
  /* //   <Stack>
   //     <Stack.Screen
   //       name="index"
   //       options={{
   //         headerTitle: "Home",
   //         headerRight: () => (
   //           <Button
   //             onPress={() => {
   //               router.push("contact");
   //             }}
   //             title="Contact"
   //           />
   //         ),
   //       }}
   //     />
   //     <Stack.Screen
   //       name="about"
   //       options={{
   //         headerTitle: "Home",
   //         headerRight: () => (
   //           <Button
   //             onPress={() => {
   //               router.push("contact");
   //             }}
   //             title="Contact"
   //           />
   //         ),
   //       }}
   //     />
   //   </Stack> */
}
