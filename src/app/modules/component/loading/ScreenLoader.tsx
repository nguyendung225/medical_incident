import { FC } from "react";
import './Loading.scss'

const ScreenLoader: FC = () => {

  return (
    <div id="fullscreen-loader">
      <div id="container">
        <svg viewBox="0 0 100 100">
          <defs>
            <filter id="shadow">
              <feDropShadow
                dx="0" dy="0"
                stdDeviation="0"
                flood-color="#002B5B"
              />
            </filter>
          </defs>
          <circle id="spinner" cx="50" cy="50" r="45"/>
        </svg>
      </div>
    </div>
  )
}

export default ScreenLoader