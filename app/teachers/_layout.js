import { Tabs } from "expo-router";
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

export default function () {
    return <Tabs screenOptions={{ tabBarActiveTintColor: "yellowgreen" }} >
        <Tabs.Screen name="teacher" options={{ tabBarIcon: ({ color }) => <FontAwesome5 name="user-tie" size={24} color={color} />, title: "Teacher" }} />
        <Tabs.Screen name="class" options={{ tabBarIcon: ({ color }) => <MaterialIcons name="class" size={24} color={color} />, title: "Classes", }} />
    </Tabs>
}

/**<Tabs.Screen name="qrCode" options={{ tabBarIcon: ({ color }) => <FontAwesome5 name="qrcode" size={24} color={color} />, title: "Qr Code", headerShown: false }} /> */