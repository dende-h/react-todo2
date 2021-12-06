import React from "react";
import styled from "styled-components";

const InputArea = styled.div`
  width: 646px;
  height: 40px;
  background-color: rgb(252, 235, 170);
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

export const InputTodo = (props) => {
  const { todoText, onChange, onClick } = props;
  return (
    <InputArea>
      <InputTodoArea
        value={todoText}
        onChange={onChange}
        placeholder="TODOを入力"
      />
      <ButtonStyle onClick={onClick}>付箋を貼る</ButtonStyle>
    </InputArea>
  );
};
