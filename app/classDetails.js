import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

export default function ClassDetails() {
    const { id, classSubject } = useLocalSearchParams();

    const [classStudents, setClassStudens] = useState([]);
    console.log(classStudents);

    useEffect(() => {
        fetch(`https://data.mongodb-api.com/app/application-0-tcqor/endpoint/get_class_details?classId=${id}`).then(res => res.json()).then(json => {
            let studentArr = json.students;
            studentArr.map(student => {
                fetch(`https://data.mongodb-api.com/app/application-0-tcqor/endpoint/attendanced_students?userId=${student}`).then(res => res.json()).then(json => setClassStudens(item => [...item, json])).catch(err => console.log(err));
            })
        }).catch(err => console.log(err));
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Class: {classSubject}</Text>
            <FlatList data={classStudents} keyExtractor={item => item._id} renderItem={({ item }) => <View style={styles.account}>
                <Image style={styles.accountImage} source={{ uri: 'https://www.bootdey.com/img/Content/avatar/avatar6.png' }} />
                <View style={styles.accountContent}>
                    <Text style={styles.accountName}>{item.name}</Text>
                    <Text style={styles.accountBalance}>{item.subject}</Text>
                    <Text style={styles.accountBalance}>Marked his Attendance</Text>
                </View>
            </View>} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start",
        marginTop: 60,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        alignSelf: "center"
    },
    account: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    accountImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 20,
    },
    accountContent: {
        justifyContent: 'center',
    },
    accountName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    accountBalance: {
        fontSize: 16,
        color: '#999',
    },
});

/**fetch(`https://data.mongodb-api.com/app/application-0-tcqor/endpoint/class_students?subject=${classSubject}`).then(res => res.json()).then(json => setClassStudens(json)).catch(err => console.log(err)); */