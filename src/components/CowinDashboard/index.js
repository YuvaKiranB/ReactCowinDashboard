// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import GetVaccinationCoverage from '../VaccinationCoverage'
import GetVaccinationByAge from '../VaccinationByAge'
import GetVaccinationByGender from '../VaccinationByGender'

const apiStatusConstants = {
  initial: 'INITIAL',
  progress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CowinDashboard extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    vaccinationData: {},
  }

  componentDidMount() {
    this.getVaccinationCoverageData()
  }

  getVaccinationCoverageData = async () => {
    this.setState({apiStatus: apiStatusConstants.progress})
    const covidVaccinationDataApiUrl =
      'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(covidVaccinationDataApiUrl)
    const data = await response.json()

    if (response.ok) {
      const updatedData = {
        last7DaysVaccination: data.last_7_days_vaccination.map(eachItem => ({
          dose1: eachItem.dose_1,
          dose2: eachItem.dose_2,
          vaccineDate: eachItem.vaccine_date,
        })),
        vaccinationByAge: data.vaccination_by_age,
        vaccinationByGender: data.vaccination_by_gender,
      }

      this.setState({
        vaccinationData: {...updatedData},
      })
      this.setState({apiStatus: apiStatusConstants.success})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoading = () => (
    <div data-testid="loader" className="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderSuccess = () => {
    const {vaccinationData} = this.state
    const {
      last7DaysVaccination,
      vaccinationByGender,
      vaccinationByAge,
    } = vaccinationData

    return (
      <div className="cardsContainer">
        <GetVaccinationCoverage content={last7DaysVaccination} />
        <GetVaccinationByGender content={vaccinationByGender} />
        <GetVaccinationByAge content={vaccinationByAge} />
      </div>
    )
  }

  renderFailure = () => (
    <div className="failureContainer">
      <img
        className="failureImage"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="failureHeading">Something went wrong</h1>
    </div>
  )

  renderViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.progress:
        return this.renderLoading()
      case apiStatusConstants.success:
        return this.renderSuccess()
      case apiStatusConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="main">
        <div className="content">
          <div className="headingContainer">
            <img
              className="image1"
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
            />
            <h1 className="h1">Co-WIN</h1>
          </div>
          <h1 className="h2">CoWIN Vaccination in India</h1>
          {this.renderViews()}
        </div>
      </div>
    )
  }
}

export default CowinDashboard
