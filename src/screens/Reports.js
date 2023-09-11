import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, SafeAreaView, StyleSheet, Dimensions} from "react-native";
import BalanceCard from "../components/BalanceCard";
import TransactionItem from "../components/TransactionItem";
import {DateTime} from "luxon";
import IncomeExpensesSummary from "../components/IncomeExpensesSummary";
import {BarChart, LineChart} from "react-native-chart-kit";
import DropDownPicker from "react-native-dropdown-picker";
import {openDatabase} from "../helperFunctions/SqliteFunctions";
import {useIsFocused} from "@react-navigation/native";

const dummyData = [
    {
        key: 1,
        name: "Fish",
        amount: 45.31,
        date: new Date(),
        type: "income",
    },
    {
        key: 2,
        name: "Meat",
        amount: 23.94,
        date: new Date(),
        type: "expenses",
    },
    {
        key: 3,
        name: "Bike",
        amount: 1053.23,
        date: new Date(),
        type: "income",
    },
    {
        key: 4,
        name: "Bread",
        amount: 10.00,
        date: new Date(),
        type: "expenses",
    },
    {
        key: 5,
        name: "Goat Meat",
        amount: 52.11,
        date: new Date(),
        type: "income",
    },
]

const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
        {
            data: [20, 45, 28, 80, 99, 43],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 2 // optional
        }
    ],
    legend: ["Transactions"] // optional
};

const filters = [
    {
        key: 1,
        label: "Today",
        value: "today"
    },
    {
        key: 1,
        label: "Yesterday",
        value: "yesterday"
    },
    {
        key: 1,
        label: "Last Week",
        value: "lastweek"
    },
    {
        key: 1,
        label: "This Month",
        value: "thismonth"
    },
    {
        key: 1,
        label: "All Time",
        value: "alltime"
    },
]

const chartConfig = {
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};

