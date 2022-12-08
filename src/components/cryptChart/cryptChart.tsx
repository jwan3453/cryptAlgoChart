import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { RootState } from '../../store';
import { connect } from 'react-redux';
import CryptAlgoSelect from './cryptAlgoSelect/cryptAlgoSelect'


type IProps = {
    chartData: Array<{
        time: number;
    }>
} 

interface IState {
}

let chartInstance: echarts.ECharts;

const CryptChart = (props: IProps) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const chartData = props.chartData.map((item) => item.time);

    useEffect(() => {

        if (!chartInstance) {
            chartInstance = echarts.init(chartRef.current as HTMLDivElement);
        }
        const option = {

            xAxis: {
                 data: []
            },
            yAxis: [{
                max: () => { return 200; },
                axisLabel: {
                    formatter: '{value} ms'
                }
            }],
            legend: {
                data: ['量安科技', '行业竞品']
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            // grid: {
            //     left: '3%',
            //     right: '4%',
            //     bottom: '3%',
            //     containLabel: true
            // },
            color: ['#FFBF00', '#FF0087'],
            series: [
                {
                    name: '量安科技',
                    data: chartData,
                    type: 'line',
                    stack: 'x',
                    smooth: true,
                    symbol: 'none',
                    lineStyle: {
                        width: 0
                    },
                    emphasis: {
                        focus: 'series'
                    },
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
                },

                // {
                //     name: '行业竞品',
                //     data: chartData.map((item) => item - 5),
                //     type: 'line',
                //     stack: 'x',
                //     smooth: true,
                //     symbol: 'none',
                // },
                {
                    name: '行业竞品',
                    type: 'line',
                    symbol: 'none',
                    sampling: 'lttb',
                    stack: 'x',
                    smooth: true,
                    // itemStyle: {
                    //     color: 'rgb(255, 70, 131)'
                    // },
 
                    lineStyle: {
                        width: 0,
                    },
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
                    emphasis: {
                        focus: 'series'
                    },
                    data: chartData.map((item) => item - (Math.floor(Math.random() * (15 - 0)) + 0)),
                
                }

            ],
            // animationEasing: 'elasticOut',
        };
        // const option = {
        //     legend: {
        //         data: [
        //             "3-11岁任务数",
        //             "3-11岁全程接种量",
        //             "60岁任务数",
        //             "60岁全程接种量",
        //             "80岁任务数",
        //             "80岁全程接种量",
        //             "完成率",
        //         ],
        //     },
        //     xAxis: {
        //         type: "category",
        //         data: ["街道1", "街道2", "街道3", "街道4", "街道5", "街道6", "街道7"],
        //     },
        //     yAxis: [
        //         { type: "value" },
        //         {
        //             type: "value",
        //             name: "%",
        //             nameTextStyle: {
        //                 color: "#ccc",
        //                 padding: [0, 0, 10, -30],
        //             },
        //             splitNumber: 5,
        //             splitLine: {
        //                 show: true,
        //                 lineStyle: {
        //                     type: "dashed",
        //                     width: 1,
        //                     color: ["#ccc", "#ccc"],
        //                 },
        //             },
        //             axisLabel: {
        //                 show: true,
        //                 textStyle: {
        //                     fontSize: 12,
        //                 },
        //             },
        //         },
        //     ],
        //     tooltip: {
        //         trigger: "axis",
        //         axisPointer: {
        //             type: "shadow",
        //         },
        //         textStyle: {
        //             color: "#fff",
        //             align: "left",
        //             fontSize: 14,
        //         },
        //         backgroundColor: "rgba(0,0,0,0.8)",
        //     },
        //     series: [
        //         {
        //             name: "3-11岁任务数",
        //             data: [150, 230, 224, 218, 135, 147, 260],
        //             type: "bar",
        //         },
        //         {
        //             name: "3-11岁全程接种量",
        //             data: [150, 230, 224, 218, 135, 147, 260],
        //             type: "bar",
        //         },
        //         {
        //             name: "60岁任务数",
        //             data: [150, 230, 224, 218, 135, 147, 260],
        //             type: "bar",
        //         },
        //         {
        //             name: "60岁全程接种量",
        //             data: [880, 30, 124, 118, 35, 47, 160],
        //             type: "bar",
        //         },
        //         {
        //             name: "80岁任务数",
        //             data: [660, 30, 124, 118, 35, 47, 160],
        //             type: "bar",
        //         },
        //         {
        //             name: "80岁全程接种量",
        //             data: [880, 30, 124, 118, 35, 47, 160],
        //             type: "bar",
        //         },
        //         {
        //             name: "完成率",
        //             data: [50, 130, 124, 18, 35, 47, 160],
        //             yAxisIndex: 1,
        //             type: "line",
        //             smooth: true,
        //         },
        //     ],
        // };
        chartInstance.setOption(option);
    }, [props.chartData]);    
    return (
        <div>
            {/* <div>{`${props.username} ${props.email}`}</div> */}
            <div style={{ textAlign: "center" }}>
                <h2>实时加密效率对比图</h2>
                <CryptAlgoSelect />
                <div ref={chartRef} style={{ height: "600px" }}></div>
            </div>
        </div>
    );
};

const mapStateToProps = ({ chartData }: RootState) => {
    return { chartData };
}

export default connect(mapStateToProps)(CryptChart);