import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const TodoTextContainer = styled.div`
  text-align: left;
  background-color: rgb(255, 248, 239);
  margin: 4px;
  padding-left: 8px;
  padding-right: 8px;
  width: 150px;
  border-radius: 2px;
`;

const text = styled.p`
  overflow-wrap: break-word;
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
          <p>{todo.content}</p>
        </TodoTextContainer>
      )}
    </Draggable>
  );
};
