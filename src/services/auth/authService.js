import axios from "axios";
import {API_URL} from "../../assets/constants";

export async function newUser(firstName, lastName, email, password){
    // eslint-disable-next-line no-useless-catch
    console.log({firstName, lastName, email, password})
    console.log("url: ", `${API_URL}/register`)
    try{
        const res =  await axios.post(`${API_URL}/register`,
            {firstName, lastName, email, password})
        //console.log({res})
        console.log("Data: ", res?.data)
        return res?.data
    }
    catch (e) {
        throw e
    }
}

export async function login(email, password){
    // eslint-disable-next-line no-useless-catch
    console.log({email, password})
    try{
        const res =  await axios.post(`${API_URL}/login`,
            {email, password})
        //console.log({res})
        console.log("Data: ", res?.data)
        return res?.data
    }
    catch (e) {
        throw e
    }
}

export async function editUser(id, payload){
    // eslint-disable-next-line no-useless-catch
    // console.log({firstName, lastName, email, password})
    try{
        const res =  await axios.post(`${API_URL}/edit-user`,
            {id, payload})
        //console.log({res})
        console.log("Data: ", res?.data)
        return res?.data
    }
    catch (e) {
        throw e
    }
}

export async function getUserDetails(email){
    // eslint-disable-next-line no-useless-catch
    // console.log({firstName, lastName, email, password})
    try{
        const res =  await axios.get(`${API_URL}/user/${email}`)
        //console.log({res})
        console.log("Data: ", res?.data)
        return res?.data
    }
    catch (e) {
        throw e
    }
}


export async function newProfile(user, email, address){
    // eslint-disable-next-line no-useless-catch
    try{
        const res =  await axios.post(`${API_URL}/profiles/new`,
            {user, email, address})
        //console.log({res})
        //console.log("Data: ", res?.data)
        return res?.data
    }
    catch (e) {
        throw e
    }
}

export async function sendEmailOTP(email){
    // eslint-disable-next-line no-useless-catch
    try{
        const res =  await axios.post(`${API_URL}/send-email-otp`,
            {email})
        //console.log({res})
        //console.log("Data: ", res?.data)
        return res?.data
    }
    catch (e) {
        throw e
    }
}

export async function verifyEmailOTP(email,otp){
    // eslint-disable-next-line no-useless-catch
    try{
        const res =  await axios.post(`${API_URL}/verify-email-otp`,
            {email,otp})
        //console.log({res})
        //console.log("Data: ", res?.data)
        return res?.data
    }
    catch (e) {
        throw e
    }
}

export async function editProfile(email, payload){
    // eslint-disable-next-line no-useless-catch
    try{
        const res =  await axios.post(`${API_URL}/profiles/edit`,
            {email, payload})
        //console.log({res})
        //console.log("Data: ", res?.data)
        return res?.data
    }
    catch (e) {
        throw e
    }
}

export async function createCustomerAccountNumber(email, phone, first_name, last_name, middle_name, bvn){
    // eslint-disable-next-line no-useless-catch
    try{
        const res =  await axios.post(`${API_URL}/paystack/customer-and-virtual-account`,
            {email, phone, first_name, last_name, middle_name, bvn})
        //console.log({res})
        //console.log("Data: ", res?.data)
        return res?.data
    }
    catch (e) {
        throw e
    }
}

export async function getProfile(user){
    console.log("User received: ", {user})
    // eslint-disable-next-line no-useless-catch
    try{
        const res =  await axios.get(`${API_URL}/profiles/details/${user}`)
        //console.log({res})
        console.log("In user profile function: ", res?.data)
        return res?.data?.data
    }
    catch (e) {
        throw e
    }
}

export async function getUserAccountDetails(username){
    // eslint-disable-next-line no-useless-catch
    try{
        const res =  await axios.get(`${API_URL}/paystack/virtual-account-list`)
        //console.log({res})
        console.log("Paystack Data: ", res?.data?.data[0])
        let data =  res?.data?.data
        let selectedUser = data?.find(el => el?.customer?.phone === username)

        return selectedUser;
    }
    catch (e) {
        throw e
    }
}

export async function getUserTransactions(username){
    // eslint-disable-next-line no-useless-catch
    try{
        const res =  await axios.get(`${API_URL}/paystack/all-transactions`)
        //console.log({res})
        //console.log("Data: ", res?.data)
        let data =  res?.data?.data
        let selectedUser = data?.filter(el => el?.customer?.phone === username)

        return selectedUser;
    }
    catch (e) {
        throw e
    }
}

