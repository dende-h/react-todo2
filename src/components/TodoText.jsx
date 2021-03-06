import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const TodoTextContainer = styled.div`
  border: 1px solid lightgray;
  border-radius: 4px;
  padding: 10px;
  margin-left: 8px;
  margin-bottom: 8px;
  background-color: ${(props) => (props.isDragging ? "lightgreen" : "white")};
  width: 150px;
  min-height: 20px;
  word-break: break-all;
  display: flex;
`;

export const TodoText = (props) => {
  const { todo, index } = props;
  return (
    <Draggable draggableId={todo.id} index={index}>
      {(provided, snapshot) => (
        <TodoTextContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {todo.content}
        </TodoTextContainer>
      )}
    </Draggable>
  );
};
