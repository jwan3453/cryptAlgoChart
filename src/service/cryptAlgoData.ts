import axios from 'axios';

const ApiPrefix = 'http://0.0.0.0:8081';

export const getCryptAlgoList = async () => {
    const list = await axios.request({
        method: 'get',
        url: `${ApiPrefix}/getCryptList`,
    }).catch(err => {
    });
    // 使用ts范型
    return list;
}

export const setCryptAlgoList = async (list: string[]) => {
    const respone = await axios.request({
        method: 'post',
        url: `${ApiPrefix}/postCryptList`,
        data: { list },
    }).catch(error => {
    })
}

export const setStartUpdClient = async (pause: boolean) => {
    const respone = await axios.request({
        method: 'get',
        url: `${ApiPrefix}/start?pause=${pause}`,
    }).catch(error => {
    })
}