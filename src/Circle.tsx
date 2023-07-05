import { useState } from "react";
import { styled } from "styled-components";

interface CircleProps {
  bgColor: string;
  borderColor?: string;
  text?: string;
}

// 2. Container 변수인 styled.div에다가 Circle 함수에서 받은 bgColor를 넘겨주기위해 ContainerProps 도 만들어야 함...
const Container = styled.div<CircleProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border: 10px solid ${(props) => props.borderColor};
`;

// 1. App.tsx에서 bcColor 변수를 받기 위해서 CircleProps interface를 만들고,
function Circle({ bgColor, borderColor, text = "default text" }: CircleProps) {
  const [counter, setCounter] = useState();
  return (
    <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
      {text}
    </Container>
  );
}

export default Circle;
