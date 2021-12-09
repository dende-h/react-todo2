import { useLocation } from "react-router-dom";

export const TodoEditPage = () => {
  const { state } = useLocation();
  console.log(state);

  return <h1>{state.content}</h1>;
};
