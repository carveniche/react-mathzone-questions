import CkEditor from "./CkEditor";
export default function MainCkEditor({str,meter,choiceData,upload_file_name,choiceId})
{
   return <CkEditor str={str} meter={meter} choiceData={choiceData} upload_file_name={upload_file_name} choiceId={choiceId}/>
}