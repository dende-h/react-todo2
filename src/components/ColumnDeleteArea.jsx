import React from "react";

import styled from "styled-components";

const DeleteAreaContainer = styled.div`
  background-color: rgb(185, 114, 243);
  border-radius: 10px;
  margin: 4px;
  padding-top: 4px;
  text-align: center;
  font-size: 25px;
  width: 646px;
  height: 45px;
`;

const Title = styled.p`
  overflow-wrap: break-word;
  margin-top: 5px;
  font-weight: bold;
  color: rgb(82, 82, 82);
  background-color: rgb(185, 114, 243);
  border-radius: 10px;
  padding-top: 2px;
  text-align: center;
  font-size: 25px;
`;

export const ColumnDeleteArea = (props) => {
  const { deleteColumn } = props;
  return (
    <>
      <DeleteAreaContainer>
        <Title>{deleteColumn.title}</Title>
      </DeleteAreaContainer>
    </>
  );
};
