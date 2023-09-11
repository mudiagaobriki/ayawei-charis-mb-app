import axios from "axios";

export async function sendOTP(phoneNumber){
    // eslint-disable-next-line no-useless-catch
    try{
        const res =  await axios.post('https://onos.mudiaga.com.ng/api/send-otp', {phoneNumber})
        //console.log({res})
        //console.log("Data: ", res?.data)
        return res?.data
    }
    catch (e) {
        alert(e)
        throw e
    }
}

export function verifyOTP(phoneNumber, otp){
    // alert("Phone Number: ", phoneNumber)
    // alert(`otp: ${otp}`)
    return axios.post('https://onos.mudiaga.com.ng/api/verify-otp', {phoneNumber, otp}).then((res) => {
        //console.log("Sign In success")
        return res;
    }).catch((err) => {
        console.log({err})
        alert(err?.toString())
    })
}

export function updatePin(id, payload){
    return axios.post('https://onos.mudiaga.com.ng/api/edit-user', {id, payload}).then((res) => {
        //console.log("Sign In success")
        return res.data;
    }).catch((err) => {
        throw err
    })
}

export async function signUpLearner(payload){
    // eslint-disable-next-line no-useless-catch
    try{
        const res =  await axios.post('https://elelohe.dominioncityph.cc/api/learners/new', payload)
        // const res =  await axios.post('https://onos.mudiaga.com.ng/api/learners/new', payload)
        // //console.log({res})
        // //console.log("Data: ", res?.data)
        // //console.log("error: ", {res})
        // if (res?.status === "error"){
        //     return res
        // }
        return res?.data
    }
    catch (e) {
        throw e
    }
}

export async function allLearners(){
    // eslint-disable-next-line no-useless-catch
    try{
        const res =  await axios.get('https://elelohe.dominioncityph.cc/api/learners/all/1/1000')
        // //console.log({res})
        // //console.log("Data: ", res?.data)
        return res?.data
    }
    catch (e) {
        throw e
    }
}
