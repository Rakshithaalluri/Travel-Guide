import {Component} from 'react'

import Loader from 'react-loader-spinner'
import GuideList from '../GuideList'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
}

class TravelGuide extends Component {
  state = {
    travelList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTravelList()
  }

  getTravelList = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const url = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    const updatedList = data.packages.map(each => ({
      description: each.description,
      id: each.id,
      imageUrl: each.image_url,
      name: each.name,
    }))
    this.setState({
      travelList: updatedList,
      apiStatus: apiStatusConstants.success,
    })
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderTravels = () => {
    const {travelList} = this.state
    return (
      <ul className="travel-list">
        {travelList.map(each => (
          <GuideList key={each.id} travelDetails={each} />
        ))}
      </ul>
    )
  }

  renderTravelDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderTravels()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <div className="places-container">
          <h1 className="heading"> Travel Guide </h1>
          {this.renderTravelDetails()}
        </div>
      </div>
    )
  }
}

export default TravelGuide
