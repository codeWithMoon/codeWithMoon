import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Linking, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Teacher() {

  const route = useRouter();

  const [agent, setAgent] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const value = await AsyncStorage.getItem('agent');
        if (value !== null) {

          setAgent(JSON.parse(value));
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const logout = async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.log(error);
    }
    route.push("/");
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}></View>
      <Image
        style={styles.avatar}
        source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }}
      />
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.name}>Name: {agent.name}</Text>
          <Text style={styles.info}>Subject: <FlatList style={{ flexDirection: "row" }} data={agent.subject} renderItem={({ item }) => <Text>{item}</Text>} keyExtractor={item => item.subject} /></Text>
          <Text style={styles.description}>Status: {agent.statusAs}</Text>
        </View>
        <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }} >
          <TouchableOpacity style={styles.linkContainer} onPress={() => Linking.openURL('https://docs.google.com/spreadsheets/d/182309nUHd37XNhVQr8JnH0Blb5DDTxi0RaANzU3CL6w/edit#gid=0')} >
            <Text style={styles.buttonText} >Check your Schedule</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkContainer} onPress={() => logout()} >
            <Text style={styles.buttonText} >Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'yellowgreen',
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130,
  },
  name: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 2,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: '600',
  },
  info: {
    fontSize: 16,
    color: '#00BFFF',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#696969',
    marginTop: 10,
    textAlign: 'center',
  },
  customButtonContainer: {
    backgroundColor: "yellowgreen",
    borderRadius: 30,
    width: 250,
    height: 45,
    textAlign: "center",
    marginVertical: 5,
    paddingVertical: 10
  },
  buttonText: {
    alignSelf:"center",
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
  item: {
    backgroundColor: '#f9c2ff',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  }
});