import React, { memo } from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { TodoText } from "./TodoText";
import { useNavigate } from "react-router-dom";
import { useRouteHandleDoubleClick } from "../Hooks/useRouteHndleDoubleClick";

export const ColumnDropArea = memo((props) => {
  const { columns, task } = props;

  return (
    <>
      <DropAreaContainer color={columns.id}>
        <Title>{columns.title}</Title>
        <Droppable droppableId={columns.id}>
          {(provided, snapshot) => (
            <DropArea
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {task.map(
                (todo, index) => (
                  <TodoText key={todo.id} todo={todo} index={index} />
                ) //taskとして受け取った配列をマップ関数で繰り返し呼び出すTodoTextコンポーネントに渡す
              )}
              {provided.placeholder}
            </DropArea>
          )}
        </Droppable>
      </DropAreaContainer>
    </>
  );
});

//スタイル
const DropAreaContainer = styled.div`
  background-color: ${(props) => {
    const columnId = props.color;
    switch (columnId) {
      case "column-2":
        return "rgb(159, 255, 255)";
      case "column-3":
        return "rgb(253, 255, 154)";
      case "column-4":
        return "rgb(255, 193, 255)";
      default:
        break;
    }
  }};
  margin: 1px;
  border-radius: 20px;
  width: 220px;

  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  padding: 2px;
  font-weight: bold;
  color: rgb(82, 82, 82);
`;

const DropArea = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) => props.isDraggingOver && "lightpink"};
  flex-grow: 1;
  min-height: 100px;
`;
