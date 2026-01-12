import React, { useContext, useEffect } from 'react'
import MainBlockBaseImage from '../BlockBaseImage/MainBlockBaseImage';
import MainDragDropImageCompare from '../ComparisionDragAndDropImage/MainDragDropImageCompare';
import MainCountOnTensframe from '../CountOnTensframe.jsx/MainCountOnTensframe';
import MainDragAndDrop from '../DragAndDrop/MainDragAndDrop';
import MainHorizontal from '../Horizontal/MainHorizontal';
import MainHorizontalFillUps from '../HorizontalFillUps/MainHorizontalFillUps';
import MainHorizontalNotSymbols from '../Horizontalnotsymbols/MainHorizontalNotSymbols';
import MainHorizontalPicture from '../HorizontalPicture/MainHorizontalPicture';
import HorizontalPreviewClick from '../HorizontalPreviewClick';
import HundredChart from '../HundredChart/HundredChart';
import LogicalTableKg from '../LogicalTableKg/LogicalTableKg';
import MainMatchObjectHorizontal from '../MatchObjectHorizontal/MainMatchObjectHorizontal';
import MainMatchObjectVertical from '../MatchObjectVertical/MainMatchObjectVertical';
import MainNumberBond from '../NumberBond/MainNumberBond';
import OnlineQuiz from '../OnlineQuiz';
import OptionMultiplePictureMain from '../OptionlMultiplePicture/OptionMultiplePictureMain';
import MainPlaceValueChart from '../PlaceValueChart/MainPlaceValueChart';
import MainValueTableSelect from '../PlaceValueTableSelect/MainValueTableSelect';
import MainQuestionTextImage from '../QuestionTextImage/MainQuestionTextImage';
import { ClickableOnPic } from '../questiontextoptions/clickableOnPicture/clickableOnPicture';
import { ClickableOnYesNo } from '../questiontextoptions/clickableOnYesNo/clickableOnYesNo';
import MainRandomArrangmentDragDrop from '../RandomArrangemenDragDrop/MainRandomArrangmentDragDrop';
import MainTensframe from '../TensFrame/MainTensFrame';
import MainVertical from '../Vertical/MainVertical';
import MainVerticalWithSymbols from '../VerticalWithSymbols/MainVerticalWithSymbols';
import { ValidationContext } from '../../MainOnlineQuiz/MainOnlineQuizPage';
import MainLongDivision from '../LongDivision/MainLongDivision';
import MainMultipleOptionSelect from '../MultipleOptionSelect/MainMultipleOptionSelect';


export default function CommonStudentResponse({ data, type }) {
  const { handleUpdateStudentAnswerResponse } = useContext(ValidationContext)
  useEffect(() => {
    handleUpdateStudentAnswerResponse(true)
  }, [])

  let questionType = {

    horizontal_fill_ups: (
      <MainHorizontalFillUps obj={data} meter={0} />
    ),
    horizontal_fill_ups_multi_row: (
      <MainHorizontalFillUps obj={data} meter={0} />
    ),
    horizontal: <MainHorizontal obj={data} meter={0} />,
    vertical: <MainVertical obj={data} meter={0} />,
    matchobjectsvertical: (<MainMatchObjectVertical obj={data} meter={0} />),
    randomarrangementdragdrop: <MainRandomArrangmentDragDrop obj={data} meter={0} />,
    place_value_chart: (
      <MainPlaceValueChart obj={data} meter={0} />
    ),
    compare_drag_operator: (
      <MainDragAndDrop obj={data} meter={0} />
    ),
    comparison_of_images: (
      <MainDragDropImageCompare obj={data} meter={0} />
    ),
    matchobjectshorizontal: (
      <MainMatchObjectHorizontal obj={data} meter={0} />
    ),
    base_block_images: (
      <MainBlockBaseImage obj={data} meter={0} />
    ),
    horizontalnotsymbols: (
      <MainHorizontalNotSymbols obj={data} meter={0} />
    ),
    options_multiple_pictures: (
      <OptionMultiplePictureMain obj={data} meter={0} />
    ),
    horizontalpicture: (
      <MainHorizontalPicture obj={data} meter={0} />
    ),
    place_value_table_select: (
      <MainValueTableSelect obj={data} meter={0} />
    ),
    countontenframes: (
      <MainCountOnTensframe obj={data} meter={0} />
    ),
    count_tenframes_multiple: (
      <OnlineQuiz obj={data} meter={0} studentResponseView={true} />
    ),
    tenframes: <MainTensframe obj={data} meter={0} />,
    questiontextoptions: (
      <ClickableOnPic data={data} meter={0} />),
    verticalwithsymbols: (
      <MainVerticalWithSymbols obj={data} meter={0} />
    ),
    questiontextimages: (
      <MainQuestionTextImage obj={data} meter={0} />

    ),
    long_multiplication: <MainVertical obj={data} meter={0} />,
    logical_table_kg: <LogicalTableKg data={data} meter={0} />,
    horizontalpreviewclick: (
      <HorizontalPreviewClick obj={data} meter={0} />
    ),
    hundreds_chart: <HundredChart data={data} meter={0} />,
    countofobjectsyesno: (
      <ClickableOnYesNo data={data} meter={0} />
    ),
    number_bond: <MainNumberBond obj={data} meter={0} />,
    long_division: (
      <MainLongDivision obj={data} meter={0} />
    ),
    options_select_multiple_pictures: (
      <MainMultipleOptionSelect
        obj={data}
        meter={0}
        multipicselect={true}
      />
    ),

  };
  return <>{questionType[type]}</>

}