import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-dbdf6.firebaseio.com/'
});

export default instance;