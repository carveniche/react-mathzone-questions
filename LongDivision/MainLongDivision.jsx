import React from 'react'
import LongDivision from './LongDivision'

export default function MainLongDivision({teacher,obj,meter}) {
  return (
    <LongDivision state={obj} meter={meter} teacher={teacher} totalRows={obj?.rows||1} totalCols={obj?.cols||1}/>
  )
}
