const axios = require('axios');

const AUTH_URL = 'http://20.244.56.144/evaluation-service/auth';
const BASE_URL = 'http://20.244.56.144/evaluation-service/stocks';

let TOKEN = '';

async function getAuthToken() {
    if (TOKEN) return TOKEN;

    const response = await axios.post(AUTH_URL, {
        email: "cb.en.u4cse22524@cb.students.amrita.edu",
        name: "koduru neelakanteswara mohan gupta",
        rollNo: "cb.en.u4cse22524",
        accessCode: "SwuuKE",
        clientID: "612f78a5-bcb8-4506-9862-0eafef7d4534",
        clientSecret: "gztEuWKFersYUJHC"
    });

    TOKEN = response.data.access_token;
    return TOKEN;
}

exports.fetchStockHistory = async (ticker, minutes) => {
    const token = await getAuthToken();
    const res = await axios.get(`${BASE_URL}/${ticker}?minutes=${minutes}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.data;
};
