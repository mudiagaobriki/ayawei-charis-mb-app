import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from "react-native";
import {useSelector} from "react-redux";
import {selectUserName} from "../redux/features/auth/authSlice";
import {getUserAccountDetails, getUserBalance, getUserTransactions} from "../services/auth/authService";
import {useIsFocused} from "@react-navigation/native";
import {colors} from "../assets/colors";


const BalanceCard = () => {

    const focused = useIsFocused()

    const [accountNumber, setAccountNumber] = useState("")
    const [balance, setBalance] = useState("")
    const [fetching, setFetching] = useState(true)

    const {profileData} = useSelector(state => state.user)
    const {username} = useSelector(state => state.auth)

    const {firstName, lastName, email} = profileData

    //console.log({profileData})
    //console.log({username})

    useEffect(() => {
        getUserAccountDetails(username)
            .then(res => {
                //console.log("Account details: ", res)
                setAccountNumber(res?.account_number)
            })
    },[])

    useEffect(() => {
        getUserBalance(username, accountNumber)
            .then(res => {
                //console.log("User Balance: ", res)
                setBalance((res/100).toFixed(2))
                setFetching(false)
                // setAccountNumber(res?.account_number)
            })
    },[accountNumber, focused])

    return (
        <View style={styles.card}>
            <View style={styles.incomeExpensesContainer}>
                <View>
                    <Text style={styles.labelText}>Account Number</Text>
                    <Text style={styles.incomeExpensesText}>{accountNumber}</Text>
                </View>
                <View>
                    <Text style={styles.labelText}></Text>
                    <Text style={[styles.incomeExpensesText,{fontSize: 16, marginTop: 10}]}>₦{balance < 0? "": balance?.toLocaleString()}</Text>
                </View>
            </View>
            {/*<View>*/}
            {/*    /!*<Text style={styles.labelText}>{`${firstName} ${lastName}`}</Text>*!/*/}
            {/*    <Text style={styles.labelText}>Mudiaga Obriki</Text>*/}
            {/*    <Text style={styles.balanceText}>{accountNumber}</Text>*/}
            {/*</View>*/}
            {/*<View style={styles.incomeExpensesContainer}>*/}
            {/*    <View>*/}
            {/*        <Text style={styles.labelText}>Your Balance</Text>*/}
            {/*        <Text style={styles.incomeExpensesText}>₦{balance < 0? "": balance?.toLocaleString()}</Text>*/}
            {/*    </View>*/}
            {/*    <View>*/}
            {/*        <Text style={styles.labelText}></Text>*/}
            {/*        <Text style={[styles.incomeExpensesText,{fontSize: 16, marginTop: 10}]}>Level 1</Text>*/}
            {/*    </View>*/}
            {/*</View>*/}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: "100%",
        height: 100,
        backgroundColor: colors.PRIMARY,
        borderRadius: 15,
        padding: 15,
        justifyContent: 'center'
    },
    labelText: {
        color: "#ffffff",
        fontSize: 13,
    },
    balanceText: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: 700,
    },
    incomeExpensesContainer: {
        flexDirection: "row",
        flex: 1,
        justifyContent: "space-between",
        // marginTop: 30,
    },
    incomeExpensesText: {
        color: "#ffffff",
        fontSize: 24,
        fontWeight: 600,
    }
});

export default BalanceCard;
