// Write your code here
import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'

import './index.css'

const GetVaccinationCoverage = props => {
  const {content} = props
  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }
  return (
    <div className="vaccinationCoverageContainer">
      <h1 className="vaccinationCoverageHeading">Vaccination Coverage</h1>
      <BarChart
        data={content}
        margin={{
          top: 5,
        }}
        width={1000}
        height={300}
      >
        <XAxis
          dataKey="vaccineDate"
          tick={{
            stroke: 'gray',
            strokeWidth: 0,
          }}
        />

        <YAxis
          tickFormatter={DataFormatter}
          tick={{
            stroke: 'gray',
            strokeWidth: 0,
          }}
        />

        <Legend
          wrapperStyle={{
            padding: 10,
          }}
        />
        <Bar dataKey="dose1" name="Dose1" fill="#5a8dee" barSize="20%" />
        <Bar dataKey="dose2" name="Dose2" fill="#f54394" barSize="20%" />
      </BarChart>
    </div>
  )
}

export default GetVaccinationCoverage
