import { View, Text, ScrollView, StyleSheet, Button, TextInput, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from 'react-native-element-dropdown';

export default function SingUp() {
  const router = useRouter();

  const classGradeData = [
    { label: 'Semester 1', value: '01' },
    { label: 'Semester 2', value: '02' },
    { label: 'Semester 3', value: '03' },
    { label: 'Semester 4', value: '04' },
    { label: 'Semester 5', value: '05' },
    { label: 'Semester 6', value: '06' },
    { label: 'Semester 7', value: '07' },
    { label: 'Semester 8', value: '08' }
  ];

  const classSubjectData = [
    { label: 'DataBase', value: 'DataBase' },
    { label: 'Java', value: 'Java' },
    { label: 'Physics', value: 'Physics' },
    { label: 'AI', value: 'AI' },
    { label: 'Algebra', value: 'Algebra' },
    { label: 'DLD', value: 'DLD' },
    { label: 'Discrete Structure', value: 'Discrete Structure' },
    { label: 'Automata', value: 'Automata' }
  ];
  
  const [agent, setAgent] = useState({});
  const [classGrade, SetClassGrade] = useState("");
  const [classSubject, setClassSubject] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  //console.log(classGrade, classSubject);

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

  const CreateClass = (data) => {
    //alert(`Class:${classGrade} & ${classSubject}`);
    if (classGrade !== "" && classSubject !== "") {
      fetch(`https://data.mongodb-api.com/app/application-0-tcqor/endpoint/create_class?teacherId=${agent._id}&classGrade=${classGrade}&classSubject=${classSubject}`, {
        method: 'POST', headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then(res => res.json()).then(json => alert(json.msg)).catch(err => Alert.alert(err)).then(() => router.back());
    } else {
      Alert.alert("Data not found");
    }
  }

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={classGradeData}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select Class Grade' : '...'}
        searchPlaceholder="Search..."
        value={classGrade}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          SetClassGrade(item.value);
          setIsFocus(false);
        }}
      />
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={classSubjectData}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select Class Subject' : '...'}
        searchPlaceholder="Search..."
        value={classSubject}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setClassSubject(item.value);
          setIsFocus(false);
        }}
      />
      <Button title="Create Class" onPress={() => CreateClass()} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
