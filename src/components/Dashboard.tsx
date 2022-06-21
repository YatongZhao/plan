import { Card } from "antd";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { useLast30Days30DaysSumScoreSum, useLast30DaysCycleAddedScore, useLast30DaysSumScoreSum, useLastCycleAddedScoreSum } from "../hooks";
import * as echarts from 'echarts';

const StyledCard = styled.div`
  background-color: mediumturquoise;
  /* background-color: white; */
  /* & > .ant-card-body { */
    font-size: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  /* } */
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
      // color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
      // title: {
      //   text: 'Gradient Stacked Area Chart'
      // },
      // tooltip: {
      //   trigger: 'axis',
      //   axisPointer: {
      //     type: 'cross',
      //     label: {
      //       backgroundColor: '#6a7985'
      //     }
      //   }
      // },
      // legend: {
      //   data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5']
      // },
      // toolbox: {
      //   feature: {
      //     saveAsImage: {}
      //   }
      // },
      grid: {
        left: '0',
        right: '0',
        bottom: '0',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
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
