import React, {useState} from 'react';
import {View, StyleSheet, Text, TextInput} from "react-native";
import Heading from "../../components/text/Heading";
import {colors} from "../../assets/colors";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import {useNavigation} from "@react-navigation/native";
import NavigationNames from "../../navigation/NavigationNames";

const Signup = () => {
    const navigation = useNavigation();

    const [bvn, setBvn] = useState('')
    const [isBvnFocused, setIsBvnFocused] = useState(true)

    const onChangeBvn = (val) => {
        setBvn(val)
    }

    const handleLoginClicked = () => {

    }

    const handleContinueClicked = () => {
        navigation.navigate(NavigationNames.BVNDetails)
    }

    return (
        <View style={styles.container}>
            <Heading text='Sign Up' mb={5} />
            <Text style={styles.openAcctText}>Open a Charis Account</Text>
            <Text style={styles.bvnText}>Bank Verification Number</Text>
            <TextInput value={bvn} keyboardType='numeric'
                       maxLength={11}
                       onChangeText={text => onChangeBvn(text)}
                       placeholder='Enter your BVN'
                       placeholderTextColor={colors.BLACK_2}
                       autoFocus
                       onFocus={() => setIsBvnFocused(true)}
                       onBlur={() => setIsBvnFocused(false)}
                       style={[styles.textInput, {borderColor: isBvnFocused? colors.INPUT_HIGHLIGHT_1: colors.INPUT_DISABLED}]}
                       />
            <Text style={styles.forgotBVNText}>Forgot BVN? Dial *565*0#</Text>
            <PrimaryButton text="Continue" onPress={handleContinueClicked} mb={18} />
            <Text style={styles.haveAccountText}>
                Already have an account? <Text onPress={handleLoginClicked} style={styles.loginText}>Login</Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        paddingTop: 100,
        paddingHorizontal: 44,
    },
    openAcctText: {
        fontSize: 16,
        color: colors.LIGHT_GRAY_1,
        marginBottom: 34,
        textAlign: 'center',
    },
    bvnText: {
        fontSize: 12,
        fontWeight: 700,
        color: colors.BLACK_1,
        textAlign: 'left',
        marginBottom: 5,
    },
    textInput: {
        height: 50,
        width: '100%',
        borderRadius: 12,
        borderWidth: 1.5,
        paddingHorizontal: 16,
    },
    forgotBVNText: {
        marginTop: 15,
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 600,
        marginBottom: 47,
    },
    haveAccountText: {
        fontSize: 15,
        fontWeight: 500,
        textAlign: 'center',
    },
    loginText: {
        fontWeight: 600,
        textDecorationLine: 'underline',
    },
})

export default Signup;