import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { DragDropContext } from "react-beautiful-dnd";
import { ColumnDropArea } from "./components/ColumnDropArea";
import styled from "styled-components";
import { ColumnDeleteArea } from "./components/ColumnDeleteArea";
import { Link } from "react-router-dom";
import { useDragEnd } from "./Hooks/useDragEnd";

//import { uuid } from "uuidv4";

export const Home = () => {
  const {
    todoList,
    onDragEnd,
    deleteZoneId,
    deleteColumn,
    columnsId
  } = useDragEnd();
  console.log(todoList);

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
              console.log(task);
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
