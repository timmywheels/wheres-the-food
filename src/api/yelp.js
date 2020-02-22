import axios from 'axios';
import getEnvVars from '../../environment';
const { yelp_api_key } = getEnvVars();

export default axios.create({
    baseURL: 'https://api.yelp.com/v3/businesses',
    headers: {
        Authorization: `Bearer ${yelp_api_key}`
    }
});


