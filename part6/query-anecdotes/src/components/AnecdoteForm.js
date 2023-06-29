import { useMutation, useQueryClient } from "react-query";
import anecdoteService from "../services/anecdotes";
import { useContext } from "react";
import NotificationContext from "../NotifcationContext";
const AnecdoteForm = () => {
  const [message, messageDispatch] = useContext(NotificationContext);
  const queryClient = useQueryClient();
  const createAnecdoteMutation = useMutation(anecdoteService.postAnecdote, {
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries("anecdotes");
      messageDispatch({
        type: "SET_MESSAGE",
        payload: `You created '${anecdote.content}'`,
      });
      setTimeout(() => {
        messageDispatch({ type: "CLEAR_MESSAGE" });
      }, 5000);
    },
    onError: (error) => {
      messageDispatch({
        type: "SET_MESSAGE",
        payload: `An error has occurred: ${JSON.parse(JSON.stringify(error.response.data)).error}`,
      });
      setTimeout(() => {
        messageDispatch({ type: "CLEAR_MESSAGE" });
      }, 5000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    createAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
