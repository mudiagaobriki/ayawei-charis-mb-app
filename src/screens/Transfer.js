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
import {useNavigation, useRoute} from '@react-navigation/native';
import NavigationNames from "../navigation/NavigationNames";
import {useDispatch, useSelector} from "react-redux";
import {selectUserName} from "../redux/features/auth/authSlice";
import {getBankList, getProfile, newProfile, TransferMoney, VerifyAccount} from "../services/auth/authService";
import {updateProfileStatus} from "../redux/features/user/userSlice";
import DropDownPicker from "react-native-dropdown-picker";
import {colors} from "../assets/colors";
import BalanceCard from "../components/BalanceCard";
// import {updateUser} from "../../utils/users";


const Transfer = () => {
	const [bank, setBank] = useState('')
	const [bankList, setBankList] = useState([])
	const [accountNumber, setAccountNumber] = useState('')
	const [accountName, setAccountName] = useState('')
	const [description, setDescription] = useState('')
	const [amount, setAmount] = useState('')
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

    const navigation = useNavigation();
    const dispatch = useDispatch()

    const {username} = useSelector(state => state.auth);
    const {fieldsEnabled, accNo, accName, userBank} = route?.params ?? {fieldsEnabled: true,
        accNo: "", accName: "", userBank: ""};


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

    const verifyAccount = async () => {
        // //console.log({bank, accountNumber})
        const response = await VerifyAccount(bank,accountNumber)
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
		<ScrollView contentContainerStyle={{paddingTop: 10, paddingHorizontal: 20,}}>
			<KeyboardAvoidingView behavior='position'>
			{loading && <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 40}}>
				<ActivityIndicator size={30} color='green' />
				</View>}
			{!loading && <>
			 <View style={{marginTop: 70}}>
                 <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                     <Text style={{fontSize: 24, color: colors.PRIMARY, marginBottom: 50}}>Transfer</Text>
                     <Image  source={require('../assets/logo.png')} style={{width: 130, height: 50, resizeMode:'stretch'}} />
                 </View>
                 <BalanceCard balance={balance} income={totalIncome} expenditure={totalExpenses} />

                 {/*<Text style={styles.signupText}>Bank Transfer</Text>*/}
				<View style={{marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
					<Text>Bank</Text>
                    <View style={{ marginBottom: 10, minHeight: 30 }}>
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
                            disabled={fieldsEnabled === false}
                            // listMode="SCROLLVIEW"
                            placeholder="Select a bank"
                            searchable={true}
                            placeholderStyle={{ color: 'black' }}
                            labelStyle={{ color: 'black' }}
                            // textStyle={{color: 'black'}}
                            modalTitle={'Account Type'}
                            open={showBankPicker}
                            value={bank}
                            // value={currentGender}
                            mode={'BADGE'}
                            theme={'DARK'}
                            items={bankList}
                            setOpen={() => {
                                setShowBankPicker(true);
                            }}
                            onClose={() => {
                                setShowBankPicker(false);
                            }}
                            // @ts-ignore
                            setValue={async (val: Function) => {
                                const cc = val();
                                // doHandleNext(cc);
                                // //console.log('xsxs', cc);
                                // let selectedCountry = countries?.find(el => el?.name === cc)
                                // setStates(selectedCountry?.states)

                                setBank(cc);
                            }}
                            style={[styles.textInput, { color:'black', width: width - 160, borderColor: 'transparent' }]}
                            dropDownContainerStyle={{
                                width: width - 160,
                                backgroundColor: '#e0e0e0',
                                zIndex: 5000,
                                borderWidth: 0,
                                borderColor: 'transparent',
                                color: 'black'
                            }}
                        />
                    </View>
				</View>
				<View style={{marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
					<Text>Account Number</Text>
					<TextInput
						style={[styles.textInput, {width: width - 160}]}
						// placeholder="Last name"
						onChangeText={text => setAccountNumber(text)}
                        onEndEditing={verifyAccount}
						value={accountNumber}
                        editable={fieldsEnabled}
						// keyboardType='text'
					/>
				</View>
				 <View style={{marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
					 <Text>Account Name</Text>
					 <TextInput
						 style={[styles.textInput, {width: width - 160, color: 'black'}]}
						 editable={false}
						 onChangeText={text => setAccountName(text)}
						 value={accountName}
					 />
				 </View>
                 <View style={{marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                     <Text>Amount</Text>
                     <TextInput
                         style={[styles.textInput, {width: width - 160, color: 'black'}]}
                         editable={true}
                         onChangeText={text => setAmount(text)}
                         value={amount}
                     />
                 </View>
                 {(fieldsEnabled == undefined) && <View style={{marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                     <Text>Description</Text>
                     <TextInput
                         style={[styles.textInput, {width: width - 160, height: 100}]}
                         editable={true}
                         onChangeText={text => setDescription(text)}
                         value={description}
                         multiline
                     />
                 </View>}
				<TouchableOpacity onPress={onSave} style={{width: width - 100,
					alignSelf: 'center', height: 55, backgroundColor: colors.PRIMARY,
					 marginTop: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 10}}>
					<Text style={{color: 'white', fontWeight: '700'}}>Transfer</Text>
				</TouchableOpacity>
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
        paddingHorizontal: 20,
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
    signupText: {
        color: 'black',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 50,
        alignSelf: "center",
    },
    textInput: {
        // width: "90%",
        borderRadius: 10,
        height: 45,
        backgroundColor:'#e5e5e5',
        marginTop: 20,
        paddingHorizontal: 15,
    },
    button: {
        height: 60,
    },
    buttonLabel: {
        fontSize: 16,
    },
})
