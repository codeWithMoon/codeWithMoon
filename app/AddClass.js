import { View, Text, ScrollView, StyleSheet, Button, TextInput, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from 'react-native-element-dropdown';
import { AntDesign } from '@expo/vector-icons';

export default function SingUp() {
  const router = useRouter();

  const classGradeData = [
    { label: '9th', value: '09' },
    { label: '10th', value: '10' },
    { label: '11th', value: '11' },
    { label: '12th', value: '12' }
  ];

  const classSubjectData = [
    { label: 'Math', value: 'Math' },
    { label: 'Scince', value: 'Scince' },
    { label: 'Physics', value: 'Physics' },
    { label: 'Islamic Studies', value: 'Islamic Studies' }
  ];
  const [agent, setAgent] = useState({});
  const { control, handleSubmit, formState: { errors } } = useForm({ defaultValues: { classGrade: "", classSubject: "", } });
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


/**<ScrollView contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}>
      <Text style={{ fontSize: 18, marginVertical: 10 }}>Register your details here</Text>
      <Controller control={control} name="classGrade" rules={{ required: "Class Grade is Requied", minLength: { value: 2, message: "Must be 2 Character Long" }, maxLength: { value: 32, message: "Should not be longer the 34 Charater" } }} render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => <View><TextInput style={[style.input, { borderColor: error ? "red" : "#000" }]} value={value} onChangeText={onChange} onBlur={onBlur} placeholder='Class Grade' />{error && <Text style={style.errorStyle} >{error.message}</Text>}</View>} />
      <Controller control={control} name="classSubject" rules={{ required: "Subject for Class is Requied", minLength: { value: 3, message: "Must be 3 Character Long" }, maxLength: { value: 32, message: "Should not be longer the 34 Charater" } }} render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => <View><TextInput style={[style.input, { borderColor: error ? "red" : "#000" }]} value={value} onChangeText={onChange} onBlur={onBlur} placeholder='Subject of Class' />{error && <Text style={style.errorStyle} >{error.message}</Text>}</View>} />
      

      <View style={style.ButtonStyle} >
        <Button title='Create' onPress={handleSubmit(CreateClass)} color="yellowgreen" />
      </View>
      <View style={style.ButtonStyle}>
        <Button title='cancle' onPress={() => router.back()} color="yellowgreen" />
      </View>
    </ScrollView> 
    
    <View style={style.pickerContainer}>
      <Picker ref={pickerRef} style={{ height: 50, width: 200 }} onValueChange={(itemValue, itemIndex) => setInputValue({ classSubject: itemValue })}>
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
    </View>

    container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  errorStyle: {
    color: "red",
    fontSize: 12,
    fontWeight: "bold",
    marginHorizontal: 12
  },
  subButton: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5
  },
  ButtonView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  ButtonStyle: {
    marginVertical: 5,
  },
  pickerContainer: {
    flex: 1,
    width: "auto",
    paddingTop: 40,
    alignItems: "center"
  }
});
    */