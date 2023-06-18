import { Stack } from "expo-router";

export default function () {
    return <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ title: "Login" }} />
        <Stack.Screen name="teachers" options={{ headerShown: false }} />
        <Stack.Screen name="students" options={{ headerShown: false }} />
        <Stack.Screen name="[QrModel]" options={{ presentation: "modal", title: "Qr Code" }} />
        <Stack.Screen name="AddClass" options={{ presentation: "modal", title: "Create A Class" }} />
        <Stack.Screen name="classDetails" options={{ presentation: "modal", title: "Class Details" }} />
    </Stack>
}