export async function getUserTransactionsAndTransfers(username){
    // eslint-disable-next-line no-useless-catch
    try{
        const output = []

        const res =  await axios.get(`${API_URL}/paystack/all-transactions`)
        //console.log({res})
        //console.log("Data: ", res?.data)
        let data =  res?.data?.data
        let selectedUser = data?.filter(el => el?.customer?.phone === username)

        selectedUser.forEach((item, index) => {
            output.push({
                amount: item?.amount,
                other: item?.authorization?.bin + item?.authorization?.last4,
                bank: item?.authorization?.bank,
                type: "Deposit",
                status: item?.status,
                time: item?.paidAt
            })
        })

        let transfers =  await axios.get(`${API_URL}/paystack/list-transfers`)

        transfers = transfers?.data?.data;

        console.log("Transfers: ", {transfers})

        let userTransfers = transfers.filter(el => el?.reason.includes(`from ${username}`))

        console.log({userTransfers})

        userTransfers.forEach((item, index) => {
            output.push({
                amount: item?.amount,
                other: item?.recipient?.name,
                bank: item?.authorization?.bank,
                type: "Transfer",
                status: item?.status,
                time: item?.createdAt
            })
        })

        return output;
    }
    catch (e) {
        throw e
    }
}

export async function getUserBalance(username, accountNumber){
    // eslint-disable-next-line no-useless-catch
    try{
        const res =  await axios.get(`${API_URL}/paystack/all-transactions`)
        //console.log({res})
        console.log("All Transactions : ", res?.data)
        let data =  res?.data?.data
        let selectedUser = data?.filter(el => el?.customer?.phone === username)

        const inflows = selectedUser?.filter(el => el?.metadata?.receiver_account_number === accountNumber)

        // get totalInflows
        const totalInflows = inflows.reduce((accumulator, object) => {
            return accumulator + object.amount;
        }, 0);
        //console.log({inflows})
        //console.log({totalInflows})

        // get transfers
        let transfers =  await axios.get(`${API_URL}/paystack/list-transfers`)

        transfers = transfers?.data?.data;

        console.log("Transfers: ", {transfers})

        let userTransfers = transfers.filter(el => el?.reason.includes(`from ${username}`))

        console.log({userTransfers})

        // get totalOutflows
        const totalOutflows = userTransfers.reduce((accumulator, object) => {
            return accumulator + object.amount;
        }, 0);

        return totalInflows - totalOutflows;
    }
    catch (e) {
        throw e
    }
}

export async function VerifyAccount(bankCode, accountNumber){
    // eslint-disable-next-line no-useless-catch
    try{
        // verify the account details
        console.log("I am here")
        console.log({bankCode, accountNumber})
        const res =  await axios.get(`${API_URL}/paystack/verify-account/${bankCode}/${accountNumber}`)
        console.log({res})
        //console.log("Data: ", res?.data)
        let data =  res?.data

        return data;
    }
    catch (e) {
        throw e
    }
}

export async function getBankList(){
    // eslint-disable-next-line no-useless-catch
    try{
        const res =  await axios.get(`${API_URL}/paystack/banks-list`)
        //console.log({res})
        //console.log("Data: ", res?.data)
        let data =  res?.data?.data

        return data;
    }
    catch (e) {
        throw e
    }
}

export async function TransferMoney(bankCode, accountNumber, accountName, amount, reason){
    // eslint-disable-next-line no-useless-catch
    try{
        // check if the receiver is a recipient
        const res =  await axios.get(`${API_URL}/paystack/transfer-recipients-list`)
        //console.log({res})
        //console.log("All Accounts: ", res?.data?.data)
        let receiver = null
        let data =  res?.data?.data
        let recipientExists = data.find(el => (el?.details?.account_number === accountNumber && el?.details?.bank_code === bankCode))
        receiver = recipientExists

        // if no recipient with those details, create one
        if (!recipientExists){
            const recipient =  await axios.post(`${API_URL}/paystack/create-transfer-recipient`,
                {name: accountName, account_number: accountNumber, bank_code: bankCode })
            //console.log({recipient})
            //console.log("New Recipient: ", recipient)
            receiver =  recipient?.data?.data
        }

        //console.log({receiver})

        // initiate the transfer
        const transferInitiated =  await axios.post(`${API_URL}/paystack/initiate-transfer`,
            {reason, amount: Number(amount)*100, recipient: receiver?.recipient_code })

        //console.log("Message: ",transferInitiated?.data)
        //console.log(Number(amount))

        setTimeout(() => alert("Transfer initiated"), 3000)

        return receiver;
    }
    catch (e) {
        throw e
    }
}

export async function getPaymentServices(){
    // console.log("User received: ", {user})
    // eslint-disable-next-line no-useless-catch
    try{
        const config = {
            headers:{
                "Api-Key": "pub-52bkcIDA7QZ3T5J9VGCjuoGrsCKyq79U",
                "Api-Token": "sec-nUkBmgb8H8ayCVrLyz9XXy5bne3yO4VE"
            }
        }

        const res =  await axios.get(`https://api.ufitpay.com/v1/services`, config)
        //console.log({res})
        console.log("Payment hehehe: ", res?.data)
        return res?.data?.data
    }
    catch (e) {
        throw e
    }
}

