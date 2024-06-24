import GenerateLine from "./GenerateLine"; 
 
export default function NumberLineAddition({obj, meter,teacher, multipicselect}){
    console.log({obj, meter})
    return <>
          <GenerateLine question = {obj} meter={meter} teacher={teacher} multipicselect={multipicselect} /> 
    </>





}
 