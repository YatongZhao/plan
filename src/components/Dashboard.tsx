import { Card } from "antd";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { useLast30Days30DaysSumScoreSum, useLast30DaysCycleAddedScore, useLast30DaysSumScoreSum, useLastCycleAddedScoreSum } from "../hooks";
import * as echarts from 'echarts';

const StyledCard = styled.div`
  background-color: mediumturquoise;
  font-size: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-bottom: 10px;
`;

const Board = styled.div`
  color: white;
  background-color: darkgreen;
  /* border-radius: 3px; */
  text-align: center;
  padding: 0px 15px;
  font-size: 14px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  &:first-of-type {
    margin-right: 1px;
  }
`;

const BoardRow = styled.div`
  display: flex;
  width: 100%;
  margin-top: 1px;
`;

const CanvasBox = styled.div`
  border: 1px solid white;
  border-radius: 25px;
  margin: 10px 15px 5px;
  overflow: hidden;
  width: calc(100% - 30px);
`;

const Canvas = styled.canvas`
  width: 100%;
  display: block;
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
    // const max = sumData.reduce((pre, current) => {
    //   return current[0] > pre ? current[0] : pre;
    // }, 0);
    const option = {
      grid: {
        left: '0',
        right: '30%',
        bottom: '0',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          inverse: true,
          boundaryGap: false,
          data: sumData.map((sum, i) => sum[1]),
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: 'black',
              width: 2,
              opacity: 0,
            }
          },
        }
      ],
      series: [
        {
          name: 'Line 1',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(255, 0, 135)'
              },
              {
                offset: 1,
                color: 'rgb(135, 0, 157)'
              }
            ])
          },
          // emphasis: {
          //   focus: 'series'
          // },
          data: sumData.map((sum, i) => sum[0]),
        },
        {
          name: 'Line 2',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(255, 191, 0)'
              },
              {
                offset: 1,
                color: 'rgb(224, 62, 76)'
              }
            ])
          },
          // emphasis: {
          //   focus: 'series'
          // },
          data: data.map(data => data[0]),
        },
      ]
    };
    // const option = {
    //   polar: {},
    //   angleAxis: {
    //     type: 'value',
    //     startAngle: 90,
    //     splitNumber: 3,
    //     axisLabel: {
    //       show: false,
    //     },
    //     axisTick: {
    //       show: false,
    //     },
    //     axisLine: {
    //       show: false,
    //       lineStyle: {
    //         color: 'white',
    //         width: 10,
    //       }
    //     },
    //     splitLine: {
    //       lineStyle: {
    //         color: 'black',
    //         width: 2,
    //         opacity: 0,
    //       }
    //     },
    //     splitArea: {
    //       show: true,
    //       areaStyle: {
    //         color: 'white',
    //         opacity: 0,
    //       },
    //     },
    //   },
    //   radiusAxis: {
    //     axisLabel: {
    //       show: false,
    //     },
    //     axisTick: {
    //       show: false,
    //     },
    //     axisLine: {
    //       show: false,
    //     },
    //     splitLine: {
    //       show: false,
    //       lineStyle: {
    //         color: 'white',
    //         width: 1,
    //       }
    //     }
    //   },
    //   series: [
    //     {
    //       coordinateSystem: 'polar',
    //       name: 'line',
    //       type: 'line',
    //       data: sumData.map((sum, i) => [max * 0.2, sum[1]]),
    //       stack: 'total',
    //       showSymbol: false,
    //       lineStyle: {
    //         width: 0,
    //         color: 'black',
    //       },
    //       // smooth: true,
    //       areaStyle: {
    //         color: 'mediumturquoise',
    //         opacity: 1,
    //       }
    //     },
    //     {
    //       coordinateSystem: 'polar',
    //       name: 'line',
    //       type: 'line',
    //       data: sumData.map((sum, i) => [max * 0.2, sum[1]]),
    //       stack: 'total',
    //       showSymbol: false,
    //       lineStyle: {
    //         width: 0,
    //         color: 'black',
    //       },
    //       // smooth: true,
    //       areaStyle: {
    //         color: 'black',
    //         opacity: 1,
    //       }
    //     },
    //     {
    //       coordinateSystem: 'polar',
    //       name: 'line',
    //       type: 'line',
    //       data: sumData.map((sum, i) => [sum[0] - data[i][0], sum[1]]),
    //       stack: 'total',
    //       showSymbol: false,
    //       lineStyle: {
    //         width: 0
    //       },
    //       // smooth: true,
    //       areaStyle: {
    //         color: 'red',
    //         opacity: 0.3,
    //       }
    //     },
    //     {
    //       coordinateSystem: 'polar',
    //       name: 'line',
    //       type: 'line',
    //       data: data,
    //       stack: 'total',
    //       showSymbol: false,
    //       lineStyle: {
    //         width: 0
    //       },
    //       // smooth: true,
    //       areaStyle: {
    //         color: 'red',
    //         opacity: 1,
    //       }
    //     },
    //   ]
    // };

    chart.setOption(option);
  }, [ref, sumData, data]);

  return <>
    <StyledCard>
      <CanvasBox>
        <Canvas width={500} height={200} ref={ref} />
        {/* <BoardRow>
          <Board>
              近30天收益：<b>{last30DaysSumScoreSum}</b>
          </Board>
          <Board>
              本周期收益：<b>+{lastCycleAddedScoreSum}</b>
          </Board>
        </BoardRow> */}
      </CanvasBox>
    </StyledCard>
  </>
}
