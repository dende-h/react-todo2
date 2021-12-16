import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { DragDropContext } from "react-beautiful-dnd";
import { ColumnDropArea } from "./components/ColumnDropArea";
import styled from "styled-components";
import { ColumnDeleteArea } from "./components/ColumnDeleteArea";
import { useDragEnd } from "./Hooks/useDragEnd";
import { ReadMe } from "./components/ReadMe";
import { useRecoilState } from "recoil";
import { todoListState } from "./components/atoms/todoListState";

export const Home = () => {
  console.log("Home");
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const { onDragEnd, deleteZoneId, deleteColumn, columnsId } = useDragEnd();

  return (
    <>
      <h1>TODOボード</h1>
      <InputTodo />
      <DragDropContext onDragEnd={onDragEnd}>
        <ColumnDeleteArea key={deleteZoneId} deleteColumn={deleteColumn} />

        <main>
          <Container>
            {columnsId.map((columnId) => {
              //マップ関数で繰り返しコンポーネントをリターンしそれぞれのカラムを表示させる
              const columns = todoList.dropZone[columnId]; //columns=[column-2{...},column-3{...},column-4{...}]
              const task = columns.todoIds.map(
                (todoIds) => todoList.dragItem[todoIds]
              );
              //task=[todo-1{...},todo-2{},todo-3{},todo-4{...}] [] [] 3つの配列
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
      <ReadMe />
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
