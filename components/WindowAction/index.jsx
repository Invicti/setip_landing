import React from "react";
import styled from "styled-components";


function WindowAction() {
  return (
    <WindowAction1>
      <Oval></Oval>
      <Oval1></Oval1>
      <Oval2></Oval2>
    </WindowAction1>
  );
}

const WindowAction1 = styled.div`
  display: flex;
  align-items: flex-start;
  min-width: 38px;
`;

const Oval = styled.div`
  width: 10px;
  height: 9px;
  background-color: var(--alizarin-crimson);
  border-radius: 10px/9px;
`;

const Oval1 = styled.div`
  width: 10px;
  height: 9px;
  margin-left: 4px;
  background-color: #fa6400;
  border-radius: 10px/9px;
`;

const Oval2 = styled.div`
  width: 10px;
  height: 9px;
  margin-left: 4px;
  background-color: var(--sheen-green);
  border-radius: 10px/9px;
`;

export default WindowAction;
