import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    transactions: [],
    balance: 0,
    totalIncome: 0,
    totalExpenses: 0,
    incomeCount: 0,
    expensesCount: 0,
    totalTransactions: 0,
    token: null
}

const financesSlice = createSlice({
    name: 'finances',
    initialState,
    reducers: {
        setUserTransactions: (state, action) => {
            state.transactions = action.payload;
        },
        setUserBalance: (state, action) => {
            state.balance = action.payload;
        },
        setUserTotalIncome: (state, action) => {
            state.totalIncome = action.payload;
        },
        setUserTotalExpenses: (state, action) => {
            state.totalExpenses = action.payload;
        },
        setUserIncomeCount: (state, action) => {
            state.incomeCount = action.payload;
        },
        setUserExpensesCount: (state, action) => {
            state.expensesCount = action.payload;
        },
        setUserTotalTransactions: (state, action) => {
            state.totalTransactions = action.payload;
        },
    }
});

export const { setUserTransactions, setUserBalance, setUserTotalTransactions, setUserTotalExpenses, setUserExpensesCount,
        setUserIncomeCount, setUserTotalIncome } = financesSlice.actions;

export const selectBalance = (state) => state.finances.balance;
export const selectTransactions = (state) => state.finances.transactions;
export const selectTotalIncome = (state) => state.finances.totalIncome;
export const selectTotalExpenses = (state) => state.finances.totalExpenses;
export const selectIncomeCount = (state) => state.finances.incomeCount;
export const selectExpensesCount = (state) => state.finances.expensesCount;
export const selectTotalTransactions = (state) => state.finances.totalTransactions;

export default financesSlice.reducer;
