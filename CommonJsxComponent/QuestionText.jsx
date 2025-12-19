import React, { useContext } from 'react'
import SpeakQuestionText from '../component/CommonFiles/PatternMatchers/SpeakQuestionText';
import parse from "html-react-parser";
import { ValidationContext } from '../MainOnlineQuiz/MainOnlineQuizPage';

export default function QuestionText({ questionName }) {
    const {readQuestionText} = useContext(ValidationContext);

    return (
        <div className='' style={{ display: "flex" }}>
            {readQuestionText && (
                <SpeakQuestionText readText={questionName} />
            )}
            <div className='h3 navy'>{parse(questionName)}</div>
        </div>
    )
}
