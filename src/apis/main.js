import axios from "axios";
import { Constants } from "./constant";
import { store } from "../redux/store";
import { logout } from "./controller";

let cancelTokenSource = null;
export const mainWrapper = {
    get,
    post,
    put,
    _delete,
    getAxios,
    upload,
};

async function upload(url, params, callback) {
    handleLogs(url, params);
    try {
        initToken();
        let axiosConfig = {};
        if (callback) {
            axiosConfig = {
                onUploadProgress: (progressEvent) => {
                    let progress =
                        (progressEvent.loaded / progressEvent.total) * 100;
                    callback(progress);
                },
            };
        }
        let response = await axios.post(url, params, axiosConfig);
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
}

async function get(url, params = null) {
    handleLogs(url, params);
    try {
        initToken();
        let response = await axios.get(url, {
            params: params,
        });
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
}

async function post(url, params) {
    handleLogs(url, params);
    try {
        initToken();
        let response = await axios.post(url, params);
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
}

async function put(url, params) {
    handleLogs(url, params);
    try {
        initToken();
        let response = await axios.put(url, params);
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
}

async function _delete(url, params) {
    handleLogs(url, params);
    try {
        initToken();
        let response = await axios.delete(url, {
            data: params,
        });
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
}

async function getAxios(url, params = null) {
    handleLogs(url, params);

    if (cancelTokenSource) {
        cancelTokenSource.cancel();
    }

    cancelTokenSource = axios.CancelToken.source();
    try {
        let response = await axios.get(url, {
            cancelToken: cancelTokenSource.token,
            params: params,
        });

        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
}

function initToken() {
    let user = store.getState()?.user?.user;
    let token = user && user.token ? `Bearer ` + user.token : null;
    if (Constants.debug) {
        console.log("Token:", token);
    }

    if (token) {
        axios.defaults.headers.common["Authorization"] = token;
    }
}

function handleResponse(response) {
    if (Constants.debug) {
        console.log("Response:", response);
    }
    if (response && (response.status === 200 || response.status === 201) && response.data && response.data.success) {
        return response.data;
    } else {
        return handleError({ response: response });
    }
}

async function handleError(error) {
    if (Constants.debug) {
        console.log("Error:", error);
    }
    if (error.response && (error.response.status === 403 || error.response.status === 401)) {
        await logout()
    }

    if (error.response && error.response.data) return error.response.data;
    else return { status: false };
}

function handleLogs(url, params) {
    if (Constants.debug) {
        console.log("-----------------------------------------------");
        console.log("URL: ", url);
        console.log("Request: ", params);
    }
}
