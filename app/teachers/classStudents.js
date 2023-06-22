import { View, Text, StyleSheet, FlatList, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'

export default function classStudents() {

    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetch(`https://data.mongodb-api.com/app/application-0-tcqor/endpoint/get_all_students`).then(res => res.json()).then(json => setStudents(json)).catch(err => console.log(err));
    }, []);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title} >Students</Text>
            <FlatList data={students} keyExtractor={item => item._id} renderItem={({ item }) => <View style={styles.account}>
                <Image style={styles.accountImage} source={{ uri: 'https://www.bootdey.com/img/Content/avatar/avatar6.png' }} />
                <View style={styles.accountContent}>
                    <Text style={styles.accountName}>{item.name}</Text>
                    <Text style={styles.accountBalance}>{item.subject}</Text>
                </View>
            </View>} />
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
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
})