import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { DragDropContext } from "react-beautiful-dnd";
import { ColumnDropArea } from "./components/ColumnDropArea";
import styled from "styled-components";
import { ColumnDeleteArea } from "./components/ColumnDeleteArea";
import { uuid } from "uuidv4";
import { DragDropObject } from "./DragDropObject";
import { Link } from "react-router-dom";

//import { uuid } from "uuidv4";

export const Home = () => {
  //stateの定義
  const [todoText, setTodoText] = useState("");
  const [todoList, setTodoList] = useState(DragDropObject);
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
    const newTodoList = () => {
      //新しいTodoIdsを配列に追加
      const newTodoId = uuid();
      //console.log(newTodoId);
      const todoTextSaveColumn = todoList.dropZone["column-2"].todoIds;
      todoTextSaveColumn.push(newTodoId);

      //新しいdragItemオブジェクトに追加
      const newTodo = { id: newTodoId, content: todoText };
      const newTodoTextList = todoList.dragItem;
      newTodoTextList[newTodoId] = newTodo;
      console.log(todoList);
      return todoList;
    };
    const newTodoListState = newTodoList();
    setTodoList(newTodoListState);
    setIsInvalidInputTodo(false);
    setTodoText("");
  };

  //DragDropContextのpropsドラッグが終了したときの処理
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      //console.log(destination.droppableId);
      //console.log(source.droppableId);
      return;
    }

    const start = todoList.dropZone[source.droppableId];
    const finish = todoList.dropZone[destination.droppableId];
    const del = todoList.dropZone[deleteZoneId];

    if (start === finish) {
      const newTaskIds = Array.from(start.todoIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        todoIds: newTaskIds
      };

      const newState = {
        ...todoList,
        dropZone: {
          ...todoList.dropZone,
          [newColumn.id]: newColumn
        }
      };
      setTodoList(newState);
      return;
    }
    if (finish === del) {
      //console.log(destination.droppableId);
      const startTaskIds = Array.from(start.todoIds);
      startTaskIds.splice(source.index, 1);
      const newStart = {
        ...start,
        todoIds: startTaskIds
      };
      //console.log(newStart);
      const newState = {
        ...todoList,
        dropZone: {
          ...todoList.dropZone,
          [newStart.id]: newStart
        }
      };
      setTodoList(newState);
      return;
    }
    // console.log(finish);
    const startTaskIds = Array.from(start.todoIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      todoIds: startTaskIds
    };
    const finishTaskIds = Array.from(finish.todoIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      todoIds: finishTaskIds
    };
    const newState = {
      ...todoList,
      dropZone: {
        ...todoList.dropZone,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    };
    setTodoList(newState);
  };

  //ColumnDeleteAreaコンポーネントに渡すpropsの定義
  //ColumnDropAreaコンポーネントに渡すpropsの定義
  // "column-1"=deleteZonId
  //["column-2", "column-3", "column-4"]=columunsId
  const [deleteZoneId, ...columnsId] = todoList.dropZoneOrder;

  //  { id: "column-1", title: "Delete", todoIds: [] }
  const deleteColumn = todoList.dropZone[deleteZoneId];

  return (
    <>
      <h1>TODOボード</h1>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickButton}
      />
      {isInvalidInputTodo && (
        <p style={{ color: "red" }}>TODOが入力されてません！！</p>
      )}
      <DragDropContext onDragEnd={onDragEnd}>
        <ColumnDeleteArea key={deleteZoneId} deleteColumn={deleteColumn} />

        <main>
          <Container>
            {columnsId.map((columnId) => {
              //マップ関数で繰り返しコンポーネントをリターンしそれぞれのカラムを表示させる
              const columns = todoList.dropZone[columnId]; //columns=[column-2{...},column-3{...},column-4{...}]
              const task = columns.todoIds.map(
                (todoIds) => todoList.dragItem[todoIds]
              ); //task=[todo-1{...},todo-2{},todo-3{},todo-4{...}] [] [] 3つの配列
              return (
                <ColumnDropArea
                  key={columns.id}
                  columns={columns}
                  task={task}
                  className="title"
                />
              );
            })}
          </Container>
        </main>
      </DragDropContext>
      <Link to="/todoEdit">Todo編集ページ</Link>
      <h4>Read me</h4>
      【主な実装機能】
      <br />
      TODO入力フォームにタスクを入力して`付箋を貼る`でTODOエリアに追加
      <br />
      作業中はドラッグ＆ドロップでDOINGエリアに付箋を移動
      <br />
      終わったタスクはDONEエリアに付箋を移動
      <br />
      タスクを消去したい場合はDELETEエリアにドロップで削除
      <br />
      タスクを編集したい場合はタスクのテキストをダブルクリックで編集
      <br />
      編集後に入力エリア外をクリックすれば編集確定
    </>
  );
};
//スタイル
const Container = styled.div`
  width: 200px;
  display: flex;
  vertical-align: top;
  text-align: center;
`;
