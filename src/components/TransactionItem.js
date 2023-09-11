import React from 'react';
import {View, StyleSheet, Image, Text} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const TransactionItem = ({type, other, amount, date, time}) => {
    return (
        <View style={styles.card}>
            <View style={styles.imageNameView}>
                <Ionicons name={type==="Deposit"? "arrow-up": "arrow-down"} size={30}
                          color={type==="Deposit"? "#52DDB5": "#DB1A1A"} />
                <View style={styles.nameDateView}>
                    <Text style={styles.itemName}>{type === 'Deposit'? `Deposit from ${other}`: `Transfer to ${other}`}</Text>
                    <Text style={styles.date}>{date}</Text>
                    <Text style={styles.date}>{time}</Text>
                </View>
            </View>
            <Text style={type==="income"? styles.incomeText: styles.expenseText}>
                ₦{(amount/100).toLocaleString()}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: "100%",
        height: 80,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom:15,
    },
    imageNameView: {
        flexDirection: "row",
        maxWidth: "70%",
    },
    nameDateView: {
        marginLeft: 10,
    },
    itemName: {
        fontSize: 14,
    },
    date: {
        fontSize: 12,
        color: "#ABA8AF",
        marginTop: 5,
    },
    expenseText: {
        color: "#DB1A1A",
        fontSize: 18,
        fontWeight: 500,
        textAlign: "right",
    },
    incomeText: {
        color: "#52DDB5",
        fontSize: 18,
        fontWeight: 500,
        textAlign: "right",
    },
})

export default TransactionItem;
