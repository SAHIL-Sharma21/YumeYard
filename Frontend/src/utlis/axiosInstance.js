//making axios serivecs to fetch the data.

import axios from "axios";
import useAuth from "./useAuth";


const BaseURL = 'http://localhost:4000/api/v1/';


//making api services.
const ApiService = () => {
    const { accessToken } = useAuth();

    const axiosInstance = axios.create({
        baseURL: BaseURL,
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${accessToken}`
        }
    });

    return {
        getData: (endpoint) => {
            return axiosInstance.get(endpoint);
        },
        postData: (endpoint, data) => {
            return axiosInstance.post(endpoint, data);
        },
        updateData: (endpoint, data) => {
            return axiosInstance.patch(endpoint, data);
        },
        deleteData: (endpoint) => {
            return axiosInstance.delete(endpoint);
        }
    }

}

export default ApiService;