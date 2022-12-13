import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { RootState, AppDispatch } from '../../store';
import { connect, useDispatch } from 'react-redux';
import CryptAlgoSelect from './cryptAlgoSelect/cryptAlgoSelect'

type IProps = {
    chartData: {
        [key: string]: Array<{
            name: string;
            timestamp: number,
            cryptTime: number,
        }>;
    } ;
    selectedList: string[]
} 

let chartInstance: echarts.ECharts;

const colorPattern = [
    '#FFBF00', '#FF0087', '#004159', '#65A8C4', '#AAcee2', '#8c65d3', '#9A93EC', '#0052A5', '#413BF7', '#00c590', '#000000'
];

const CryptChart = (props: IProps) => {
    const { selectedList, chartData } = props; 
    const chartRef = useRef<HTMLDivElement>(null);
    const dispatch: AppDispatch = useDispatch();
    const optionSeries = Object.keys(chartData).map((cryptAlgoItem, index) => {
        return {
            name: cryptAlgoItem,
            data: chartData[cryptAlgoItem].map((item) => item.cryptTime) ,
            type: 'line',
            stack: 'x',
            smooth: true,
            symbol: 'none',
            lineStyle: {
                width: 1.5
            },
            emphasis: {
                focus: 'series'
            },
        }
    })
    useEffect(() => {
        if (!chartInstance) {
            chartInstance = echarts.init(chartRef.current as HTMLDivElement);
        }
        const option = {
            xAxis: {
                 data: []
            },
            yAxis: [{
                max: () => { return 2000; },
                axisLabel: {
                    formatter: '{value} 次'
                }
            }],
            legend: {
                data: Object.keys(chartData),
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
            color: colorPattern.slice(0,10),
            series: optionSeries,
        };
        chartInstance.setOption(option);
    }, [props.chartData]);   

    // 如果重新选择了需要展示的算法，图标数据清除下， 不然会之前数据的残留
    useEffect(() => {
        chartInstance.clear();
    }, [selectedList])
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

const mapStateToProps = ({ chartData, cryptAlgoListData }: RootState) => {
    return {
        chartData,
        selectedList: cryptAlgoListData.selectedList
    };
}

export default connect(mapStateToProps)(CryptChart);