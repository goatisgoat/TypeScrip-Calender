import { styled } from "styled-components";

interface Props {
  endFixedDay: number;
}

const EndDays: React.FC<Props> = ({ endFixedDay }) => {
  return (
    <>
      {" "}
      {[...Array(endFixedDay - 1).keys()].map((item, index) => (
        <WeekDay key={index}> {""}</WeekDay>
      ))}
    </>
  );
};

export default EndDays;

const WeekDay = styled.div`
  padding: 5px;
  display: table-cell;
  font-size: 13px;
  box-shadow: 1px 0 0 0 #e2e2e2, 0px 1px 0 0 #e2e2e2, 1px 1px 0 0 #e2e2e2,
    0px 0 0 0 #e2e2e2 inset, 0 1px 0 0 #e2e2e2 inset;
  height: 100px;
`;
