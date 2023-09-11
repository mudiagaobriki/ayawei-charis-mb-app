import React from 'react';
import {Text, View, StyleSheet} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const IncomeExpensesSummary = ({income, expenditure, incomeCount,expenditureCount}) => {
    return (
        <View>
            <View style={styles.container}>
                <View style={styles.itemContainer}>
                    <View>
                        <Text style={styles.labelText}>Income Count</Text>
                        <Text style={styles.valuesText}>{incomeCount}</Text>
                    </View>
                </View>
                <View style={styles.itemContainer}>
                    <View>
                        <Text style={styles.labelText}>Expenses Count</Text>
                        <Text style={styles.valuesText}>{expenditureCount}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.itemContainer}>
                    <View>
                        <Text style={styles.labelText}>Income</Text>
                        <Text style={[styles.valuesText,{marginBottom: 25}]}>${income}</Text>
                    </View>
                </View>
                <View style={styles.itemContainer}>
                    <View>
                        <Text style={styles.labelText}>Expenses</Text>
                        <Text style={styles.valuesText}>${-1 * expenditure}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    labelText: {
        color: "#ABA8AF",
        fontSize: 13,
    },
    container: {
        flexDirection: "row",
        flex: 1,
        justifyContent: "space-between",
        marginTop: 30,
    },
    itemContainer: {
        backgroundColor: "#ffffff",
        paddingVertical: 10,
        paddingHorizontal:20,
        flexDirection: "row",
        borderRadius: 10,
        width: "48%",
    },
    valuesText: {
        fontSize: 18,
        fontWeight: 600,
    },
    countsText: {
        fontSize: 14,
        fontWeight: 500,
        marginTop: 10,
    }
})

export default IncomeExpensesSummary;
