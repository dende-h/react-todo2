import React, { memo } from "react";
import { Droppable } from "react-beautiful-dnd";

import styled from "styled-components";

export const ColumnDeleteArea = memo((props) => {
  console.log("columnDeleteArea");
  const { deleteColumn } = props;

  return (
    <>
      <Droppable droppableId={deleteColumn.id}>
        {(provided, snapshot) => (
          <DeleteAreaContainer
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            <Title>{deleteColumn.title}</Title>
            {provided.placeholder}
          </DeleteAreaContainer>
        )}
      </Droppable>
    </>
  );
});

//スタイル
const DeleteAreaContainer = styled.div`
  background-color: rgb(185, 114, 243);
  transition: background-color 0.2s ease;
  background-color: ${(props) => props.isDraggingOver && "Red"};
  border-radius: 10px;
  margin: 2px;
  width: 650px;
  height: 80px;
`;

const Title = styled.h1`
  padding: 18px;
  font-weight: bold;
  color: rgb(82, 82, 82);
  text-align: center;
  margin-top: 15px;
`;
