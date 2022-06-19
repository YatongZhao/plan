import { Card } from "antd";
import styled from "styled-components";

const StyledCard = styled(Card)`
  background-color: mediumturquoise;
  & > .ant-card-body {
    /* height: 50vh; */
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
  return <>
    <StyledCard bordered={false}>
      <Board bordered={false}>
          本月收益：<b>1375</b>
      </Board>
      <Board bordered={false}>
          今日收益：<b>+75</b>
      </Board>
    </StyledCard>
  </>
}
