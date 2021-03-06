import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { DragDropContext } from "react-beautiful-dnd";
import { ColumnDropArea } from "./components/ColumnDropArea";
import styled from "styled-components";
import { ColumnDeleteArea } from "./components/ColumnDeleteArea";
import { uuid } from "uuidv4";

//import { uuid } from "uuidv4";

const Container = styled.div`
  width: 200px;
  display: flex;
  vertical-align: top;
  text-align: center;
`;

const DragDropObject = {
  dragItem: {
    "todo-1": { id: "todo-1", content: "todo-sample1" },
    "todo-2": { id: "todo-2", content: "todo-sample2" },
    "todo-3": { id: "todo-3", content: "todo-sample3" },
    "todo-4": { id: "todo-4", content: "todo-sample4" }
  },
  dropZone: {
    "column-1": { id: "column-1", title: "Delete" },
    "column-2": {
      id: "column-2",
      title: "Todo",
      todoIds: ["todo-1", "todo-2", "todo-3", "todo-4"]
    },
    "column-3": { id: "column-3", title: "In progress", todoIds: [] },
    "column-4": { id: "column-4", title: "Done", todoIds: [] }
  },
  dropZoneOrder: ["column-1", "column-2", "column-3", "column-4"]
};

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [todoList, setTodoList] = useState(DragDropObject);

  //inputにtodoの入力を反映させるchange関数
  const onChangeTodoText = (event) => {
    setTodoText(event.target.value);
  };
  //ボタンをクリックした際に動く関数
  const onClickButton = () => {
    if (todoText === "") return; //テキストがなにも入力されてなければ何もしない
    const newTodoList = () => {
      //新しいTodoIdsを配列に追加
      const newTodoId = uuid();
      console.log(newTodoId);
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
  // "column-1"
  const deleteZoneId = todoList.dropZoneOrder.filter((columnId, index) => {
    return index === 0;
  });

  //  { id: "column-1", title: "Delete", todoIds: [] }
  const deleteColumn = todoList.dropZone[deleteZoneId];

  //ColumnDropAreaコンポーネントに渡すpropsの定義のためのフィルター
  //["column-2", "column-3", "column-4"]
  const columnsId = todoList.dropZoneOrder.filter((columnsId, index) => {
    return index !== 0;
  });

  return (
    <>
      <h1>TODOボード</h1>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickButton}
      />
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
