import React, { useRef, useState } from 'react';
import { Select, Button } from 'antd'
import type { SelectProps } from 'antd'
import { connect } from 'react-redux';
import { RootState, AppDispatch } from '../../../store';
import { useDispatch } from 'react-redux';
import './index.less'
import { asyncSetCryptAlgoList } from '../../../store/slice/cryptAlgoListSlice';
import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons';
import { setStartUpdClient } from '../../../service/cryptAlgoData';

type IProps = {
    cryptAlgoList: Array<string>
} 

const options: SelectProps['options'] = [];
for (let i = 10; i < 36; i++) {
    options.push({
        label: i.toString(36) + i,
        value: i.toString(36) + i,
    });
}

const CryptAlgoSelect = (prop: IProps) => {
    const dispatch: AppDispatch = useDispatch();
    const selectedAlgos = useRef<string[]>([]);
    const options: SelectProps['options'] = prop.cryptAlgoList.map((item) => { 
        return {
            label: item,
            value: item,
        };
    });

    const [start, setStart] = useState(false);
    
    const handleChange = (value: string[]) => {
        selectedAlgos.current = value;
    }
    const updateCryptAlgoList = () => {
        dispatch(asyncSetCryptAlgoList(selectedAlgos.current));
    }

    const startAndStopUdpClient = () => {
        setStartUpdClient(!start);
        setStart(!start);
    }

    return (
        <>
            <div className={'select'}>
                <Select
                    mode='multiple'
                    allowClear
                    style={{ width: '100%' }}
                    className={'select-input'}
                    placeholder='请选择对应算法'
                    onChange={handleChange}
                    options={options}
                />
                <Button type='primary' onClick={updateCryptAlgoList} >
                    获取数据
                </Button>

                <Button
                    type='primary'
                    shape="circle"
                    onClick={startAndStopUdpClient}
                    icon={start ? <CaretRightOutlined /> : <PauseOutlined />}
                    className='playBtn'
                    
                />

            </div>
        </>    
    )
 }


const mapStateToProps = ({ cryptAlgoListData }: RootState) => {
    return { cryptAlgoList: cryptAlgoListData.list };
}

export default connect(mapStateToProps)(CryptAlgoSelect);