export async function getVendorList(id){
    // console.log("User received: ", {user})
    // eslint-disable-next-line no-useless-catch
    try{
        const config = {
            headers:{
                "Api-Key": "pub-52bkcIDA7QZ3T5J9VGCjuoGrsCKyq79U",
                "Api-Token": "sec-nUkBmgb8H8ayCVrLyz9XXy5bne3yO4VE"
            }
        }

        const res =  await axios.get(`https://api.ufitpay.com/v1/vendors/?service_id=${id}`, config)
        //console.log({res})
        console.log("Vendor hehehe: ", res?.data)
        return res?.data?.data
    }
    catch (e) {
        throw e
    }
}

export async function getPackageList(id){
    // console.log("User received: ", {user})
    // eslint-disable-next-line no-useless-catch
    try{
        const config = {
            headers:{
                "Api-Key": "pub-52bkcIDA7QZ3T5J9VGCjuoGrsCKyq79U",
                "Api-Token": "sec-nUkBmgb8H8ayCVrLyz9XXy5bne3yO4VE"
            }
        }

        const res =  await axios.get(`https://api.ufitpay.com/v1/packages/?vendor_id=${id}`, config)
        //console.log({res})
        console.log("Package List hehehe: ", res?.data)
        return res?.data?.data
    }
    catch (e) {
        throw e
    }
}

export async function servicePriceListEnquiry(id){
    // console.log("User received: ", {user})
    // eslint-disable-next-line no-useless-catch
    try{
        const config = {
            headers:{
                "Api-Key": "pub-52bkcIDA7QZ3T5J9VGCjuoGrsCKyq79U",
                "Api-Token": "sec-nUkBmgb8H8ayCVrLyz9XXy5bne3yO4VE"
            }
        }

        const payload =  {service_id: id}
        console.log({config})
        console.log({payload})

        const res =  await axios.post(`https://api.ufitpay.com/v1/price_list`, payload, config)
        //console.log({res})
        console.log("Service Price List Enquiry hehehe: ", res)
        return res?.data
    }
    catch (e) {
        console.log("Error: ", e)
        throw e
    }
}

export async function validatePayerAccount(account_number, vendor_id){
    // console.log("User received: ", {user})
    // eslint-disable-next-line no-useless-catch
    try{
        const config = {
            headers:{
                "Api-Key": "pub-52bkcIDA7QZ3T5J9VGCjuoGrsCKyq79U",
                "Api-Token": "sec-nUkBmgb8H8ayCVrLyz9XXy5bne3yO4VE"
            }
        }

        const payload =  {account_number, vendor_id}

        const res =  await axios.post(`https://api.ufitpay.com/v1/account_validate`, payload, config)
        //console.log({res})
        console.log("Validate Payer Account hehehe: ", res)
        return res?.data?.data
    }
    catch (e) {
        throw e
    }
}

export async function initiateBillPayment(service_id, account_number, vendor_id, amount, package_id=''){
    // console.log("User received: ", {user})
    // eslint-disable-next-line no-useless-catch
    try{
        const config = {
            headers:{
                "Api-Key": "pub-52bkcIDA7QZ3T5J9VGCjuoGrsCKyq79U",
                "Api-Token": "sec-nUkBmgb8H8ayCVrLyz9XXy5bne3yO4VE"
            }
        }

        const payload =  {account_number, vendor_id, service_id, amount, package_id}

        const res =  await axios.post(`https://api.ufitpay.com/v1/pay`, payload, config)
        //console.log({res})
        console.log("Payment Initiated: ", res)
        return res?.data
    }
    catch (e) {
        throw e
    }
}

// export function verifyOTP(phoneNumber, otp){
//     return axios.post('http://192.168.166.154/api/verify-otp', {phoneNumber, otp}).then((res) => {
//         //console.log("Sign In success")
//         return res.data;
//     }).catch((err) => {
//         throw err
//     })
// }
//
// export function updatePin(id, payload){
//     return axios.post('http://192.168.166.154/api/edit-user', {id, payload}).then((res) => {
//         //console.log("Sign In success")
//         return res.data;
//     }).catch((err) => {
//         throw err
//     })
// }
//
// export async function signUpLearner(payload){
//     // eslint-disable-next-line no-useless-catch
//     try{
//         const res =  await axios.post('https://elelohe.dominioncityph.cc/api/learners/new', payload)
//         // const res =  await axios.post('http://192.168.166.154/api/learners/new', payload)
//         // //console.log({res})
//         // //console.log("Data: ", res?.data)
//         // //console.log("error: ", {res})
//         // if (res?.status === "error"){
//         //     return res
//         // }
//         return res?.data
//     }
//     catch (e) {
//         throw e
//     }
// }
//
// export async function allLearners(){
//     // eslint-disable-next-line no-useless-catch
//     try{
//         const res =  await axios.get('https://elelohe.dominioncityph.cc/api/learners/all/1/1000')
//         // //console.log({res})
//         // //console.log("Data: ", res?.data)
//         return res?.data
//     }
//     catch (e) {
//         throw e
//     }
// }
