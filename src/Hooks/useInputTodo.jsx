import { useState } from "react";
import { useRecoilState } from "recoil";
import { todoListState } from "../components/atoms/todoListState";

export const useInputTodo = (isNewText, todoId, result) => {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [todoText, setTodoText] = useState("");
  const [isInvalidInputTodo, setIsInvalidInputTodo] = useState(false);

  //inputにtodoの入力を反映させるchange関数
  const onChangeTodoText = (event) => {
    setTodoText(event.target.value);
  };
  //ボタンをクリックした際に動く関数
  const onClickButton = () => {
    if (todoText === "") {
      setIsInvalidInputTodo(true);
      return;
    } //テキストがなにも入力されてなければメッセフラグがtrueになる
    if (isNewText) {
      //新しいTodoIdsを配列に追加
      const newTodoId = todoId;
      //console.log(newTodoId);
      const todoTextSaveColumn = todoList.dropZone["column-2"].todoIds;
      const newTodoTextSaveCoumn = [...todoTextSaveColumn, newTodoId];
      //console.log(newTodoTextSaveCoumn)

      //新しいdragItemオブジェクトに追加
      const newTodo = { id: newTodoId, content: todoText };
      const todoTextList = todoList.dragItem;
      const newTodoTextList = { ...todoTextList, [newTodoId]: newTodo };

      const newTodoListState = {
        ...todoList,
        dragItem: { ...newTodoTextList },
        dropZone: {
          ...todoList.dropZone,
          "column-2": {
            ...todoList.dropZone["column-2"],
            todoIds: [...newTodoTextSaveCoumn]
          }
        }
      };
      console.log(newTodoListState);
      setTodoList(newTodoListState);
      setIsInvalidInputTodo(false);
      setTodoText("");
      return;
    }

    const newTodo = { id: todoId, content: todoText };

    const newTodoList = {
      ...todoList,

      dragItem: {
        ...todoList.dragItem,
        [todoId]: newTodo
      }
    };
    console.log(newTodoList);
    setTodoList(newTodoList);
    setIsInvalidInputTodo(false);
    setTodoText("");
  };
  return {
    isInvalidInputTodo,
    todoText,
    onClick: onClickButton,
    onChange: onChangeTodoText
  };
};
