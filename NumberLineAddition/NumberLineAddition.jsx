import GenerateLine from "./GenerateLine";
import NumberLineKeying from "./NumberLineKeying";
import NunmberLineMapping from "./NumberLineMapping";

export default function NumberLineAddition({ obj, meter, teacher, multipicselect }) {
    return <>
        {
            obj.choiceType === "keying" || obj.choiceType === "selectchoice"  ?
                <NumberLineKeying  question={obj} meter={meter} teacher={teacher} multipicselect={multipicselect} />
                : obj.choiceType === "mapping" ? 
                <NunmberLineMapping question={obj} meter={meter} teacher={teacher} multipicselect={multipicselect} /> : ""
                // <GenerateLine question={obj} meter={meter} teacher={teacher} multipicselect={multipicselect} />
        }
    </>

}
