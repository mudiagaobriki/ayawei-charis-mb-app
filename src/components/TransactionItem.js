import React from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {colors} from "../assets/colors";

const TransactionItem = ({type, amount, date, time, title, other=""}) => {

    let icon = null;
    if (type === "bills"){
        icon = require("../assets/bills-icon.png")
    }
    else if (type === "transfer"){
        icon = require("../assets/money-transfer-icon.png")
    }
    else if (type === "deposit"){
        icon = require("../assets/received-money-icon.png")
    }

    return (
        <View style={styles.card}>
            <View style={styles.imageNameView}>
                <TouchableOpacity style={styles.iconContainer}>
                    <Image source={icon} style={styles.icon} />
                </TouchableOpacity>
                <View style={styles.nameDateView}>
                    <Text style={styles.itemName}>{title}</Text>
                    <Text style={styles.date}>{date}</Text>
                    {/*<Text style={styles.date}>{time}</Text>*/}
                </View>
            </View>
            <Text style={styles.amountText}>
                {type==="deposit"? "": "-"}₦{(amount).toLocaleString()}
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
        paddingVertical: 20,
    },
    imageNameView: {
        flexDirection: "row",
        maxWidth: "70%",
    },
    nameDateView: {
        marginLeft: 15,
        maxWidth: 170,
    },
    itemName: {
        fontSize: 14,
        fontWeight: 700,
    },
    date: {
        fontSize: 12,
        color: "#ABA8AF",
        marginTop: 5,
    },
    amountText: {
        color: colors.BLACK_2,
        fontSize: 18,
        fontWeight: 700,
        textAlign: "right",
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 40,
        backgroundColor: "#F7F5F9",
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {
        width: 18,
        height:18,
    },
})

export default TransactionItem;
