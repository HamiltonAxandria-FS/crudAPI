import axios from "axios";
import authHeader from "./auth-header";

const API_URL = 'http://localhost:8000/api/vi/books';

const getAllPrivateBooks = () => {
    return axios.get(`/`, { headers: authHeader() })
}

const booksService = {
    getAllPrivateBooks
}

export default booksService;