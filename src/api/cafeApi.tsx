import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

/* const baseURL = 'http://localhost:8080/api'; */
const baseURL = 'https://cafe-bkend.herokuapp.com/api';

const cafeApi = axios.create({ baseURL });

cafeApi.interceptors.request.use(
    async(config)=>{
        
        const data = await AsyncStorage.getItem('data');
        if(data){
            config.headers!['x-token'] = JSON.parse(data).token;
        }
        return config;
    }
)

export default cafeApi;