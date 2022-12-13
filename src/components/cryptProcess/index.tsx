import './index.less'
const CryptProcess = () => {
    return (
        <>
            <div className='cryptProcess'>
                <div className='keygen'>keygen</div>
                <div className={'doubleArrow'}>
                    <div className='upArrow'></div>
                    <div className='downArrow'></div>
                    <div className='skAndPk'>(sk, pk)</div>
                </div>
                <div className='sendPk'>
                    <div className='alice'>Alice</div>
                    <div className='horizenArrowRight'></div>
                    <div className='publicKey'>PK</div>
                    <div className='bob'>Bob</div>
                </div>
                <div className='encrypt'>
                    <div className='cypherText'>Cypher</div>
                    <div className='horizenArrowLeft'></div>
                    <div className='verticalLine'></div>
                    <div className='encryptEqua'>Enc(pk, m)</div>
                </div>
                <div className='decrypt'>
                    <div className='downArrow decryDownArrow'></div>
                    <div className='decryptEqua'>Dec(sk, cypher)</div>
                    <div className='message'>Message</div>
                </div>
            </div>
        </>    
    )
}

export default CryptProcess