import React, { useState, useEffect } from 'react';
import {
    ScrollView,
    KeyboardAvoidingView,
    View,
    Text,
    StyleSheet,
    TextInput,
    useWindowDimensions,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    Image
} from 'react-native';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import NavigationNames from "../navigation/NavigationNames";
import {useDispatch, useSelector} from "react-redux";
import {selectUserName} from "../redux/features/auth/authSlice";
import {
    getBankList,
    getProfile,
    getUserAccountDetails,
    newProfile,
    TransferMoney,
    VerifyAccount
} from "../services/auth/authService";
import {updateProfileStatus} from "../redux/features/user/userSlice";
import DropDownPicker from "react-native-dropdown-picker";
import {colors} from "../assets/colors";
import BalanceCard from "../components/BalanceCard";
import Heading from "../components/text/Heading";
import PrimaryButton from "../components/buttons/PrimaryButton";
// import {updateUser} from "../../utils/users";


const Transfer = () => {
	const [bank, setBank] = useState('')
	const [bankList, setBankList] = useState([])

	const [resolveStatus, setResolveStatus] = useState(false)
	const [showBankPicker, setShowBankPicker] = useState(false)

	const {width, height} = useWindowDimensions();
	const route = useRoute();
	// const [username, setUsername] = useState(route?.params?.username);
	const [user, setUser] = useState({})
	const [loading, setLoading] = useState(false)

    const [totalExpenses, setTotalExpenses] = useState(0)
    const [totalIncome, setTotalIncome] = useState(0)
    const [balance, setBalance] = useState(0)

    const [userProfile, setUserProfile] = useState(null)
    const [accountDetails, setAccountDetails] = useState(null)
    const [accountNumber, setAccountNumber] = useState('')
    const [accountName, setAccountName] = useState('')
    const [description, setDescription] = useState('')
    const [amount, setAmount] = useState('')
    const [isAccountNumberFocused, setIsAccountNumberFocused] = useState(false)
    const [isAccountNameFocused, setIsAccountNameFocused] = useState(false)
    const [isAmountFocused, setIsAmountFocused] = useState(false)
    const [isDescriptionFocused, setIsDescriptionFocused] = useState(false)
    const [isBankFocused, setIsBankFocused] = useState(false)

    const navigation = useNavigation();
    const dispatch = useDispatch()
    const focused = useIsFocused();

    const {username} = useSelector(state => state.auth);
    const {fieldsEnabled, accNo, accName, userBank} = route?.params ?? {fieldsEnabled: true,
        accNo: "", accName: "", userBank: ""};

    useEffect(() => {
        console.log("This ran -----------------------------------------------------------")
        getProfile(user?.email)
            .then(res => {
                console.log("User Profile : ", {res})
                setUserProfile(res)
            })
            .catch(err => console.log({err}))
        console.log("Na here")
    },[focused])

    useEffect(() => {
        getUserAccountDetails("+2348138885831")
            .then(res2 => {
                // console.log({res2})
                setAccountDetails(res2)
            })
    },[focused])


    console.log({fieldsEnabled, accNo, accName, userBank})

    // //console.log({username})

    useEffect(() => {
        if (accNo != undefined){
            setAccountNumber(accNo)
            setAccountName(accName)
            setBank(userBank)
        }
    },[fieldsEnabled])


    useEffect(() => {
        getBankList()
            .then(res => {
                // //console.log("Banks List: ", res)
                setBankList(res)
            })
    },[])

    const verifyAccount = async (bnk, acc) => {
        // //console.log({bank, accountNumber})
        const response = await VerifyAccount(bnk,acc)
        // //console.log({response})

        if (response.status === false){
            alert(response.message)
        }
        else{
            setAccountName(response?.data['account_name'])
        }

    }

	const onSave = async () => {
        // //console.log("Clicked here")
        // //console.log({bank, accountNumber})
        let desc = `from ${username}: ${description}`
        const response = await TransferMoney(bank, accountNumber, accountName, amount, desc)

        // //console.log({response})

    }

	return (
		<ScrollView contentContainerStyle={{paddingTop: 10, paddingHorizontal: 40,}}>
			<KeyboardAvoidingView behavior='position'>
			{loading && <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 40}}>
				<ActivityIndicator size={30} color='green' />
				</View>}
			{!loading && <>
			 <View style={{marginTop: 70}}>
                 <Heading text='Send Money' size={24} mb={20} />
                 {accountDetails && <View style={styles.balanceCardContainer}>
                     <BalanceCard width="100%" balance={0} accountNumber={accountDetails?.account_number} />
                 </View>}

                 {/*<Text style={styles.inputLabel}>Account Number</Text>*/}
                 <TextInput value={accountNumber} keyboardType='numeric'
                            onChangeText={text => setAccountNumber(text)}
                            placeholder='Beneficiary Account Number'
                            placeholderTextColor={colors.BLACK_2}
                            autoFocus
                            onFocus={() => setIsAccountNumberFocused(true)}
                            onBlur={() => setIsAccountNumberFocused(false)}
                            style={[styles.textInput, {borderColor: isAccountNumberFocused? colors.INPUT_HIGHLIGHT_1: colors.INPUT_DISABLED}]}
                 />
                 <View style={styles.inputGroup}>
                     {/*<Text style={styles.inputLabel}>State</Text>*/}
                     <DropDownPicker
                         schema={{
                             label: 'name', // required
                             value: 'code', // required
                             icon: 'icon',
                             parent: 'parent',
                             selectable: 'selectable',
                             disabled: 'disabled',
                         }}
                         listMode="MODAL"
                         placeholder="Select Bank"
                         searchable={true}
                         placeholderStyle={{ color: colors.BLACK_2 }}
                         labelStyle={{ color: 'black' }}
                         modalTitle={'States'}
                         open={showBankPicker}
                         value={bank}
                         mode={'BADGE'}
                         theme={'LIGHT'}
                         items={bankList}
                         setOpen={() => {
                             setShowBankPicker(true);
                         }}
                         onClose={() => {
                             setIsBankFocused(false)
                             setShowBankPicker(false);
                         }}
                         onPress={() => setIsBankFocused(true)}
                         // @ts-ignore
                         setValue={async (val: Function) => {
                             const cc = val();
                             console.log({cc})
                             setBank(cc);
                             await verifyAccount(cc, accountNumber)
                         }}
                         style={[styles.textInput, { backgroundColor: 'transparent', borderColor: isBankFocused? colors.INPUT_HIGHLIGHT_1: colors.INPUT_DISABLED }]}
                         dropDownContainerStyle={styles.dropdownContainer}
                     />
                 </View>
                 <TextInput value={accountName}
                            onChangeText={text => setAccountName(text)}
                            editable={false}
                            placeholder='Account Name'
                            placeholderTextColor={colors.BLACK_2}
                            autoFocus
                            onFocus={() => setIsAccountNameFocused(true)}
                            onBlur={() => setIsAccountNameFocused(false)}
                            style={[styles.textInput, {borderColor: isAccountNameFocused? colors.INPUT_HIGHLIGHT_1: colors.INPUT_DISABLED}]}
                 />
                 <TextInput value={amount} keyboardType='numeric'
                            onChangeText={text => setAccountName(text)}
                            editable={false}
                            placeholder='Enter Amount'
                            placeholderTextColor={colors.BLACK_2}
                            autoFocus
                            onFocus={() => setIsAmountFocused(true)}
                            onBlur={() => setIsAmountFocused(false)}
                            style={[styles.textInput, {borderColor: isAmountFocused? colors.INPUT_HIGHLIGHT_1: colors.INPUT_DISABLED}]}
                 />
                 <TextInput value={description}
                            onChangeText={text => setDescription(text)}
                            editable={false}
                            placeholder='Add reason for transfer'
                            placeholderTextColor={colors.BLACK_2}
                            autoFocus
                            onFocus={() => setIsDescriptionFocused(true)}
                            onBlur={() => setIsDescriptionFocused(false)}
                            style={[styles.textInput, {borderColor: isDescriptionFocused? colors.INPUT_HIGHLIGHT_1: colors.INPUT_DISABLED}]}
                 />
				<PrimaryButton text="Transfer" onPress={onSave} />
			</View>
			</>}
			</KeyboardAvoidingView>
		</ScrollView>
	);
};

export default Transfer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 44,
    },
    scrollContainer: {
        alignItems: 'center',
        paddingTop: 30,
    },
    logo: {
        width: 180,
        height: 150,
        resizeMode: 'stretch',
        marginBottom: 20,
        alignSelf: "center"
    },
    balanceCardContainer: {
        // flex: 1,
        // flexDirection: 'row',
        width: "100%",
        justifyContent: 'space-between',
        marginBottom: 40,
    },
    signupText: {
        color: 'black',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 50,
        alignSelf: "center",
    },
    inputLabel: {
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
        marginBottom: 16,
    },
    button: {
        height: 60,
    },
    buttonLabel: {
        fontSize: 16,
    },
})
