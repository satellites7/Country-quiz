import styled from 'styled-components'
import Image from 'next/image'
import React, { useState } from 'react'
import randomArr from '../pages/api/randomArr';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai'


export const Card = styled.div`
    display: ${props => props.flag ? "" : "none"};
    position: relative;
    width: 464px;
    background-color: #fff;
    border-radius: 24px;
    padding-bottom: 8%;
    @media (max-width: 464px) {
    width: 100%;
  }
`
const Title = styled.p`
    @media (max-width: 464px) {
    transform: translateY(-60px);
  }

    text-align: left;
    font-family: Poppins;
    font-style: normal;
    font-weight: bold;
    font-size: 36px;
    line-height: 54px;
    text-transform: uppercase;
    color: #F2F2F2;
    margin: 0 0 0.5rem 0 ;
`
const SpanImg = styled.span`
    position: absolute;
    right: 0;
    top: -70px;
`
const SpanFlag = styled.span`
    align-self:flex-start;
    margin: 30px 0 0 25px;
`
const Box = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    /* height: 90%; */
    gap: 25px;
    align-items: center;
`
const Question = styled.p`
    /* margin-top: 60px; */
    margin-top:${props => props.questionType ? '60px' : 0};
    font-family: Poppins;
    font-weight: 600;
    font-size: 24px;
    line-height: 36px;
    color: #2F527B;
    align-self: self-start;
    padding-left: 25px;
    @media (max-width: 464px) {
    font-size: 20px;
  }
`

const Choices = styled.button`
    position: relative;
    width: 90%;
    border: 2px solid ;
    border-color: ${props => props.answer === props.value ? '#60BF88' : props.wrong === props.value ? '#EA8282' : ' rgba(96, 102, 208, 0.7)'};;
    box-sizing: border-box; 
    border-radius: 12px;
    background: ${props => props.answer === props.value ? '#60BF88' : props.wrong === props.value ? '#EA8282' : '#ffffff'};
    color: ${props => (props.answer === props.value || props.wrong === props.value) ? '#ffffff' : '#6066D0CC'};
    text-align: start;
    padding: 10px 19px ;
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    cursor: pointer;
    display: flex;
    gap: 50px;
    &:hover{
        background-color:#F9A826;
        color: #fff;
        border: 2px solid #F9A826;
    }


    &:disabled {
        cursor: auto;
    }
    &:disabled:hover {
        color: ${props => (props.answer === props.value || props.wrong === props.value) ? '#ffffff' : '#6066D0CC'};
        background: ${props => props.answer === props.value ? '#60BF88' : props.wrong === props.value ? '#EA8282' : '#ffffff'};
        border-color: ${props => props.answer === props.value ? '#60BF88' : props.wrong === props.value ? '#EA8282' : ' rgba(96, 102, 208, 0.7)'};;
    }
    @media (max-width: 464px) {
    font-size: 16px;
  }
    span {
        position: absolute;
        right:10px;
    }
    .right{
        display:  ${props => props.answer === props.value ? '' : 'none'};
    }
    .wrong {
        display:  ${props => props.wrong === props.value ? '' : 'none'};
    }

`

const Next = styled.button`
    display: ${props => props.quizMode ? "block" : 'none'};
    padding: 15px 35px;
    background: #F9A826;
    box-shadow: 0px 2px 4px rgba(252, 168, 47, 0.4);
    border-radius: 12px;
    border: none;

    cursor: pointer;
    font-family: Poppins;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 27px;
    color: #FFFFFF;

    margin:20px 0 0 71%;
    align-self: flex-end;
    @media (max-width: 464px) {
        transform: translateX(-30px);
    }
`
const Result = styled(Card)` 
    display: ${props => !props.flag ? "flex" : "none"};
    text-align: center;
    flex-direction: column;
    height: 542px;
    justify-content: space-around;
    .result {
        transform: translateY(30px);
        font-family: Poppins;
        font-weight: 800;
        font-size: 48px;
        line-height: 72px;
        color: #1D355D;
    }
    .score {
        font-family: Poppins;
        font-weight: normal;
        font-size: 18px;
        line-height: 27px;
        color: #1D355D;
    }
    span {
        font-weight: 700;
        font-size: 36px;
        color:rgba(111,207,151)
    }
    button {
        cursor:pointer;
        align-self: center;
        width: 209px;
        height: 62px;   
        background: none;
        border: 2px solid #1D355D;
        box-sizing: border-box;
        border-radius: 12px;
        
        font-family: Poppins;
        font-weight: 600;
        font-size: 18px;
        line-height: 27px;
        color: #1D355D;
    }
`


function Bigcard({ questionData, setQuestionData, originQuestion }) {
    const [listIndex, setListIndex] = useState(0)
    const [flag, setFlag] = useState(true)
    const [answer, setAnswer] = useState('');
    const [wrong, setWrong] = useState('');
    const [quizMode, setQuziMode] = useState(false)
    const [count, setCount] = useState(0)
    const [questionType, setQuestionType] = useState(0)

    const handleSubmit = () => {
        setQuziMode(false);
        if (listIndex < 4) {
            setListIndex(listIndex + 1)
            setFlag(true)
        } else {
            setFlag(false)
        }
        setAnswer('');
        setWrong('');
        setQuestionType(Math.round(Math.random()))
    }
    const handleTry = () => {
        setQuestionData(randomArr(originQuestion))
        setListIndex(0)
        setFlag(true)
        setQuziMode(false);
        setCount(0)
    }
    const handleSelect = (item, index) => {
        setQuziMode(true)
        setAnswer(questionData[listIndex].item.name)
        if (item.name !== questionData[listIndex].item.name) {
            setWrong(item.name)
        } else {
            setCount(count + 1)
        }
    }


    return (
        <>
            <div>
                <Title>Country quiz</Title>
                <Card flag={flag}>
                    <SpanImg>
                        <Image src={"/undraw_adventure_4hum 1.svg"} alt='' width={162} height={116} priority />
                    </SpanImg>
                    <Box>
                        {questionData[0] && <>
                            {questionType ?<Question questionType={questionType}>{questionData[listIndex].item.capital} is the capital of</Question> : 
                            <>
                            <SpanFlag><Image src={questionData[listIndex].item.flag} width={84} height={54} alt='flag'/></SpanFlag>
                            <Question questionType={questionType}>Which country does this flag belong to?  </Question></>}
                            {questionData[listIndex].list.map((item, index) => {
                                return <Choices key={index} onClick={(e) => { handleSelect(item, index) }} answer={answer} wrong={wrong} value={item.name} disabled={quizMode} >
                                    {String.fromCharCode((65 + index))}. {" "} {item.name}
                                    <span className='right'><AiOutlineCheckCircle size={24} /> </span>
                                    <span className='wrong'><AiOutlineCloseCircle size={24} /> </span>
                                </Choices>
                            })}
                        </>}
                    </Box>
                    <Next onClick={handleSubmit} quizMode={quizMode}>Next</Next>
                </Card>
                <Result flag={flag}>
                    <Image src={"/undraw_winners_ao2o 2.svg"} alt='' width={238} height={136} priority />
                    <p className='result'>Results</p>
                    <p className='score'>You got <span>{count}</span> correct answers</p>
                    <button onClick={handleTry}>Try again</button>
                </Result>
            </div>
        </>
    )
}



export default Bigcard


