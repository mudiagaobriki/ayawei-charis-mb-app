import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, ImageBackground} from "react-native";
import {useSelector} from "react-redux";
import {selectUserName} from "../redux/features/auth/authSlice";
import {getUserAccountDetails, getUserBalance, getUserTransactions} from "../services/auth/authService";
import {useIsFocused} from "@react-navigation/native";
import {colors} from "../assets/colors";


const BalanceCard = ({balance, accountNumber, width="80%"}) => {

    const focused = useIsFocused()

    // const [accountNumber, setAccountNumber] = useState("")
    // const [balance, setBalance] = useState("")
    const [fetching, setFetching] = useState(true)

    // const {profileData} = useSelector(state => state.user)
    // const {username} = useSelector(state => state.auth)

    // const {firstName, lastName, email} = profileData


    // useEffect(() => {
    //     getUserAccountDetails(username)
    //         .then(res => {
    //             //console.log("Account details: ", res)
    //             setAccountNumber(res?.account_number)
    //         })
    // },[])

    // useEffect(() => {
    //     getUserBalance(username, accountNumber)
    //         .then(res => {
    //             //console.log("User Balance: ", res)
    //             setBalance((res/100).toFixed(2))
    //             setFetching(false)
    //             // setAccountNumber(res?.account_number)
    //         })
    // },[accountNumber, focused])

    return (
        <View style={[styles.card,{width: width}]}>
            <ImageBackground source={require("../assets/balanceCardBg.png")} style={styles.imgBackground}>
                <View style={styles.incomeExpensesContainer}>
                    <View>
                        <Text style={styles.labelText}>Balance</Text>
                        <Text style={[styles.incomeExpensesText,{fontSize: 24, marginTop: 3, marginBottom: 22, fontWeight: 400}]}>₦{balance < 0? "": balance?.toLocaleString()}</Text>
                    </View>
                    <View>
                        <Text style={styles.labelText}>Account Number</Text>
                        <Text style={[styles.incomeExpensesText,{fontSize: 16}]}>{accountNumber}</Text>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: "80%",
        height: 172,
        backgroundColor: colors.PRIMARY,
        borderRadius: 15,
        padding: 15,
        justifyContent: 'center'
    },
    imgBackground: {
        width: "100%",
        height: 172,
        backgroundColor: colors.PRIMARY,
        borderRadius: 15,
        padding: 15,
        justifyContent: 'center',
        paddingTop: 21,
    },
    labelText: {
        color: "#ffffff",
        fontSize: 16,
    },
    balanceText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: 400,
    },
    incomeExpensesContainer: {
        // flexDirection: "row",
        flex: 1,
        // justifyContent: "space-between",
        // marginTop: 30,
    },
    incomeExpensesText: {
        color: "#ffffff",
        fontSize: 24,
        fontWeight: 600,
    }
});

export default BalanceCard;
