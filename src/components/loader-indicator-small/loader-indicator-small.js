import React from 'react'
import './loader-indicator-small.css'

const LoaderIndicatorSmall = () => {
  return (
    <div className='lds-css ng-scope'>
      <div className='lds-ellipsis'>
        <div>
          <div />
        </div>
        <div>
          <div />
        </div>
        <div>
          <div />
        </div>
        <div>
          <div />
        </div>
        <div>
          <div />
        </div>
      </div>
    </div>
  )
}

export default LoaderIndicatorSmall
