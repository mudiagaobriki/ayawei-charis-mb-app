import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    TextInput,
    useWindowDimensions, Image
} from "react-native";
import BalanceCard from "../components/BalanceCard";
import TransactionItem from "../components/TransactionItem";
import { DateTime } from "luxon";
import {openDatabase} from "../helperFunctions/SqliteFunctions";
import {useDispatch, useSelector} from "react-redux";
import {
    setUserBalance,
    setUserTotalExpenses,
    setUserTotalIncome,
    setUserTransactions
} from "../redux/features/finances/financesSlice"
import {useIsFocused, useNavigation} from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import NavigationNames from "../navigation/NavigationNames";
import {
    getPackageList,
    getPaymentServices,
    getProfile,
    getUserTransactionsAndTransfers,
    getVendorList, initiateBillPayment, servicePriceListEnquiry, validatePayerAccount
} from "../services/auth/authService";
import DropDownPicker from "react-native-dropdown-picker";
import {colors} from "../assets/colors";
import CustomOptionsComponent from "../components/CustomOptionsComponent";


const Home = () => {

    const bankingOptions = [
        { label: 'Transfers', icon: 'swap-horizontal', color: '#12045b', onPress: () => openTransferScreen() },
        { label: 'Withdrawals', icon: 'cash', color: '#12045b', onPress: () => openWithdrawalScreen() },
        { label: 'Beneficiaries', icon: 'receipt', color: '#12045b' },
        { label: 'Transaction History', icon: 'time', color: '#12045b' },
    ];

    const loanOptions = [
        { label: 'Personal', icon: 'person', color: '#12045b' },
        { label: 'Business', icon: 'briefcase', color: '#12045b' },
        { label: 'Mortgage', icon: 'home', color: '#12045b' },
        { label: 'Repayments', icon: 'wallet', color: '#12045b' },
    ];

    const savingsOptions = [
        { label: 'Personal Savings', icon: 'person', color: '#12045b' },
        { label: 'Targeted Savings', icon: 'arrow-redo-outline', color: '#12045b' },
        { label: 'Corporatives', icon: 'briefcase', color: '#12045b' },
    ];

    const billOptions = [
        { label: 'Airtime', icon: 'phone-portrait', color: '#12045b' },
        { label: 'Internet Data', icon: 'wifi', color: '#12045b' },
        { label: 'Electricity Bill', icon: 'flash', color: '#12045b' },
        { label: 'Cable TV Subscription', icon: 'tv', color: '#12045b' },
        { label: 'Education Bills', icon: 'school', color: '#12045b' },
        { label: 'Sport and Betting', icon: 'basketball', color: '#12045b' },
        { label: 'Others', icon: 'ellipsis-horizontal', color: '#12045b' },
    ];

    const db = openDatabase();
    const dispatch  = useDispatch();
    const focused = useIsFocused();
    const navigation = useNavigation();

    const [totalExpenses, setTotalExpenses] = useState(0)
    const [totalIncome, setTotalIncome] = useState(0)
    const [balance, setBalance] = useState(0)
    const [transactions, setTransactions] = useState([])
    const [userProfile, setUserProfile] = useState(null)
    const [displayed, setDisplayed] = useState("Transactions")
    const [bills, setBills] = useState([])
    const [billsShown, setBillsShown] = useState("Base")
    const [vendorList, setVendorList] = useState([])
    const [showVendorPicker, setShowVendorPicker] = useState(false)
    const [showPackagePicker, setShowPackagePicker] = useState(false)
    const [vendor, setVendor] = useState("")
    const [service, setService] = useState(null)
    const [phone, setPhone] = useState("")
    const [amount, setAmount] = useState("")
    const [packageList, setPackageList] = useState([])
    const [priceList, setPriceList] = useState([])
    const [packageL, setPackage] = useState([])
    const [loading, setLoading] = useState(false)
    const [serviceOptions, setServiceOptions] = useState(bankingOptions)

    const { username, id } = useSelector(state => state.auth)
    const {width, height} = useWindowDimensions();
    // console.log({id})




    useEffect(() => {
        console.log("This ran -----------------------------------------------------------")
        getProfile(id)
            .then(res => {
                console.log("User Profile : ", {res})
                setUserProfile(res)
            })
            .catch(err => console.log({err}))
        console.log("Na here")
    },[focused])

    const handleWithdrawal = () => {
        console.log("FRom handle withdraw: ", userProfile)
        if (userProfile?.accountNumber === ""){
            alert("You have to set your settlement account first before withdrawing")
            navigation.navigate(NavigationNames.SettlementAccount)
        }
        else{
            navigation.navigate(NavigationNames.Transfer, {fieldsEnabled: false, accNo: userProfile?.accountNumber,
            accName: userProfile?.balance, userBank: userProfile?.bank})
        }
    }

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
        getPaymentServices()
            .then(res => {
                console.log("Payment Services: ", {res})
                setBills(res)
            })
    },[])

    const updateDisplayed = () => {
        if (displayed === "Transactions"){
            setDisplayed("Bills")
            setBillsShown("Base")
        }
        else{
            setDisplayed("Transactions")
        }
    }

    const selectVendor = (id, name) => {
        getVendorList(id)
            .then(res => {
                setBillsShown(name)
                // console.log("Vendors: ", res)
                setService(id);
                setVendorList(res)
            })

        // servicePriceListEnquiry(id)
        //     .then(resp => {
        //         console.log('Service Price List" ', {resp})
        //     })
    }

    const validatePayer = async (account_number, vendor_id) => {
        const result = await validatePayerAccount(account_number, vendor_id)

        console.log({result})
    }

    const initiatePayment = async (service_id, account_number, vendor_id, amount) => {
        setLoading(true)
        let result = await initiateBillPayment(service_id,account_number,vendor_id,100)
        result = result?.data;

        console.log({result})
        setLoading(false)
    }

    const openAddCashScreen = () => {
        navigation.navigate(NavigationNames.AddCash, {username})
    }

    const openWithdrawalScreen = () => {
        handleWithdrawal()
    }

    const openTransferScreen = () => {
        navigation.navigate(NavigationNames.Transfer)
    }

    const showBankingOptions = () => {
        setServiceOptions(bankingOptions)
    }

    const showLoanOptions = () => {
        setServiceOptions(loanOptions)
    }

    const showSavingsOptions = () => {
        setServiceOptions(savingsOptions)
    }

    const showBillsOptions = () => {
        setServiceOptions(billOptions)
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{width: "100%"}} showsVerticalScrollIndicator={false} >
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{fontSize: 24, color: colors.PRIMARY, marginBottom: 50}}>Hi, Mudiaga</Text>
                    <Image  source={require('../assets/logo.png')} style={{width: 130, height: 50, resizeMode:'stretch'}} />
                </View>
                <BalanceCard balance={balance} income={totalIncome} expenditure={totalExpenses} />
                <View style={{flexDirection: "row", marginTop: 25, marginBottom: 15, justifyContent: 'space-between', paddingHorizontal: 15 }}>
                    <TouchableOpacity onPress={showBankingOptions} style={{alignItems: 'center'}}>
                        <View style={{width: 70, height: 70, backgroundColor: colors.PRIMARY, borderRadius: 10,
                        justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
                            <Ionicons name='cash-outline' size={30} color={'white'} />
                        </View>
                        {/*<Text style={{fontSize: 12}}>Add Money</Text>*/}
                        <Text style={{fontSize: 12}}>Banking</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={showLoanOptions} style={{alignItems: 'center'}}>
                        <View style={{width: 70, height: 70, backgroundColor: colors.PRIMARY, borderRadius: 10,
                            justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
                            <Ionicons name='arrow-down-outline' size={30} color={'white'} />
                        </View>
                        {/*<Text style={{fontSize: 12}}>Withdraw</Text>*/}
                        <Text style={{fontSize: 12}}>Loans</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={showSavingsOptions} style={{alignItems: 'center'}}>
                        <View style={{width: 70, height: 70, backgroundColor: colors.PRIMARY, borderRadius: 10,
                            justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
                            <Ionicons name='wallet-outline' size={30} color={'white'} />
                        </View>
                        {/*<Text style={{fontSize: 12}}>Transfer</Text>*/}
                        <Text style={{fontSize: 12}}>Savings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{alignItems: 'center'}}
                    onPress={
                        () => {
                            // setDisplayed("Bills")
                            showBillsOptions()
                        }
                    }>
                        <View style={{width: 70, height: 70, backgroundColor: colors.PRIMARY, borderRadius: 10,
                            justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
                            <Ionicons name='apps-outline' size={30} color={'white'} />
                        </View>
                        <Text style={{fontSize: 12}}>Pay Bills</Text>
                    </TouchableOpacity>
                </View>
                <CustomOptionsComponent options={serviceOptions} />
                <View style={styles.headingsView}>
                    <Text style={styles.transactionsText}>{displayed}</Text>
                    <Text style={styles.seeAllText} onPress={updateDisplayed}>{displayed === "Transactions"? "See Bills": "See Transactions"}</Text>
                </View>
                { displayed === "Transactions" &&
                    transactions.map((item, index) => {
                        return <TransactionItem key={item?.amount + item?.other + item?.type} name={item?.name}
                                                date={DateTime.fromJSDate(new Date(item?.time)).toLocaleString(DateTime.DATE_FULL)}
                                                time={DateTime.fromJSDate(new Date(item?.time)).toLocaleString(DateTime.TIME_WITH_SHORT_OFFSET)}
                                                amount={item?.amount}
                                                other={item?.other}
                                                type={item?.type}/>
                    })
                }
                {
                    displayed === "Bills" && billsShown === "Base" &&
                      bills.map((item, index) => {
                          return <TouchableOpacity onPress={() => selectVendor(item?.service_id,item?.service_name)} key={index} style={{width: '100%', backgroundColor: "#e0e0e0", height: 60, marginBottom: 20,
                          paddingHorizontal: 10, justifyContent: "center"}}>
                              <Text>{item?.service_name}</Text>
                          </TouchableOpacity>
                      })
                }
                {
                    displayed === "Bills" && billsShown === "Buy Airtime" &&
                    <View style={{marginTop: 0}}>
                            {/*<Text style={styles.signupText}>Bank Transfer</Text>*/}
                            <View style={{maxWidth: width, marginTop: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                <Text>Provider</Text>
                                <View style={{ marginBottom: 10, minHeight: 30 }}>
                                    <DropDownPicker
                                        schema={{
                                            label: 'vendor_name', // required
                                            value: 'vendor_id', // required
                                            icon: 'icon',
                                            parent: 'parent',
                                            selectable: 'selectable',
                                            disabled: 'disabled',
                                        }}
                                        listMode="MODAL"
                                        // disabled={fieldsEnabled === false}
                                        // listMode="SCROLLVIEW"
                                        placeholder="Select a vendor"
                                        searchable={true}
                                        placeholderStyle={{ color: 'black' }}
                                        labelStyle={{ color: 'black' }}
                                        // textStyle={{color: 'black'}}
                                        modalTitle={'Vendors'}
                                        open={showVendorPicker}
                                        value={vendor}
                                        // value={currentGender}
                                        mode={'BADGE'}
                                        theme={'DARK'}
                                        items={vendorList}
                                        setOpen={() => {
                                            setShowVendorPicker(true);
                                        }}
                                        onClose={() => {
                                            setShowVendorPicker(false);
                                        }}
                                        // @ts-ignore
                                        setValue={async (val: Function) => {
                                            const cc = val();
                                            // doHandleNext(cc);
                                            // //console.log('xsxs', cc);
                                            // let selectedCountry = countries?.find(el => el?.name === cc)
                                            // setStates(selectedCountry?.states)

                                            setVendor(cc);
                                        }}
                                        style={[styles.textInput, { color:'black', width: width-130, borderColor: 'transparent', backgroundColor: "#e0e0e0", alignSelf: 'flex-end' }]}
                                        dropDownContainerStyle={{
                                            // width: "80%",
                                            backgroundColor: '#e0e0e0',
                                            zIndex: 5000,
                                            borderWidth: 0,
                                            borderColor: 'transparent',
                                            color: 'black'
                                        }}
                                    />
                                </View>
                            </View>
                            <View style={{marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Text>Phone No.</Text>
                                <TextInput
                                    style={[styles.textInput, {width: width-130}]}
                                    // placeholder="Last name"
                                    onChangeText={text => setPhone(text)}
                                    // onEndEditing={verifyAccount}
                                    value={phone}
                                    // editable={fieldsEnabled}
                                    // keyboardType='text'
                                />
                            </View>
                            <View style={{marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Text>Amount</Text>
                                <TextInput
                                    style={[styles.textInput, {width: width-130, color: 'black'}]}
                                    // editable={false}
                                    onChangeText={text => setAmount(text)}
                                    value={amount}
                                />
                            </View>

                            <TouchableOpacity disabled={loading} onPress={() => initiatePayment(service, phone, vendor, Number(amount))} style={{width: "80%",
                                alignSelf: 'center', height: 55, backgroundColor: colors.PRIMARY,
                                marginTop: 50, marginBottom: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 10}}>
                                <Text style={{color: 'white', fontWeight: '700'}}>{loading? "Busy": "Purchase"}</Text>
                            </TouchableOpacity>
                        </View>
                }
                {
                    displayed === "Bills" && billsShown === "Buy Data" &&
                    <View style={{marginTop: 0}}>
                        {/*<Text style={styles.signupText}>Bank Transfer</Text>*/}
                        <View style={{maxWidth: width, marginTop: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                            <Text>Provider</Text>
                            <View style={{ marginBottom: 10, minHeight: 30 }}>
                                <DropDownPicker
                                    schema={{
                                        label: 'vendor_name', // required
                                        value: 'vendor_id', // required
                                        icon: 'icon',
                                        parent: 'parent',
                                        selectable: 'selectable',
                                        disabled: 'disabled',
                                    }}
                                    listMode="MODAL"
                                    // disabled={fieldsEnabled === false}
                                    // listMode="SCROLLVIEW"
                                    placeholder="Select a vendor"
                                    searchable={true}
                                    placeholderStyle={{ color: 'black' }}
                                    labelStyle={{ color: 'black' }}
                                    // textStyle={{color: 'black'}}
                                    modalTitle={'Vendors'}
                                    open={showVendorPicker}
                                    value={vendor}
                                    // value={currentGender}
                                    mode={'BADGE'}
                                    theme={'DARK'}
                                    items={vendorList}
                                    setOpen={() => {
                                        setShowVendorPicker(true);
                                    }}
                                    onClose={() => {
                                        setShowVendorPicker(false);
                                    }}
                                    // @ts-ignore
                                    setValue={async (val: Function) => {
                                        const cc = val();
                                        // doHandleNext(cc);
                                        // //console.log('xsxs', cc);
                                        // let packageList = await getPackageList(cc)
                                        console.log({cc})
                                        let priceList = await servicePriceListEnquiry(service)
                                        let packageList = priceList?.find(el => el?.vendor_id === cc)
                                        console.log({priceList})
                                        console.log({packageList})
                                        // setPackageList(packageList)

                                        // setTimeout(async () => {
                                        //     console.log('Fetching...')
                                        //     let priceL = await servicePriceListEnquiry(service)
                                        //     console.log("Service price list: ", {priceL})
                                        // }, 3000)

                                        // console.log({packageList})
                                        // setStates(selectedCountry?.states)

                                        setVendor(cc);

                                    }}
                                    style={[styles.textInput, { color:'black', width: width-130, borderColor: 'transparent', backgroundColor: "#e0e0e0", alignSelf: 'flex-end' }]}
                                    dropDownContainerStyle={{
                                        // width: "80%",
                                        backgroundColor: '#e0e0e0',
                                        zIndex: 5000,
                                        borderWidth: 0,
                                        borderColor: 'transparent',
                                        color: 'black'
                                    }}
                                />
                            </View>
                        </View>
                        <View style={{maxWidth: width, marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                            <Text>Package</Text>
                            <View style={{ marginBottom: 10, minHeight: 30 }}>
                                <DropDownPicker
                                    schema={{
                                        label: 'package_name', // required
                                        value: 'package_id', // required
                                        icon: 'icon',
                                        parent: 'parent',
                                        selectable: 'selectable',
                                        disabled: 'disabled',
                                    }}
                                    listMode="MODAL"
                                    // disabled={fieldsEnabled === false}
                                    // listMode="SCROLLVIEW"
                                    placeholder="Select a package"
                                    searchable={true}
                                    placeholderStyle={{ color: 'black' }}
                                    labelStyle={{ color: 'black' }}
                                    // textStyle={{color: 'black'}}
                                    modalTitle={'Packages'}
                                    open={showPackagePicker}
                                    value={packageL}
                                    // value={currentGender}
                                    mode={'BADGE'}
                                    theme={'DARK'}
                                    items={packageList}
                                    setOpen={() => {
                                        setShowPackagePicker(true);
                                    }}
                                    onClose={() => {
                                        setShowPackagePicker(false);
                                    }}
                                    // @ts-ignore
                                    setValue={async (val: Function) => {
                                        const cc = val();
                                        // doHandleNext(cc);
                                        // //console.log('xsxs', cc);
                                        // let packageList = await getPackageList(cc)
                                        // console.log({packageList})
                                        // setStates(selectedCountry?.states)

                                        setPackage(cc);

                                    }}
                                    style={[styles.textInput, { color:'black', width: width-130, borderColor: 'transparent', backgroundColor: "#e0e0e0", alignSelf: 'flex-end' }]}
                                    dropDownContainerStyle={{
                                        // width: "80%",
                                        backgroundColor: '#e0e0e0',
                                        zIndex: 5000,
                                        borderWidth: 0,
                                        borderColor: 'transparent',
                                        color: 'black'
                                    }}
                                />
                            </View>
                        </View>
                        <View style={{marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text>Phone No.</Text>
                            <TextInput
                                style={[styles.textInput, {width: width-130}]}
                                // placeholder="Last name"
                                onChangeText={text => setPhone(text)}
                                // onEndEditing={verifyAccount}
                                value={phone}
                                // editable={fieldsEnabled}
                                // keyboardType='text'
                            />
                        </View>
                        <View style={{marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text>Amount</Text>
                            <TextInput
                                style={[styles.textInput, {width: width-130, color: 'black'}]}
                                // editable={false}
                                onChangeText={text => setAmount(text)}
                                value={amount}
                            />
                        </View>

                        <TouchableOpacity disabled={loading} onPress={() => initiatePayment(service, phone, vendor, Number(amount))} style={{width: "80%",
                            alignSelf: 'center', height: 55, backgroundColor: colors.PRIMARY,
                            marginTop: 50, marginBottom: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 10}}>
                            <Text style={{color: 'white', fontWeight: '700'}}>{loading? "Busy": "Purchase"}</Text>
                        </TouchableOpacity>
                    </View>
                }
            </ScrollView>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    headingsView: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 15,
    },
    transactionsText: {
        fontSize: 16,
    },
    seeAllText: {
        fontSize: 12,
    },
    textInput: {
        // width: "90%",
        borderRadius: 10,
        height: 45,
        backgroundColor:'#e5e5e5',
        marginTop: 20,
        paddingHorizontal: 15,
    },
});

export default Home;
