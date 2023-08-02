import { styled } from "styled-components";
import { week } from "../utility";

const Week = () => {
  return (
    <>
      {week.map((item, index) => (
        <WeekHead key={index}>{item}</WeekHead>
      ))}
    </>
  );
};

export default Week;

const WeekHead = styled.div`
  background-color: #ffffff;
  font-size: 13px;
  padding: 10px;
  text-align: center;
`;
