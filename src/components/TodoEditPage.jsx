import { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { todoListState } from "./atoms/todoListState";
import { BsPencilSquare } from "react-icons/bs";
import { TextEditForm } from "./TextEditForm";

export const TodoEditPage = memo(() => {
  console.log(TodoEditPage);
  const todoList = useRecoilValue(todoListState);
  const { id } = useParams();
  const [fetchId, setFetchId] = useState();

  useEffect(() => {
    setFetchId(id);
  }, [id]);

  const selectedTodo = { ...todoList.dragItem[fetchId] };
  const [isInputTitleIndicateFlag, setIsInputTitleIndicateFlag] = useState(
    false
  );
  const [isInputDetailIndicateFlag, setIsInputDetailIndicateFlag] = useState(
    false
  );
  const onClickTitleEdit = () => {
    setIsInputTitleIndicateFlag(!isInputTitleIndicateFlag);
  };
  const onClickDetailEdit = () => {
    setIsInputDetailIndicateFlag(!isInputDetailIndicateFlag);
  };

  return (
    <>
      <h1>Details of TODO</h1>
      <TodoDetailsContainer>
        <div style={{ display: "flex", textAlign: "center" }}>
          <div>{selectedTodo.content}</div>
          <div>
            <BsPencilSquare onClick={onClickTitleEdit} />
          </div>
        </div>
        {isInputTitleIndicateFlag ? (
          <TextEditForm
            id={fetchId}
            buttonName={"変更する"}
            placeholder={"変更を入力してください"}
          />
        ) : (
          ""
        )}
        <div style={{ display: "flex" }}>
          <div>Detail</div>
          <div>
            <BsPencilSquare onClick={onClickDetailEdit} />
          </div>
        </div>
        {isInputDetailIndicateFlag ? <div>Detaile入力フォーム</div> : ""}
      </TodoDetailsContainer>
    </>
  );
});

const TodoDetailsContainer = styled.div`
  width: 650px;
  min-height: 100px;
  background-color: rgb(252, 235, 170);
  text-align: center;
  margin: 4px;
  border-radius: 10px;
  padding-top: 3px;
`;
