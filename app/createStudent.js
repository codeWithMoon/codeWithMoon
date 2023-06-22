import { View, Text, ScrollView, StyleSheet, TextInput, Button, TouchableOpacity, StatusBar } from 'react-native'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

export default function CreateStudent() {

    const router = useRouter();

    const data = [
        { label: 'DataBase', value: 'DataBase' },
        { label: 'Java', value: 'Java' },
        { label: 'Physics', value: 'Physics' },
        { label: 'AI', value: 'AI' },
        { label: 'Algebra', value: 'Algebra' },
        { label: 'DLD', value: 'DLD' },
        { label: 'Discrete Structure', value: 'Discrete Structure' },
        { label: 'Automata', value: 'Automata' },
    ];

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

    const [classGrade, SetClassGrade] = useState("");
    const [selected, setSelected] = useState([]); //subject for class
    const [isFocus, setIsFocus] = useState(false);
    const { control, handleSubmit, formState: { errors } } = useForm({ defaultValues: { studentName: "", password: "12345", statusAs: "student" } });

    const addStudent = (data) => {
        data.classGrade = classGrade;
        data.classSubject = selected;
        console.log("new data: ", data);
        fetch(`https://data.mongodb-api.com/app/application-0-tcqor/endpoint/add_student`, {
            method: 'POST', headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(res => res.json()).then(json => alert(json.msg)).catch(err => console.log(err)).then(() => router.back());
    }

    return (
        <ScrollView contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}>
            <Text style={{ fontSize: 18, marginVertical: 10 }}>Register your details here</Text>
            <Controller control={control} name="studentName" rules={{ required: "Student Name is Requied", minLength: { value: 2, message: "Must be 2 Character Long" }, maxLength: { value: 32, message: "Should not be longer the 34 Charater" } }} render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => <View><TextInput style={[styles.dropdown, { borderColor: error ? "red" : "#000" }]} value={value} onChangeText={onChange} onBlur={onBlur} placeholder='Enter Student Name' />{error && <Text style={styles.errorStyle} >{error.message}</Text>}</View>} />
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
            <MultiSelect
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                search
                data={data}
                labelField="label"
                valueField="value"
                placeholder="Select item"
                searchPlaceholder="Search..."
                value={selected}
                onChange={item => {
                    setSelected(item);
                }}
                renderLeftIcon={() => (
                    <AntDesign
                        style={styles.icon}
                        color="black"
                        name="Safety"
                        size={20}
                    />
                )}
                selectedStyle={styles.selectedStyle}
            />
            <View style={styles.ButtonStyle} >
                <Button title='Create' onPress={handleSubmit(addStudent)} color="yellowgreen" />
            </View>
            <View style={styles.ButtonStyle}>
                <Button title='cancle' onPress={() => router.back()} color="yellowgreen" />
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
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
    icon: {
        marginRight: 5,
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    selectedStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        backgroundColor: 'white',
        shadowColor: '#000',
        marginTop: 8,
        marginRight: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    textSelectedStyle: {
        marginRight: 5,
        fontSize: 16,
    },
});

/**
            <Controller control={control} name="classSubject" rules={{ required: "Class is Requied", minLength: { value: 3, message: "Must be 3 Character Long" }, maxLength: { value: 32, message: "Should not be longer the 34 Charater" } }} render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => <View><TextInput style={[styles.dropdown, { borderColor: error ? "red" : "#000" }]} value={value} onChangeText={onChange} onBlur={onBlur} placeholder='Semester' />{error && <Text style={styles.errorStyle} >{error.message}</Text>}</View>} /> */