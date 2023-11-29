import React, {useEffect, useRef, useState} from 'react';
import { Image, StyleSheet, ScrollView, TextInput, Text, View,
useWindowDimensions, Platform, TouchableOpacity } from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
// import { requestOTP, verifyOTP } from '../../utils/users'
import { useNavigation, useRoute } from '@react-navigation/native';
// import NavigationNames from '../../navigation/NavigationNames';
import { useSelector, useDispatch } from 'react-redux';
import NavigationNames from "../../navigation/NavigationNames";
import {verifyOTP} from "../../services/profile/profileService";
import {setSignIn} from "../../redux/features/auth/authSlice";
import {getProfile} from "../../services/auth/authService";
import {updateProfileData, updateProfileStatus} from "../../redux/features/user/userSlice";
import {colors} from "../../assets/colors";
import Heading from "../../components/text/Heading";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import CircularProgress from "react-native-circular-progress-indicator";
import ActionItem from "../../components/ActionItem";
import BalanceCard from "../../components/BalanceCard";
import TransactionItem from "../../components/TransactionItem";
// import { setSignIn } from '../../redux/slices/authSlice';
// import { storeData } from '../../utils/deviceStorage';

// console.log({useKeyboard})

const DEMO_ACTIONS = [
    {
        key: 1,
        leftImgUrl :require("../../assets/send.png"),
        title: "Send",
    },
    {
        key: 2,
        leftImgUrl :require("../../assets/save.png"),
        title: "Save",
    },
    {
        key: 3,
        leftImgUrl :require("../../assets/credit-card.png"),
        title: "Borrow",
    },
    {
        key: 4,
        leftImgUrl :require("../../assets/ellipsis.png"),
        title: "More",
        bgColor: colors.GREY_1,
    },
]

const DEMO_ACCESS_ITEMS = [
    {
        key: 1,
        leftImgUrl :require("../../assets/airtime.png"),
        title: "Airtime",
    },
    {
        key: 2,
        leftImgUrl :require("../../assets/bills.png"),
        title: "Bills",
    },
    {
        key: 3,
        leftImgUrl :require("../../assets/betting.png"),
        title: "Betting",
    },
]

const DEMO_TRANSACTIONS = [
    {
        type: "bills",
        title: "Market Square Supermartet",
        amount: 15000,
        date: "31/01/2023",
    },
    {
        type: "bills",
        title: "DSTV Subscription",
        amount: 2255,
        date: "31/01/2023",
    },
    {
        type: "transfer",
        title: "Money Transfer",
        amount: 20000,
        date: "01/11/2023",
    },
    {
        type: "deposit",
        title: "Received Money",
        amount: 10000,
        date: "01/11/2023",
    },
]

const DashboardServiceItem = ({imgUrl, title, onPress={}, bgColor=colors.PRIMARY}) => {
    return <TouchableOpacity  style={{justifyContent: 'center', alignItems: 'center', marginBottom: 27,}}>
        <View style={{width: 60, height: 60, borderRadius: 15, marginBottom: 10,
            backgroundColor: bgColor, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={imgUrl} style={{width: 30, height: 25,}} />
        </View>

        <Text style={{fontSize: 12, fontWeight: 500,}}>{title}</Text>
    </TouchableOpacity>
}

const QuickAccessItem = ({imgUrl, title, onPress={}, bgColor=colors.PRIMARY}) => {
    return <TouchableOpacity  style={{justifyContent: 'center', alignItems: 'center', marginBottom: 31,}}>
        <View style={{width: 100, height: 44, borderRadius: 15, marginBottom: 10, flexDirection: 'row',
            backgroundColor: bgColor, justifyContent: 'center', alignItems: 'center',}}>
            <Image source={imgUrl} style={{width: 15, height: 19, marginRight: 9,}} />
            <Text style={{fontSize: 12, color: '#ffffff',}}>{title}</Text>
        </View>
    </TouchableOpacity>
}

const PaymentDashboard = () => {
    const [checked, setChecked] = React.useState(false);
    const [value, setValue] = useState(1);
    const [progressValue, setProgressValue] = useState(0);
    const [formattedValue, setFormattedValue] = useState("");
    // const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    const {height, width} = useWindowDimensions()
    const navigation = useNavigation();
    const route = useRoute();
    const otpInput = useRef(null);
    const dispatch = useDispatch();

    // const { status } = useSelector(state => state.user)
    const status = ""
    // const {username, id, token} = useSelector(state => state.auth);
    //
    // console.log({username})
    const {phone} = route?.params ?? {};

    useEffect(() => {
        setProgressValue(prevState => value/3 * 100);
    },[])

    const handleNext = async () => {
        navigation.navigate(NavigationNames.WelcomeToCharis)
    }

    const handleArrowClick = () => {

    }


    return (
        <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.container}>
            <Heading text='Payment' mt={0} mb={21} size={24} />
            <View style={styles.balanceCardContainer}>
                <BalanceCard balance={0} accountNumber={phone} />
                <TouchableOpacity style={styles.plusButton}>
                    <Text style={styles.plusText}>+</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.mainActions}>
                {
                    DEMO_ACTIONS.map((item,index) => {
                        return <DashboardServiceItem
                                    title={item?.title}
                                    onPress={() => {}}
                                    bgColor={item?.bgColor || colors.PRIMARY}
                                    imgUrl={item.leftImgUrl} />
                    })
                }
            </View>
            <Text style={styles.quickAccessText}>Quick Access</Text>
            <View style={styles.mainActions}>
                {
                    DEMO_ACCESS_ITEMS.map((item,index) => {
                        return <QuickAccessItem
                            title={item?.title}
                            onPress={() => {}}
                            imgUrl={item.leftImgUrl} />
                    })
                }
            </View>
            <View style={styles.recentTransactionsContainer}>
                <Text style={styles.recentTransactionText}>
                    Recent Transactions
                </Text>
                <Text style={[styles.recentTransactionText,{color: colors.PRIMARY_2}]}>
                    See all
                </Text>
            </View>
            {
                DEMO_TRANSACTIONS.map((item, index) => {
                    return <TransactionItem amount={item?.amount} date={item?.date}
                                            type={item?.type}
                                            title={item?.title} />
                })
            }
            <View style={{height: 100}} />
            {/*<Text style={{marginTop: 30}}>No transactions yet</Text>*/}
        </ScrollView>
    );
};

export default PaymentDashboard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 58,
        paddingHorizontal: 25,
    },
    scrollContainer: {
        alignItems: 'center',
        paddingTop: 50,
    },
    balanceCardContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    plusButton: {
        height: 172,
        width: '15%',
        backgroundColor: '#000000',
        borderRadius: 15,
        marginLeft: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    plusText: {
        color: '#ffffff',
        fontSize: 30,
    },
    mainActions: {
        flex: 1,
        width: '100%',
        flexDirection: "row",
        justifyContent: "space-between",
    },
    quickAccessText: {
        fontSize: 14,
        alignSelf: 'flex-start',
        marginBottom: 13,
    },
    recentTransactionsContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 35,
    },
    recentTransactionText: {
        fontSize: 14,
    }
})