const Reports = () => {
    const {width} = Dimensions.get("window")

    const [filter, setFilter] = useState("alltime")
    const [showFilterPicker, setShowFilterPicker] = useState(false)

    const db = openDatabase();
    const focused = useIsFocused();

    const [totalExpenses, setTotalExpenses] = useState(0)
    const [totalIncome, setTotalIncome] = useState(0)
    const [incomeCount, setIncomeCount] = useState(0)
    const [expenditureCount, setExpenditureCount] = useState(0)
    const [balance, setBalance] = useState(0)
    const [transactions, setTransactions] = useState([])
    const [allTransactions, setAllTransactions] = useState([])

    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
                "select * from items order by value desc limit 5;",[], (_, { rows }) =>{
                    let dataLabels = rows?._array?.map(el => el?.name)
                    let chartValues = rows?._array?.map(el => el?.value)
                    data.labels = dataLabels
                    data.datasets.data = chartValues
                    setTransactions(rows?._array)
                    setAllTransactions(rows?._array)
                }
            );
            tx.executeSql(
                "select sum(value) as sum from items;",[], (_, { rows }) =>{
                    setBalance(rows?._array[0]?.sum)
                }
            );
            tx.executeSql(
                "select sum(value) as sum from items where type = 'income';",[], (_, { rows }) =>{
                    setTotalIncome(rows?._array[0]?.sum)
                }
            );
            tx.executeSql(
                "select count(*) as count from items where type = 'income';",[], (_, { rows }) =>{
                    setIncomeCount(rows?._array[0]?.count)
                }
            );
            tx.executeSql(
                "select count(*) as count from items where type = 'expenses';",[], (_, { rows }) =>{
                    setExpenditureCount(rows?._array[0]?.count)
                }
            );
            tx.executeSql(
                "select sum(value) as sum from items where type = 'expenses';",[], (_, { rows }) =>{
                    setTotalExpenses(rows?._array[0]?.sum)
                }
            );
        });
    }, [focused]);

    const computeSums = (items) => {
        let bal = 0;
        let incomeTotal = 0;
        let incomeCount = 0;
        let expensesTotal = 0;
        let expensesCount = 0;

        // get the total balance
        bal = items.reduce((i, obj) => {
            return i + obj.value;
        }, 0);

        // get total income and income count
        const incomeArray = items?.filter(el => el?.type === "income")
        incomeCount = incomeArray.length;
        incomeTotal = incomeArray.reduce((i, obj) => {
            return i + obj.value;
        }, 0);

        // get total expenses and expenses count
        const expensesArray = items?.filter(el => el?.type === "expenses")
        expensesCount = expensesArray.length;
        expensesTotal = expensesArray.reduce((i, obj) => {
            return i + obj.value;
        }, 0);

        return {
            bal, incomeCount, incomeTotal, expensesCount, expensesTotal
        }
    }

    const filterChanged = (cc) => {
        const today = new Date()
        const yesterday = new Date(today)

        yesterday.setDate(yesterday.getDate() - 1)

        console.log(allTransactions)
        console.log(yesterday.toDateString())

        let filteredValues = [];

        if (cc === "today"){
            filteredValues = allTransactions?.filter(el => el?.transactionDate.includes(today?.toDateString()))
            setTransactions(filteredValues)
            console.log(computeSums(filteredValues))
            // setBalance()
        }
        else if (cc === "yesterday"){
            filteredValues = allTransactions?.filter(el => el?.transactionDate.includes(yesterday?.toDateString()))
            setTransactions(filteredValues)
        }
        else if (cc === "thismonth"){
            filteredValues = allTransactions?.filter(el => new Date(el?.transactionDate).getMonth() === new Date().getMonth())
            setTransactions(filteredValues)
        }
        else{
            filteredValues = allTransactions
            setTransactions(filteredValues)
        }

        let dataLabels = filteredValues?.map(el => el?.name)
        let chartValues = filteredValues?.map(el => el?.value)
        data.labels=[];
        data.datasets.data=[]
        data.labels = dataLabels
        data.datasets.data = chartValues

        let {bal, expensesCount, expensesTotal, incomeCount, incomeTotal} = computeSums(filteredValues)
        setBalance(bal)
        setExpenditureCount(expensesCount)
        setTotalExpenses(expensesTotal)
        setIncomeCount(incomeCount)
        setTotalIncome(incomeTotal)
    }

    return (
        <SafeAreaView style={styles.container}>
                <ScrollView style={{width: "100%"}} showsVerticalScrollIndicator={false} >
                    <View style={styles.headingsView}>
                        <Text style={styles.transactionsText}>Filter Statistics</Text>
                        <View style={styles.dropDownContainer}>
                            {/*<Text style={styles.seeAllText}>Show records for: </Text>*/}
                            <DropDownPicker
                                schema={{
                                    label: 'label',
                                    value: 'value',
                                    icon: 'icon',
                                    parent: 'parent',
                                    selectable: 'selectable',
                                    disabled: 'disabled',
                                }}
                                listMode="MODAL"
                                placeholder="Select a filter"
                                searchable={true}
                                placeholderStyle={{ color: 'black' }}
                                labelStyle={{ color: 'black' }}
                                modalTitle={'Reports filter'}
                                open={showFilterPicker}
                                value={filter}
                                // value={currentGender}
                                mode={'BADGE'}
                                theme={'DARK'}
                                items={filters}
                                setOpen={() => {
                                    setShowFilterPicker(true);
                                }}
                                onClose={() => {
                                    setShowFilterPicker(false);
                                }}
                                // @ts-ignore
                                setValue={async (val: Function) => {
                                    const cc = val();
                                    setFilter(cc)
                                    filterChanged(cc);
                                }}
                                style={{ backgroundColor: '#ffffff', borderColor: '#ffffff', width: 150,marginLeft:50 }}
                            />
                        </View>
                    </View>

                    <BarChart
                        // style={graphStyle}
                        data={data}
                        width={width}
                        height={250}
                        yAxisLabel="$"
                        chartConfig={chartConfig}
                        verticalLabelRotation={30}
                    />

                    <IncomeExpensesSummary income={totalIncome} expenditure={totalExpenses}
                                           incomeCount={incomeCount} expenditureCount={expenditureCount}/>
                    <View style={styles.headingsView}>
                        <Text style={styles.transactionsText}>Top 5 Transactions</Text>
                    </View>
                    {
                        transactions.map((item, index) => {
                            return <TransactionItem key={item?.id} name={item?.name}
                                                    date={DateTime.fromJSDate(new Date(item?.transactionDate)).toLocaleString(DateTime.DATE_FULL)}
                                                    time={DateTime.fromJSDate(new Date(item?.transactionDate)).toLocaleString(DateTime.TIME_WITH_SHORT_OFFSET)}
                                                    amount={item?.value}
                                                    type={item?.type}/>
                        })
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
        paddingTop: 30,
    },
    headingsView: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 15,
        alignItems: "center",
    },
    transactionsText: {
        fontSize: 16,
    },
    seeAllText: {
        fontSize: 12,
    },
    dropDownContainer: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-end",
    },
});

export default Reports;
