import axios from 'axios';


const API = axios.create({
  baseURL: 'http://localhost:8000', 
});

const AUTH_URL = 'http://20.244.56.144/evaluation-service/auth';
const BASE_URL = 'http://20.244.56.144/evaluation-service/stocks';


let tokenCache: string | null = null;

interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}


const credentials = {
	"email": "cb.en.u4cse22524@cb.students.amrita.edu",
	"name": "koduru neelakanteswara mohan gupta",
	"rollNo": "cb.en.u4cse22524",
	"accessCode": "SwuuKE",
	"clientID": "612f78a5-bcb8-4506-9862-0eafef7d4534",
	"clientSecret": "gztEuWKFersYUJHC"
};


export async function getAuthToken(): Promise<string> {
  if (tokenCache) return tokenCache;

  const response = await axios.post<AuthResponse>(AUTH_URL, credentials);
  tokenCache = response.data.access_token;
  return tokenCache;
}


export const getStockAverage = (ticker: string, minutes: number) =>
  API.get(`/stocks/${ticker}?minutes=${minutes}&aggregation=average`);


export async function getCorrelationData(stock1: string, stock2: string, minutes: number) {
  const token = await getAuthToken();

  return axios.get(`${BASE_URL}/corr`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { stock1, stock2, mins: minutes }
  });
}
