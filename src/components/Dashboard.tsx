import { Card } from "antd";
import styled from "styled-components";
import { useLast30DaysSumScoreSum, useLastCycleAddedScoreSum } from "../hooks";

const StyledCard = styled(Card)`
  padding-top: 20px;
  background-color: mediumturquoise;
  & > .ant-card-body {
    font-size: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
`;

const Board = styled(Card)`
  border-radius: 3px;
  margin: 1px;
  width: 200px;
  text-align: center;
  & > .ant-card-body {
    padding: 0px 15px;
  }
`;

export const Dashboard = () => {
  const lastCycleAddedScoreSum = useLastCycleAddedScoreSum();
  const last30DaysSumScoreSum = useLast30DaysSumScoreSum();
  
  return <>
    <StyledCard bordered={false}>
      <Board bordered={false}>
          近30天收益：<b>{last30DaysSumScoreSum}</b>
      </Board>
      <Board bordered={false}>
          本周期收益：<b>+{lastCycleAddedScoreSum}</b>
      </Board>
    </StyledCard>
  </>
}
