import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function QrCode() {
  const router = useRouter();
  const { id, classGrade, classSubject } = useLocalSearchParams();
  const [qrValue, setQrValue] = useState("");

  useEffect(() => {
    if (id && classGrade && classSubject) {
      setQrValue(`classId=${id}&classGrade=${classGrade}&classSubject=${classSubject}`)
    } else {
      alert("Something went wrong");
      router.replace("/teachers/classes");
    }
  }, [])

  return (
    <View style={styles.container} >
      <View style={styles.container}> 
        <Text style={styles.subtitle} >Qr Code for Attandance for Semester {classGrade}</Text>
        <QRCode value={qrValue ? qrValue : "NA"} size={290} color='#000' backgroundColor='white' ></QRCode>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto"
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    color: "#38434D",
  }
})