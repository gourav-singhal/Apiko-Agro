import axios from 'axios';
import { getTokenHeaderObject } from './authorization';
import APIAddresses from './urls';

const makeRequest = (type, url, data) =>
  axios({
    url,
    data,
    method: type,
    headers: getTokenHeaderObject(),
  });


/**
  Provide Request for server
**/
const get = url => makeRequest('get', url);
const post = (url, data) => makeRequest('post', url, data);
const put = (url, data) => makeRequest('put', url, data);
const remove = (url, data) => makeRequest('delete', url, data);

export { APIAddresses, get, post, put, remove };
