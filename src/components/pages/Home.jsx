import { InputTodo } from "../InputTodo";
import { DragDropContext } from "react-beautiful-dnd";
import { ColumnDropArea } from "../ColumnDropArea";
import styled from "styled-components";
import { ColumnDeleteArea } from "../ColumnDeleteArea";
import { useDragEnd } from "../../Hooks/useDragEnd";
import { ReadMe } from "../ReadMe";
import { useRecoilValue } from "recoil";
import { todoListState } from "../atoms/todoListState";
import { AspectRatio, Image } from "@chakra-ui/react";

export const Home = () => {
  console.log("Home");
  const todoList = useRecoilValue(todoListState);
  const { onDragEnd, deleteZoneId, deleteColumn, columnsId } = useDragEnd();

  return (
    <>
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
      <AspectRatio maxW="400px" ratio={4 / 3}>
        <Image src="../src/image/reactjs.jpg" alt="image" objectFit="cover" />
      </AspectRatio>
    </>
  );
};
//スタイル
const Container = styled.div`
  display: flex;
  vertical-align: top;
  text-align: center;
`;
