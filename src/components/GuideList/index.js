import './index.css'

const GuideList = props => {
  const {travelDetails} = props
  const {description, imageUrl, name} = travelDetails

  return (
    <li className="list-item">
      <img src={imageUrl} alt={name} className="image" />
      <div className="text-con">
        <h1 className="place-name"> {name} </h1>
        <p className="description"> {description} </p>
      </div>
    </li>
  )
}

export default GuideList
