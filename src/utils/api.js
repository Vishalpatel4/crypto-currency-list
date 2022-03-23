import axios from 'axios';

// const BASE_URL = process.env.REACT_APP_API_URL
const BASE_URL = 'https://api.coingecko.com/api/v3'

console.log(BASE_URL, 'url')



const makeRequest = async (url, method = "get", data = {}, onSuccess = () => { }, onError = () => { }, responseType, addAuthorizationHeader = true, addFormDataHeader = false) => {
    try {

        let headers = {}

        if (addFormDataHeader) {
            headers = { ...headers, }
        }

        const config = {
            method: method,
            url: url,
            headers: headers,
            baseURL: BASE_URL,
        }

        if (method === 'get') {
            config.params = data
        } else {
            config.data = data
        }

        const res = await axios(config);
        onSuccess(res.data);
        // console.log('from after success in api', res)
    } catch (err) {

        onError(err);
        console.log('from api err', err)
        if (err.response) {

            if (err.response.status === 401) {
                window.location.assign('/')
            }
            if (err.response.status === 403) {
                window.location.assign('/')
            }
            // client received an error response (5xx, 4xx)
        } else if (err.request) {
            console.log(err.request, 'request')
            // client never received a response, or request never left
        } else {
            console.log(err, 'other')
        }
    }
}

export const cryptoList = (onSuccess, onError = () => { }) => {
    makeRequest(`/coins/markets?vs_currency=inr`, 'get', {}, onSuccess, onError)
}
