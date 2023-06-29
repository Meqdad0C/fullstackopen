import axios from "axios";

const baseURL = "http://localhost:3001/anecdotes";

const getAnecdotes = async () => {
    const response = await axios.get(baseURL);
    return response.data;
};

export const postAnecdote = async (anecdote) => {
    const response = await axios.post(baseURL, anecdote);
    return response.data;
};

export const putAnecdote = async (anecdote) => {
    const response = await axios.put(`${baseURL}/${anecdote.id}`, anecdote);
    return response.data;
};

export default { getAnecdotes, postAnecdote, putAnecdote };