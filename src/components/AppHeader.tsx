import styled from "styled-components"
import { useLast30DaysSumScoreSum, useLastCycleAddedScoreSum } from "../hooks";
import logo from '../logo.svg';

const Wrapper = styled.div`
  box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
  padding: 7px 15px 5px;
  /* background-color: white; */
  background-color: mediumturquoise;
  margin-top: -4px;
  display: flex;
  justify-content: center;
`;

const SpanBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;
const Span = styled.div`
  height: 15px;
  font-weight: 700;
  display: flex;
  align-items: center;
`;

export const AppHeader = () => {
    const lastCycleAddedScoreSum = useLastCycleAddedScoreSum();
    const last30DaysSumScoreSum = useLast30DaysSumScoreSum();

    return <Wrapper>
        <img src={logo} alt="logo" width={30} />
        {/* <SpanBox>
            <Span>{last30DaysSumScoreSum}</Span>
            <Span>+{lastCycleAddedScoreSum}</Span>
        </SpanBox> */}
    </Wrapper>
}
