import { Card, Progress } from "antd";
import styled from "styled-components";

const StyledCard = styled(Card)`
  background-color: mediumturquoise;
  .ant-card-body {
    height: 50vh;
    font-size: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    overflow: hidden;
  }
`;
const StyledProgress = styled(Progress)`
  transform: scaleX(0.78);
  border: 1px solid black;
  border-left-width: 10px;
  border-right-width: 10px;
  padding: 0px 2px;
  border-radius: 5px;
`;

export const Dashboard = () => {
  return <StyledCard bordered={false}>
    Under Control!
    <StyledProgress
      strokeWidth={20}
      strokeLinecap="butt"
      showInfo={false}
      steps={100}
      percent={30}
      // strokeColor={COLORS}
      strokeColor={'black'}
      trailColor="transparent"
      size="small"
    />
  </StyledCard>
}
