import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import {openDatabase} from "../helperFunctions/SqliteFunctions";
import DateTimePicker from '@react-native-community/datetimepicker';

const types = [
    {
        key: 1,
        label: "Income",
        value: "income"
    },
    {
        key: 1,
        label: "Expenses",
        value: "expenses"
    },
]

const NewTransaction = () => {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("")
    const [transactionDate, setTransactionDate] = useState(new Date())
    const [showTypePicker, setShowTypePicker] = useState(false)
    const [showDatePicker, setShowDatePicker] = useState(false)

    const db = openDatabase();

    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
                "create table if not exists items (id integer primary key not null, name text, value int, type text, transactionDate date);"
            );
        });
    }, []);

    const setDate = (event, selectedDate) => {
        const {
            type,
            nativeEvent: {timestamp},
        } = event;

        setTransactionDate(selectedDate)
        setShowDatePicker(false)
    };

    const addTransaction = () => {
        console.log({name, amount, type})
        if (name === "" || amount === "" || type === ""){
            alert("Please provide all inputs to add a transaction")
            return;
        }

        let updatedAmount = amount

        if (type === "expenses") updatedAmount = -1 * amount

        db.transaction(
            (tx) => {
                tx.executeSql("insert into items (name, value, type, transactionDate) values (?,?,?,?)", [name, updatedAmount, type, transactionDate?.toString()]);
                tx.executeSql("select * from items", [], (_, { rows }) =>{
                    console.log(JSON.stringify(rows))
                    alert("Transaction Added Successfully")
                    setName("")
                    setAmount("")
                    setType("")
                }
                );
            },
            (err) =>console.log({err}),
            // forceUpdate
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>New Transaction</Text>
            <View style={styles.formGroup}>
                <Text>Item Name</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={text=>setName(text)}
                    value={name}
                />
            </View>
            <View style={styles.formGroup}>
                <Text>Amount</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={text=>setAmount(text)}
                    value={amount}
                    keyboardType="numeric"
                />
            </View>
            <View style={styles.formGroup}>
                <Text>Date</Text>
                <TouchableOpacity
                    style={[styles.textInput,{justifyContent: "center"}]}
                    onPress={() => setShowDatePicker(true)}
                >
                    <Text>{transactionDate?.toDateString()}</Text>
                    { showDatePicker && <DateTimePicker
                        testID="dateTimePicker"
                        value={transactionDate}
                        onChange={setDate}
                    />}
                </TouchableOpacity>
            </View>
            <View style={styles.formGroup}>
                <Text>Type</Text>
                <DropDownPicker
                    schema={{
                        label: 'label',
                        value: 'value',
                        icon: 'icon',
                        parent: 'parent',
                        selectable: 'selectable',
                        disabled: 'disabled',
                    }}
                    listMode="MODAL"
                    placeholder="Select a type"
                    searchable={true}
                    placeholderStyle={{ color: 'black' }}
                    labelStyle={{ color: 'black' }}
                    modalTitle={'Reports filter'}
                    open={showTypePicker}
                    value={type}
                    // value={currentGender}
                    mode={'BADGE'}
                    theme={'DARK'}
                    items={types}
                    setOpen={() => {
                        setShowTypePicker(true);
                    }}
                    onClose={() => {
                        setShowTypePicker(false);
                    }}
                    // @ts-ignore
                    setValue={async (val: Function) => {
                        const cc = val();
                        setType(cc);
                    }}
                    style={{ backgroundColor: 'transparent', borderColor: 'transparent', width: "70%",marginLeft:50 }}
                />
            </View>
            <TouchableOpacity onPress={() => addTransaction()} style={styles.button}>
                <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 50,
        width: "100%",
    },
    textInput: {
        width: "70%",
        borderRadius: 10,
        height: 45,
        backgroundColor:'#e0e0e0',
        marginTop: 20,
        paddingHorizontal: 15,
    },
    formGroup: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    button: {
        width: "80%",
        alignSelf: "center",
        backgroundColor: "black",
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        marginTop: 50,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: 600,
    },
    heading: {
        fontSize: 20,
        fontWeight: 600,
        marginBottom: 20,
        marginTop: 20,
    }
})

export default NewTransaction;
