import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useMutation, useQuery, useQueryClient } from "react-query";
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

const App = () => {
  const result = useQuery("anecdotes", getAnecdotes, {
    refetchOnWindowFocus: false,
    retry: false,
  });

  const queryClient = useQueryClient();
  const voteMutation = useMutation(putAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
    },
  });

  const handleVote = (anecdote) => {
    voteMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1,
    });
  };

  if (result.isLoading) return <h1>"Loading..."</h1>;
  if (result.isError)
    return <h1>An error has occurred: {result.error.message}</h1>;

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
