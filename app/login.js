import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const router = useRouter();

  const { control, handleSubmit, formState: { errors } } = useForm({ defaultValues: { userName: "", password: "" } });

  const userLogIn = async (data) => {
    console.log(data);
    try {
      const res = await fetch(`https://data.mongodb-api.com/app/application-0-tcqor/endpoint/get_user?name=${data.userName}&password=${data.password}`, {
        method: 'POST', headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      });
      const json = await res.json();
      if (json.statusAs === "student") {
        console.log(json);
        try {
          const newValue = JSON.stringify(json);
          await AsyncStorage.setItem("agent", newValue);
        } catch (error) {
          console.log(error);
        }
        router.replace("/students/student");
      } else if (json.statusAs === "teacher") {
        console.log(json);
        try {
          const newValue = JSON.stringify(json);
          await AsyncStorage.setItem("agent", newValue);
        } catch (error) {
          console.log(error);
        }
        router.replace("/teachers/teacher");
      } else {
        console.log(json);
        alert("Please enter correct username");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <ScrollView contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}>
      <Controller control={control} name="userName" rules={{ required: "Name is Requied", minLength: { value: 3, message: "Must be 3 Character Long" }, maxLength: { value: 32, message: "Should not be longer the 34 Charater" } }} render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => <View><TextInput style={[styles.input, { borderColor: error ? "red" : "#000" }]} value={value} onChangeText={onChange} onBlur={onBlur} placeholder='Enter Name' />{error && <Text style={styles.errorStyle} >{error.message}</Text>}</View>} />
      <Controller control={control} name="password" rules={{ required: "Password is Must", minLength: { value: 5, message: "Password must be 5 Characters Long" } }} render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => <View><TextInput style={[styles.input, { borderColor: error ? "red" : "#000" }]} value={value} onChangeText={onChange} onBlur={onBlur} placeholder='Enter Password' secureTextEntry={true} />{error && <Text style={styles.errorStyle} >{error.message}</Text>}</View>} />
      <View style={styles.buttonStyle} >
        <Button title="Login" onPress={handleSubmit(userLogIn)} color="yellowgreen" />
      </View>
      <View style={styles.buttonStyle}>
        <Button title="Cancle" onPress={() => router.back()} color="yellowgreen" />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
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
  buttonStyle: {
    margin: 5
  }
})