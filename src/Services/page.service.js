import axios from "axios";
import ApiConfig from '../../app/api.json'

const API_URL = ApiConfig.api_base_url;

const getAllPages = () => {
  return axios.get(API_URL);
};

const getPage = (name) => {
  return axios.get(API_URL + name);
};


const deletePage = (name) => {
  return axios.delete(API_URL + name);
};
const createPage = (page) => {
  return axios.post(API_URL,page);
};

const editPage = (page) => {
  return axios.put(API_URL + page.name,page);
};

const PageService = {
  getAllPages,
  getPage,
  createPage,
  deletePage ,
  editPage
}

export default PageService;
