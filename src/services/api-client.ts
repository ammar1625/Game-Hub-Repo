import axios , {AxiosError} from "axios";


export default axios.create({
    baseURL:"https://api.rawg.io/api",
    params:{
        key:"9372272704ec493c8edbbc8c4ac46406",
    }
});


export {AxiosError} ;