import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from "react-native";
import {getUserAccountDetails} from "../services/auth/authService";
import {useRoute} from "@react-navigation/native";
import {useSelector} from "react-redux";
import * as Clipboard from 'expo-clipboard';
import {colors} from "../assets/colors";

const AddCash = () => {

    const [bank, setBank] = useState("");
    const [accountName, setAccountName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");

    const route = useRoute()

    const { username } = useSelector(state => state.auth)

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(accountNumber);

        alert("Account number copied successfully");
    };

    useEffect(() => {
        getUserAccountDetails(username)
            .then(res => {
                console.log("Account details from Add Cash: ", res)
                setAccountNumber(res?.account_number)
                setAccountName(res?.account_name)
                setBank(res?.bank?.name)
            })
    },[])

    return (
        <View style={styles.container}>
            <Image  source={require("../assets/logo.png")} style={styles.logo} />
            <View style={styles.accountContainer}>
                <Text style={styles.instructionText}>To fund your account, do a transfer to:</Text>
                <Text style={styles.accountText}>
                    Bank: {bank}
                </Text>
                <Text style={styles.accountText}>
                    Account Number: {accountNumber}
                </Text>
                <Text style={styles.accountText}>
                    Account Name: {accountName}
                </Text>
            </View>

            <TouchableOpacity onPress={copyToClipboard} style={{width: "70%",
                alignSelf: 'center', height: 55, backgroundColor: colors.PRIMARY,
                marginTop: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 10}}>
                <Text style={{color: 'white', fontWeight: '700'}}>Copy Account Number</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddCash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
    },
    accountContainer: {
        width: "80%",
        height: 350,
        backgroundColor: colors.PRIMARY,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    logo: {
        width: 180,
        height: 150,
        marginBottom: 30,
    },
    accountText: {
       color: 'white',
       fontSize: 16,
       textAlign: 'center',
        marginBottom: 10,
    },
    instructionText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 30,
    }
})
