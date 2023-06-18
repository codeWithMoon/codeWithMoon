import { Tabs } from "expo-router";
import { FontAwesome5 } from '@expo/vector-icons';

export default function () {
    return <Tabs>
        <Tabs.Screen name="student" options={{ tabBarIcon: ({ color }) => <FontAwesome5 name="user-alt" size={24} color={color} />, title: "Student Profile" }} />
        <Tabs.Screen name="scanCode" options={{ tabBarIcon: ({ color }) => <FontAwesome5 name="qrcode" size={24} color={color} />, title: "Scan" }} />
    </Tabs>
}