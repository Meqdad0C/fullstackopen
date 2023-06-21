import axios from "axios";

const url = '/api/persons'

const getAll = () => {
    const respose = axios.get(url)
    return respose.then(response => response.data)

}

const addPerson = (newPerson) => {
    const request = axios.post(url, newPerson)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`${url}/${id}`)
    return request.then(response => response)
}

const updatePhone = (id, newObject) => {
    const request = axios.put(`${url}/${id}`, newObject)
    return request.then(response => response.data)
}

export default { getAll, addPerson, deletePerson, updatePhone}