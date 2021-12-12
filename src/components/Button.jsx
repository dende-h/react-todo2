import styled from "styled-components";

export const Button = (props) => {
  const { color, value, onClick } = props;
  console.log(color);
  return (
    <EditButtons color={color} onClick={onClick}>
      {value}
    </EditButtons>
  );
};

const EditButtons = styled.button`
  background-color: ${(props) => props.color};
`;
