import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TextInput, TouchableOpacity, Image} from "react-native";
import Heading from "../../components/text/Heading";
import {colors} from "../../assets/colors";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import {useNavigation, useRoute} from "@react-navigation/native";
import NavigationNames from "../../navigation/NavigationNames";
import MaterialCommunityIcon from "react-native-paper/src/components/MaterialCommunityIcon";
import {login} from "../../services/auth/authService";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const Deposit = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const [account, setAccount] = useState(null)

    const {accountDetails} = route?.params;
    // console.log({accountDetails})

    useEffect(() => {
        setAccount(accountDetails)
    },[accountDetails])

    useEffect(() => {
        console.log("Mudi")
        console.log({account})
    }, [account]);


    return (
        <View style={styles.container}>
            <View style={styles.pageHeader}>
                <Icon name="chevron-left" size={30} onPress={() => navigation.goBack()} />
                <Heading text='Add By Transfer' size={24} mb={5} />
                <View style={{alignSelf: 'center'}}>
                    <PrimaryButton text="Share" width={65} height={28} onPress={() => console.log("Clicked")}/>
                </View>

            </View>

            <Text style={styles.openAcctText}>
                Use the details below to send money to your
                Charis account from any bank’s app or
                through internet banking
            </Text>
            {account && <View>
                <View style={styles.accountDetail}>
                    <Text>{account?.bank?.name}</Text>
                </View>
                <View style={styles.accountDetail}>
                    <Text>{accountDetails?.account_number}</Text>
                </View>
                <View style={styles.accountDetail}>
                    <Text>{accountDetails?.account_name}</Text>
                </View>
            </View>}
            <Image source={require("../../assets/rewardsWaiting.png")} style={styles.rewardsWaitingImg} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        paddingTop: 60,
        paddingHorizontal: 44,
    },
    pageHeader: {
        // flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginLeft: -30,
        width: "120%",
        marginBottom: 30,
    },
    openAcctText: {
        fontSize: 16,
        color: colors.LIGHT_GRAY_1,
        marginBottom: 40,
        textAlign: 'center',
    },
    accountDetail: {
        width: "100%",
        height: 60,
        backgroundColor: "#d1d6d9",
        justifyContent: 'center',
        alignItems: "center",
        marginBottom: 17,
        borderRadius: 9,
    },
    rewardsWaitingImg: {
        width: '100%',
        height: 156,
        resizeMode: 'stretch',
        marginTop: 60,
    }
})

export default Deposit;