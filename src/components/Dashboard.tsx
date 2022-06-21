import { Card } from "antd";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { useLast30Days30DaysSumScoreSum, useLast30DaysCycleAddedScore, useLast30DaysSumScoreSum, useLastCycleAddedScoreSum } from "../hooks";
import * as echarts from 'echarts';

const StyledCard = styled(Card)`
  background-color: mediumturquoise;
  /* background-color: white; */
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
  color: white;
  background-color: darkgreen;
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
  const sumData = useLast30Days30DaysSumScoreSum();

  useEffect(() => {
    console.log(sumData);
    if (!ref.current) return;

    const chart = echarts.init(ref.current);
    const max = sumData.reduce((pre, current) => {
      return current[0] > pre ? current[0] : pre;
    }, 0);
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
          show: false,
          lineStyle: {
            color: 'white',
            width: 10,
          }
        },
        splitLine: {
          lineStyle: {
            color: 'white',
            width: 2,
            opacity: 0.2,
          }
        },
        splitArea: {
          show: true,
          areaStyle: {
            color: 'white',
            opacity: 0,
          },
        },
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
        splitLine: {
          show: false,
          lineStyle: {
            color: 'white',
            width: 1,
          }
        }
      },
      series: [
        {
          coordinateSystem: 'polar',
          name: 'line',
          type: 'line',
          data: sumData.map((sum, i) => [max * 0.5, sum[1]]),
          stack: 'total',
          showSymbol: false,
          lineStyle: {
            width: 0,
            color: 'black',
          },
          // smooth: true,
          areaStyle: {
            color: 'mediumturquoise',
            opacity: 1,
          }
        },
        {
          coordinateSystem: 'polar',
          name: 'line',
          type: 'line',
          data: sumData.map((sum, i) => [5, sum[1]]),
          stack: 'total',
          showSymbol: false,
          lineStyle: {
            width: 0,
            color: 'black',
          },
          // smooth: true,
          areaStyle: {
            color: 'black',
            opacity: 1,
          }
        },
        {
          coordinateSystem: 'polar',
          name: 'line',
          type: 'line',
          data: sumData.map((sum, i) => [sum[0] - data[i][0], sum[1]]),
          stack: 'total',
          showSymbol: false,
          lineStyle: {
            width: 0
          },
          // smooth: true,
          areaStyle: {
            color: 'red',
            opacity: 0.3,
          }
        },
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
          // smooth: true,
          areaStyle: {
            color: 'red',
            opacity: 1,
          }
        },
        {
          coordinateSystem: 'polar',
          name: 'line',
          type: 'line',
          data: sumData.map((sum, i) => [5, sum[1]]),
          stack: 'total',
          showSymbol: false,
          lineStyle: {
            width: 0,
            color: 'black',
          },
          // smooth: true,
          areaStyle: {
            color: 'black',
            opacity: 1,
          }
        },
      ]
    };

    chart.setOption(option);
  }, [ref, sumData, data]);

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
