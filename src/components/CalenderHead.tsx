import { styled } from "styled-components";
import { month } from "../utility";

interface Props {
  nextMonth(): void;
  prevMonth(): void;
  currentMonth: number;
  currentYear: number;
}

const CalenderHead: React.FC<Props> = ({
  nextMonth,
  prevMonth,
  currentMonth,
  currentYear,
}) => {
  return (
    <Header>
      <HeaderBtn onClick={prevMonth}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 320 512"
        >
          <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
        </svg>
      </HeaderBtn>
      {month[currentMonth]} {currentYear}
      <HeaderBtn onClick={nextMonth}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 320 512"
        >
          <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
        </svg>
      </HeaderBtn>
    </Header>
  );
};

export default CalenderHead;

const Header = styled.div`
  width: 100%;
  height: 60px;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border: 1px solid #e2e2e2;
  border-bottom: none;
  background-color: #ffffff;
`;

const HeaderBtn = styled.button`
  border-radius: 50%;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;
