import "./App.css";
import { styled } from "styled-components";
import { useState, useRef } from "react";
import { endOfMonth, startOfMonth } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import { DayEvent } from "./models";
import { range, week, month } from "./utility";
import CalenderHead from "./components/CalenderHead";
import Week from "./components/Week";
import StartDays from "./components/StartDays";
import EndDays from "./components/EndDays";

function App() {
  const [eventDate, setEventDate] = useState<DayEvent[]>([]);

  //1일이 시작될 때  몇 칸이 띄여지는 지
  const [startFixedDay, setStartFixedDay] = useState(
    startOfMonth(new Date()).getDay()
  );

  //달이 끝날 때 마지막 줄에서 몇 칸을 차지하는 지
  const [endFixedDay, setEndFixedDay] = useState(
    7 - endOfMonth(new Date()).getDay()
  );

  //현재 월
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  );
  //현재 년도
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );

  //특정 달이 몇일로 끝나는 지
  const daysInMonth = (currentYear: number, currentMonth: number): number => {
    return endOfMonth(new Date(currentYear, currentMonth)).getDate();
  };

  //날짜 비교
  const areDatesTheSame = (first: Date, second: Date) => {
    return (
      first.getFullYear() === second.getFullYear() &&
      first.getMonth() === second.getMonth() &&
      first.getDate() === second.getDate()
    );
  };

  //next 클릭
  const nextMonth = () => {
    if (currentMonth < 11) {
      setCurrentMonth((prv) => prv + 1);
      setStartFixedDay(
        startOfMonth(new Date(currentYear, currentMonth + 1)).getDay()
      );

      setEndFixedDay(
        7 - endOfMonth(new Date(currentYear, currentMonth + 1)).getDay()
      );
    } else {
      setCurrentMonth(0);
      setCurrentYear((prv) => prv + 1);
      setStartFixedDay(startOfMonth(new Date(currentYear + 1, 0)).getDay());
      setEndFixedDay(7 - endOfMonth(new Date(currentYear + 1, 0)).getDay());
    }
  };

  //prev 클릭
  const prevMonth = () => {
    if (currentMonth >= 0) {
      setCurrentMonth((prv) => prv - 1);
      setStartFixedDay(
        startOfMonth(new Date(currentYear, currentMonth - 1)).getDay()
      );

      setEndFixedDay(
        7 - endOfMonth(new Date(currentYear, currentMonth - 1)).getDay()
      );
    } else {
      setCurrentMonth(11);
      setCurrentYear((prv) => prv - 1);
      setStartFixedDay(startOfMonth(new Date(currentYear - 1, 11)).getDay());
      setEndFixedDay(7 - endOfMonth(new Date(currentYear - 1, 11)).getDay());
    }
  };

  const addEvent = (date: Date) => {
    const res = prompt("title");

    if (res) {
      setEventDate([...eventDate, { date, title: res, id: uuidv4() }]);
    }
  };

  //드래그이벤트
  const dragItem = useRef<string>("");
  const dragOverItem = useRef<Date>(new Date());

  // = onDragEnd
  const handleSort = () => {
    const arr = eventDate.map((item) => {
      return item.id === dragItem.current
        ? { ...item, date: dragOverItem.current }
        : item;
    });

    setEventDate(arr);
  };

  return (
    <Container>
      <CWrap>
        <CalenderHead
          nextMonth={nextMonth}
          prevMonth={prevMonth}
          currentMonth={currentMonth}
          currentYear={currentYear}
        />
        <GridWrap>
          <Week />
          <StartDays startFixedDay={startFixedDay} />
          {range(daysInMonth(currentYear, currentMonth)).map((day, index) => (
            <WeekBody
              active={areDatesTheSame(
                new Date(),
                new Date(currentYear, currentMonth, day)
              )}
              key={index}
              onClick={() => addEvent(new Date(currentYear, currentMonth, day))}
              onDragEnter={() => {
                dragOverItem.current = new Date(currentYear, currentMonth, day);
              }}
              onDragEnd={handleSort}
            >
              {" "}
              {day}
              {eventDate.map(
                (item, index) =>
                  areDatesTheSame(
                    new Date(currentYear, currentMonth, day),
                    item.date
                  ) && (
                    <EventDiv
                      draggable
                      key={item.id}
                      onDragStart={() => {
                        dragItem.current = item.id;
                      }}
                    >
                      {item.title}
                    </EventDiv>
                  )
              )}
            </WeekBody>
          ))}

          <EndDays endFixedDay={endFixedDay} />
        </GridWrap>
      </CWrap>
    </Container>
  );
}

export default App;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: #ffffff;
`;

const CWrap = styled.div`
  display: table;
  margin: 0 auto;
  margin-top: 100px;
  width: 700px;
  background-color: #ffffff;
`;

const GridWrap = styled.div`
  display: table-cell;
  border-collapse: collapse;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border: 1px solid #e2e2e2;
  border-top: none;
`;

const WeekBody = styled.div<{ active: boolean }>`
  padding: 5px;
  display: table-cell;
  font-size: 13px;
  box-shadow: 1px 0 0 0 #e2e2e2, 0 1px 0 0 #e2e2e2, 1px 1px 0 0 #e2e2e2,
    0px 0 0 0 #e2e2e2 inset, 0 1px 0 0 #e2e2e2 inset;
  background-color: ${(props) => (props.active === true ? "#ecfff1" : null)};
  /* 백그라운드 색상이 빠져나옴 */
  border-left: 1px solid
    ${(props) => (props.active === true ? "#e2e2e2" : "transparent")};
  height: 100px;
  cursor: pointer;
`;

const EventDiv = styled.div`
  background-color: #ffb8b0;
  color: white;
  border-radius: 3px;
  margin-top: 3px;
  padding: 3px;
`;
