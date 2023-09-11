import React from 'react';
import { View, StyleSheet,Text } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import Ionicons from "react-native-vector-icons/Ionicons"
import {colors} from "../assets/colors";
import {useNavigation} from "@react-navigation/native";

// const options = [
//     { label: 'Transfers', icon: 'swap-horizontal', color: '#12045b' },
//     { label: 'Withdrawals', icon: 'cash', color: '#12045b' },
//     { label: 'Beneficiaries', icon: 'receipt', color: '#12045b' },
//     { label: 'Transaction History', icon: 'time', color: '#12045b' },
// ];

const CustomOptionsComponent = ({options=[]}) => {
    const navigation = useNavigation();

    const renderOptions = () => {
        return options.map((option, index) => (
            <TouchableRipple
                key={index}
                style={[styles.option, { backgroundColor: 'white' }]}
                onPress={option?.onPress}
            >
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Ionicons name={option.icon} size={40} color={option.color} />
                    <Text style={styles.optionLabel}>{option.label}</Text>
                </View>
            </TouchableRipple>
        ));
    };

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                {renderOptions().slice(0, 2)}
            </View>
            <View style={styles.row}>
                {renderOptions().slice(2, 4)}
            </View>
            <View style={styles.row}>
                {renderOptions().slice(4, 6)}
            </View>
            <View style={styles.row}>
                {renderOptions().slice(6, 8)}
            </View>
            <View style={styles.row}>
                {renderOptions().slice(8, 10)}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    option: {
        flex: 1,
        margin: 8,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
        height: 120,
    },
    optionLabel: {
        marginTop: 15,
        color: colors.PRIMARY
    }
});

export default CustomOptionsComponent;
