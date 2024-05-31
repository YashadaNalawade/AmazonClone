import axios from "axios";

// Axios is a library that serves to create HTTP requests that are present externally

const instance = axios.create({
    baseURL : 'http://localhost:5001/clone-9cf65/us-central1/api'  // the api (cloud function) url 

});

export default instance;