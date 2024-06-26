// Write your code here
import {PieChart, Pie, Legend, Cell} from 'recharts'

import './index.css'

const GetVaccinationByGender = props => {
  const {content} = props

  return (
    <div className="vaccinationByGenderContainer">
      <h1 className="vaccinationByGenderHeading">Vaccination by gender</h1>

      <PieChart width={1000} height={300}>
        <Pie
          cx="50%"
          cy="50%"
          data={content}
          startAngle={180}
          endAngle={0}
          innerRadius="40%"
          outerRadius="70%"
          dataKey="count"
        >
          <Cell name="Male" fill=" #f54394" />
          <Cell name="Female" fill="#5a8dee" />
          <Cell name="Others" fill=" #2cc6c6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
        />
      </PieChart>
    </div>
  )
}

export default GetVaccinationByGender
