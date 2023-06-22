import { Tabs, useRouter } from "expo-router";
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';

export default function () {
    const router = useRouter();
    return <Tabs screenOptions={{ tabBarActiveTintColor: "yellowgreen" }} >
        <Tabs.Screen name="teacher" options={{ tabBarIcon: ({ color }) => <FontAwesome5 name="user-tie" size={24} color={color} />, title: "Teacher" }} />
        <Tabs.Screen name="class" options={{ tabBarIcon: ({ color }) => <MaterialIcons name="class" size={24} color={color} />, title: "Classes", }} />
        <Tabs.Screen name="classStudents" options={{ tabBarIcon: ({ color }) => <MaterialIcons name="groups" size={24} color="black" />, headerRight: () => <Octicons name="person-add" size={24} color="black" onPress={() => router.push("/createStudent")} />, title:"Studetns" }} />
    </Tabs>
}

/**<Tabs.Screen name="qrCode" options={{ tabBarIcon: ({ color }) => <FontAwesome5 name="qrcode" size={24} color={color} />, title: "Qr Code", headerShown: false }} /> */