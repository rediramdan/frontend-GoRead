import axios from 'axios';
import qs from 'qs'

const BASE_URL  = process.env.REACT_APP_API_BASE_URL
const API_TOKEN = localStorage.getItem('token')

export const getAllBooks = (props) => {
    const {search,sort,asc,requestPage,limit} = props
    const requestData = {
        search,sort,asc,requestPage,limit
    }
    return axios.get(`${BASE_URL}/book?${qs.stringify(requestData)}`)
}

export const getBookById = (bookId) => {
    return axios.get(`${BASE_URL}/book/${bookId}`)
}

export const putBook = (body, id) => {
    const data = new FormData()
    data.append('title', body.title) 
    data.append('description', body.description) 
    console.log(body)
    if(body.image){data.append('image', body.image)} 
    data.append('id_author', body.id_author) 
    data.append('id_genre', body.id_genre) 
    console.log(data)
    return axios.put(`${BASE_URL}/book/${id}`,data,{
        headers:{
            'Authorization' : `Bearer ${API_TOKEN}`,
            'Content-Type' : 'multipart/form-data',
            'Type' : 'formData'
        }
    })
}
export const getAuthor = () => {
    return axios.get(`${BASE_URL}/author`)
}

export const putAuthor = (body, id) => {
    return axios.put(`${BASE_URL}/author/${id}`,qs.stringify(body),{
        headers:{
            'Authorization' : `Bearer ${API_TOKEN}`,
            'Content-Type' : 'application/x-www-form-urlencoded'
        }
    })
}

export const deleteAuthor = (id) => {
    return axios.delete(`${BASE_URL}/author/${id}`,{
        headers:{
            'Authorization' : `Bearer ${API_TOKEN}`,
            'Content-Type' : 'application/x-www-form-urlencoded'
        }
    })
}

export const postAuthor = (body) => {
    console.log(body)
    return axios.post(`${BASE_URL}/author`,qs.stringify(body),{
        headers:{
            'Authorization' : `Bearer ${API_TOKEN}`,
            'Content-Type' : 'application/x-www-form-urlencoded'
        }
    })
}

export const getGenre = () => {
    return axios.get(`${BASE_URL}/genre`)
}

export const putGenre = (body, id) => {
    return axios.put(`${BASE_URL}/genre/${id}`,qs.stringify(body),{
        headers:{
            'Authorization' : `Bearer ${API_TOKEN}`,
            'Content-Type' : 'application/x-www-form-urlencoded'
        }
    })
}

export const deleteGenre = (id) => {
    return axios.delete(`${BASE_URL}/genre/${id}`,{
        headers:{
            'Authorization' : `Bearer ${API_TOKEN}`,
            'Content-Type' : 'application/x-www-form-urlencoded'
        }
    })
}

export const postGenre = (body) => {
    console.log(body)
    return axios.post(`${BASE_URL}/genre`,qs.stringify(body),{
        headers:{
            'Authorization' : `Bearer ${API_TOKEN}`,
            'Content-Type' : 'application/x-www-form-urlencoded'
        }
    })
}

export const postLogin = (body) => {
    return axios.post(`${BASE_URL}/auth/login`,qs.stringify(body))
}

export const postLogout = (body) => {
    return axios.post(`${BASE_URL}/auth/logout`,qs.stringify(body))
}

export const refreshToken = (body) => {
    return axios.post(`${BASE_URL}/auth/token`,qs.stringify(body))
}