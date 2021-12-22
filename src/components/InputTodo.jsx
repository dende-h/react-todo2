import { Box, Flex, Input } from "@chakra-ui/react";
import React, { memo } from "react";
import styled from "styled-components";
import { v4 } from "uuid";
import { useInputTodo } from "../Hooks/useInputTodo";
import { PrimaryButton } from "./button/PrimaryButton";

export const InputTodo = memo(() => {
  console.log("InputTodo");
  const { onClick, onChange, todoText } = useInputTodo(true, v4());

  return (
    <>
      <Flex
        bg="rgb(252, 235, 170)"
        w="full"
        h="55px"
        text-align="center"
        padding="2"
      >
        <Input
          bg="white"
          variant="outline"
          value={todoText}
          onChange={onChange}
          placeholder="TODOを入力"
        />
        <PrimaryButton onClick={onClick}>付箋を貼る</PrimaryButton>
      </Flex>
    </>
  );
});

//スタイル
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
