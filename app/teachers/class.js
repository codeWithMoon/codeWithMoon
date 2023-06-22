import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Button, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Class() {
  const router = useRouter();

  const [agent, setAgent] = useState({});
  const [classes, setClasses] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const value = await AsyncStorage.getItem('agent');
        if (value !== null) {
          setAgent(JSON.parse(value));
        }
      } catch (error) {
        console.log(error);
      } finally {
        fetch(`https://data.mongodb-api.com/app/application-0-tcqor/endpoint/teacher_classes?teacherId=${agent._id}`).then(res => res.json()).then(json => setClasses(json)).catch(err => console.error(err));
      };
    })();
  }, []);

  const getClass = () => {
    fetch(`https://data.mongodb-api.com/app/application-0-tcqor/endpoint/teacher_classes?teacherId=${agent._id}`).then(res => res.json()).then(json => setClasses(json)).catch(err => console.error(err));
  }

  const deleteClass = (id) => {
    fetch(`https://data.mongodb-api.com/app/application-0-tcqor/endpoint/delete_class?classId=${id}`, {
      method: 'DELETE', headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(res => res.json()).then(json => {
      Alert.alert(json.msg);
      setClasses(classes.filter(item => item._id !== id));
    }).catch(err => console.log(err));
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.buttonBox} >
        <TouchableOpacity style={styles.linkContainer} onPress={() => router.push("/AddClass")} >
          <Text style={styles.buttonText} >Create Class</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkContainer} onPress={() => getClass()} >
          <Text style={styles.buttonText} >See Classes</Text>
        </TouchableOpacity>
      </View>
      <View >
        <FlatList style={styles.root} data={classes} keyExtractor={item => item._id} ItemSeparatorComponent={() => {
          return <View style={styles.separator} />
        }} renderItem={({ item }) => {
          return (
            <View style={styles.content}>
              <View style={styles.contentHeader}>
                <Text style={styles.name}>Semester: {item.classGrade}</Text>
                <Text style={styles.time}>Created Date: {new Date(item.date).toDateString()} at {new Date(item.date).toLocaleTimeString()}</Text>
              </View>
              <View style={{ flex: 1 }} >
                <Text>Subject: {item.classSubject}</Text>
              </View>
              <View style={styles.fixToText} >
                <Button title="delete" onPress={() => deleteClass(item._id)} color="red" />
                <Button title="Qr Code" onPress={() => router.push({ pathname: "/[QrModal]", params: { id: item._id, classGrade: item.classGrade, classSubject: item.classSubject } })} />
                <Button title="Detils" onPress={() => router.push({ pathname: "/classDetails", params: { classGrade: item.classGrade, classSubject: item.classSubject } })} color="yellowgreen" />
              </View>
            </View>
          )
        }} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#ffffff',
    margin: 10,
    width: "auto",
  },
  container: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: 'column'
  },
  content: {
    margin: 16,
    flex: 1
  },
  contentHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 22,
    marginLeft: 20,
  },
  time: {
    fontSize: 11,
    color: '#808080',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  fixToText: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  linkContainer: {
    fontSize: 18,
    backgroundColor: "yellowgreen",
    color: "#fff",
    borderRadius: 30,
    width: 250,
    height: 45,
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 5,
    paddingVertical: 10
  },
  buttonBox: {
    justifyContent: "center",
    alignItems: "center",
  }
});