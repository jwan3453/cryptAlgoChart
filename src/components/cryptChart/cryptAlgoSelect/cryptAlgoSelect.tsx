import React from 'react';
import { Select } from 'antd'
import type { SelectProps } from 'antd'
import styles from './index.less'

const options: SelectProps['options'] = [];
for (let i = 10; i < 36; i++) {
    options.push({
        label: i.toString(36) + i,
        value: i.toString(36) + i,
    });
}

const handleChange = (value: string[]) => {
    console.log(`select ${value}`);
}

 const CryptAlgoSelect = () => {

     return (
         <>
             <div className={styles.select}>
                <Select
                    mode='multiple'
                    allowClear
                    style={{ width: '100%' }}
                    className={styles.selectInput}
                    placeholder='请选择对应算法'
                    defaultValue={['a10']}
                    onChange={handleChange}
                    options={options}
                 />
             </div>
         </>    
     )
 }

export default CryptAlgoSelect;