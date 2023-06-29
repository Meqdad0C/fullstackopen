import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useMutation, useQuery, useQueryClient } from "react-query";
import anecdoteService from "./services/anecdotes";
import NotificationContext from "./NotifcationContext";
import { useContext } from "react";

const App = () => {
  const [message, messageDispatch] = useContext(NotificationContext);
  const queryClient = useQueryClient();
  const result = useQuery("anecdotes", anecdoteService.getAnecdotes, {
    refetchOnWindowFocus: false,
    retry: false,
  });

  const voteMutation = useMutation(anecdoteService.putAnecdote, {
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries("anecdotes");
      messageDispatch({
        type: "SET_MESSAGE",
        payload: `You voted '${anecdote.content}'`,
      });
      setTimeout(() => {
        messageDispatch({ type: "CLEAR_MESSAGE" });
      }, 5000);

    },
    onError: (error) => {
      messageDispatch({
        type: "SET_MESSAGE",
        payload: `An error has occurred: ${error.message}`,
      });
      setTimeout(() => {
        messageDispatch({ type: "CLEAR_MESSAGE" });
      }, 5000);
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
