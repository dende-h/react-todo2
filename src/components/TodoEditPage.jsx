import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { InputTodo } from "./InputTodo";

export const TodoEditPage = () => {
  const { state } = useLocation();
  const [todo, setTodo] = useState(state);
  const [isInputTitleIndicateFlag, setIsInputTitleIndicateFlag] = useState(
    false
  );
  const [isInputDetailIndicateFlag, setIsInputDetailIndicateFlag] = useState(
    false
  );
  const onClickTitleEdit = () => {
    setIsInputTitleIndicateFlag(true);
  };
  const onClickDetailEdit = () => {
    setIsInputDetailIndicateFlag(true);
  };
  const onClickTitleSave = () => {
    setIsInputTitleIndicateFlag(false);
  };
  return (
    <>
      <h1>Details of TODO</h1>
      <div>Title</div>
      <div style={{ display: "flex", backgroundColor: "lightgreen" }}>
        <div>
          {isInputTitleIndicateFlag ? (
            <input placeholder="todoのタイトルを入力"></input>
          ) : (
            todo.content
          )}
        </div>
        {isInputTitleIndicateFlag ? (
          <Button color="lightpink" value="save" onClick={onClickTitleSave} />
        ) : (
          <Button
            color="lightblue"
            value="Title edit"
            onClick={onClickTitleEdit}
          />
        )}
      </div>

      <div style={{ display: "flex", backgroundColor: "lightblue" }}>
        <div>Detail</div>
        <Button
          color="lightpink"
          value="Detail edit"
          onClick={onClickDetailEdit}
        />
      </div>
      {isInputDetailIndicateFlag ? <div>Detaile入力フォーム</div> : ""}
    </>
  );
};
