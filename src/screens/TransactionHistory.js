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
import {
    getBankList,
    getProfile,
    getUserTransactionsAndTransfers,
    newProfile,
    TransferMoney,
    VerifyAccount
} from "../services/auth/authService";
import {updateProfileStatus} from "../redux/features/user/userSlice";
import DropDownPicker from "react-native-dropdown-picker";
import {colors} from "../assets/colors";
import BalanceCard from "../components/BalanceCard";
import TransactionItem from "../components/TransactionItem";
import {DateTime} from "luxon";
// import {updateUser} from "../../utils/users";


const TransactionHistory = () => {
	const [bank, setBank] = useState('')
	const [bankList, setBankList] = useState([])
	const [accountNumber, setAccountNumber] = useState('')
	const [accountName, setAccountName] = useState('')
	const [description, setDescription] = useState('')
	const [amount, setAmount] = useState('')
	const [resolveStatus, setResolveStatus] = useState(false)
	const [showBankPicker, setShowBankPicker] = useState(false)
    const [transactions, setTransactions] = useState([])

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
        getUserTransactionsAndTransfers(username)
            .then(res => {
                console.log("T and Tr: ", res)
                let sortedData = res.sort(function(b,a){
                    return new Date(a.time) - new Date(b.time);
                })
                setTransactions(sortedData)
                // console.log("T and Tr Out: ", res?.outflows)
            })
    },[])

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
                 {
                     transactions.map((item, index) => {
                         return <TransactionItem key={item?.amount + item?.other + item?.type} name={item?.name}
                                                 date={DateTime.fromJSDate(new Date(item?.time)).toLocaleString(DateTime.DATE_FULL)}
                                                 time={DateTime.fromJSDate(new Date(item?.time)).toLocaleString(DateTime.TIME_WITH_SHORT_OFFSET)}
                                                 amount={item?.amount}
                                                 other={item?.other}
                                                 type={item?.type}/>
                     })
                 }
			</View>
			</>}
			</KeyboardAvoidingView>
		</ScrollView>
	);
};

export default TransactionHistory;

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
