import React from "react";
import styled from "styled-components";
import DsbChoiceDNDMatchObjVertEqn from "./DsbChoiceTypeMatchObjVertiEqn/DsbChoiceDNDMatchObjVertEqn/DsbChoiceDNDMatchObjVertEqn";
import DsbChoiceKeyMatchObjVertEqn from "./DsbChoiceTypeMatchObjVertiEqn/DsbChoiceKeyMatchObjVertEqn/DsbChoiceKeyMatchObjVertEqn";
import DsbChoiceMSelectMatchObjVertEqn from "./DsbChoiceTypeMatchObjVertiEqn/DSbChoiceMSelectMatchObjVertEqn/DsbChoiceMSelectMatchObjVertEqn";
import DsbChoiceSelectMatchObjVertEqn from "./DsbChoiceTypeMatchObjVertiEqn/DsbChoiceSelectMatchObjVertEqn/DsbChoiceSelectMatchObjVertEqn";
export default function DsbContMatchObjVerticalEqn({
  content,
  hasAnswerSubmitted,
  totalEmptyBox,
  inputRef,
  choices,
  totalRows,
  choiceType,
  totalCols,
}) {
  return (
    <div>
      {(choiceType == "dragdrop"||choiceType == "selectchoice") && (
        <DsbChoiceDNDMatchObjVertEqn
          content={content}
          choices={choices}
          inputRef={inputRef}
          totalEmptyBox={totalEmptyBox}
          totalRows={totalRows}
        />
      )}
      {(choiceType == "keying") && (
        <DsbChoiceKeyMatchObjVertEqn
          content={content}
          inputRef={inputRef}
          totalEmptyBox={totalEmptyBox}
          totalRows={totalRows}
          hasAnswerSubmitted={hasAnswerSubmitted}
          totalCols={totalCols}
        />
      )}
      {false && (
        <DsbChoiceSelectMatchObjVertEqn
          content={content}
          inputRef={inputRef}
          totalEmptyBox={totalEmptyBox}
          totalRows={totalRows}
          answerHasSelected={hasAnswerSubmitted}
          choices={choices}
        />
      )}
      {choiceType == "multi select" && (
        <DsbChoiceMSelectMatchObjVertEqn
          content={content}
          inputRef={inputRef}
          totalEmptyBox={totalEmptyBox}
          totalRows={totalRows}
          hasAnswerSubmitted={hasAnswerSubmitted}
          choices={choices}
        />
      )}
    </div>
  );
}
export const FlexBox = styled.div`
  display: flex;

  //justify-content:center;
  align-items: center;
  gap: 10px;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
