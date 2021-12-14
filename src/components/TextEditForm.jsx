import styled from "styled-components";
import { useInputTodo } from "../Hooks/useInputTodo";

export const TextEditForm = (props) => {
  const { buttonName, placeholder, id } = props;
  const { onChange, onClick, todoText } = useInputTodo(false, id);

  return (
    <>
      <InputArea>
        <InputTodoArea
          value={todoText}
          onChange={onChange}
          placeholder={placeholder}
        />
        <ButtonStyle onClick={onClick}>{buttonName}</ButtonStyle>
      </InputArea>
    </>
  );
};

//スタイル
const InputArea = styled.div`
  width: 646px;
  height: 40px;

  text-align: center;
  margin: 4px;
  border-radius: 10px;
  padding-top: 3px;
`;

const ButtonStyle = styled.button`
  border-radius: 5px;
  border: none;
  padding: 4px 16px;
  margin-top: 4px;
  background-color: rgb(252, 135, 154);
  color: white;
  &:hover {
    cursor: pointer;
    background-color: orange;
    color: lightslategray;
  }
`;

const InputTodoArea = styled.input`
  width: 300px;
  border-radius: 5px;
  border: none;
  padding: 6px 16px;
  outline: none;
  margin-top: 4px;
  margin-right: 6px;
`;
