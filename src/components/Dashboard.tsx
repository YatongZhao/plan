import { Card } from "antd";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { useLast30DaysCycleAddedScore, useLast30DaysSumScoreSum, useLastCycleAddedScoreSum } from "../hooks";
import * as echarts from 'echarts';

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

const Canvas = styled.canvas`
  width: 100%;
`;

export const Dashboard = () => {
  const lastCycleAddedScoreSum = useLastCycleAddedScoreSum();
  const last30DaysSumScoreSum = useLast30DaysSumScoreSum();
  const ref = useRef(null);

  const data = useLast30DaysCycleAddedScore();

  useEffect(() => {
    console.log(data);
    if (!ref.current) return;

    const chart = echarts.init(ref.current);
    // const data = [];
    // for (let i = 0; i <= 30; i++) {
    //   let theta = i;
    //   let r = 5 * (1 + (theta / 180) * Math.PI);
    //   data.push([r, theta]);
    // }
    const option = {
      polar: {},
      angleAxis: {
        type: 'value',
        startAngle: 90,
        splitNumber: 3,
        axisLabel: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: 'lightgray'
          }
        },
        splitLine: {
          lineStyle: {
            width: 1,
          }
        }
      },
      radiusAxis: {
        axisLabel: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
      },
      series: [
        {
          coordinateSystem: 'polar',
          name: 'line',
          type: 'line',
          data: data,
          stack: 'total',
          showSymbol: false,
          lineStyle: {
            width: 0
          },
          smooth: true,
          areaStyle: {
            color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
              {
                offset: 0,
                color: 'rgb(128, 255, 165)'
              },
              {
                offset: 1,
                color: 'rgb(1, 191, 236)'
              }
            ])
          }
        }
      ]
    };

    chart.setOption(option);
  }, [ref, data]);

  return <>
    <StyledCard bordered={false}>
      <Canvas width={500} height={500} ref={ref} />
      <Board bordered={false}>
          近30天收益：<b>{last30DaysSumScoreSum}</b>
      </Board>
      <Board bordered={false}>
          本周期收益：<b>+{lastCycleAddedScoreSum}</b>
      </Board>
    </StyledCard>
  </>
}
