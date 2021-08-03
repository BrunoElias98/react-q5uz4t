import axios from "axios";

import { API_BASE_URL } from 'src/config';

import authService from 'src/services/authService';

class ManagerApi {

    constructor(endpointSufix = false) {

        this.endpoint = API_BASE_URL;
        if (endpointSufix) {
            this.endpoint = this.endpoint + endpointSufix;
        }

        /*
        @TODO: Depende de socketIo para funcionar, pois conforme a ação de quem está conectado, o cache precisa ser limpo para todos
        Fazer cache backedn na API
        */
        this.canCache = false;
        this.cacheApi = {};
        localStorage.removeItem('managerApiCache/customer');
        let localCacheApi = localStorage.getItem('managerApiCache' + this.endpoint)
        if (localCacheApi) {
            this.cacheApi = JSON.parse(localCacheApi);
        }

    }

    hasCache = (cacheKey) => {
        if (!this.canCache) {
            return false;
        }
        return this.cacheApi[cacheKey] ? true : false;
    }

    getCache = (cacheKey) => {
        if (!this.canCache) {
            return false;
        }
        if (this.hasCache(cacheKey)) {
            return new Promise((resolve, reject) => {
                return resolve(this.cacheApi[cacheKey]);
            })
        }
        return new Promise((resolve, reject) => {
            return reject();
        })
    }
    setCache = (cacheKey, cacheData) => {
        if (!this.canCache) {
            return false;
        }
        this.cacheApi[cacheKey] = cacheData;
        localStorage.setItem('managerApiCache' + this.endpoint, JSON.stringify(this.cacheApi));
    }
    clearCache = () => {
        localStorage.removeItem('managerApiCache' + this.endpoint);
    }

    getList = (filters = {}) => {

        let cacheKey = 'getList-' + JSON.stringify(filters);
        if (this.hasCache(cacheKey)) {
            return this.getCache(cacheKey);
        }

        let request = axios({
            method: "get",
            url: this.endpoint,
            headers: this.headers,
            params: filters
        });

        request.then((response) => {
            if (response.status === 200) {
                this.setCache(cacheKey, response)
            }
        })

        return request;

    };

    get = id => {
        if (!id) return this.getMissingIdError();

        let cacheKey = 'get-' + id;
        if (this.hasCache(cacheKey)) {
            return this.getCache(cacheKey);
        }

        let request = axios({
            method: "get",
            url: `${this.endpoint}/${id}`,
            headers: this.headers
        });

        request.then((response) => {
            if (response.status === 200) {
                this.setCache(cacheKey, response)
            }
        })

        return request;
    };

    post = body => {
        this.clearCache();

        let headers = this.headers;

        return axios({
            method: "post",
            url: this.endpoint,
            headers: headers,
            data: body
        });
    };

    put = (id, body) => {
        if (!id) return this.getMissingIdError();

        this.clearCache();

        return axios({
            method: "post",
            url: this.endpoint + '/' + id,
            headers: this.headers,
            data: body
        });
    };

    delete = id => {
        if (!id) return this.getMissingIdError();

        this.clearCache();

        return axios({
            method: "delete",
            url: `${this.endpoint}/${id}`,
            headers: this.headers
        });
    };

    get headers() {
        const headers = { "Content-Type": "application/json" };

        const accessToken = authService.getAccessToken();

        if (accessToken)
            headers["Authorization"] = 'Bearer ' + accessToken;

        return headers;
    }

    getMissingIdError = () => ({
        data: {
            success: false,
            message: "Esse método não pode ser utilizado sem um ID"
        }
    });

    getMethodNotAvailable = () => ({
        data: {
            success: false,
            message: "Método não disponível"
        }
    });
}

export default ManagerApi;
