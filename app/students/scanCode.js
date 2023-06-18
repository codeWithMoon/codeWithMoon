import { View, Text, StyleSheet, Button, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ScanCode() {
  const router = useRouter();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [agent, setAgent] = useState({});

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

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

  const handleScanned = async ({ type, data }) => {
    setScanned(true);
    //getAttendance(data);
    try {
      const res = await fetch(`https://data.mongodb-api.com/app/application-0-tcqor/endpoint/attendance?classId=${data._id}&studentId=${agent._id}`);
      const json = await res.json();
      Alert.alert(json.msg);
    } catch (error) {
      console.log(error);
    } finally {
      router.push('/students/student');
    }
  };

  //const getAttendance = async (newData)=>{  }

  if (hasPermission === null) {
    return <Text>Request for Camera Permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleScanned} style={StyleSheet.absoluteFillObject} />
      {scanned && <Button title='Tap to Scan Again' onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center'
  }
});

//alert(`Bar code with type ${type} and data ${data} has been scanned`);