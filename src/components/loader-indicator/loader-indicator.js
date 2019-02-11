import React from 'react';
import './loader-indicator.css';

const LoaderIndicator = () => {
  return( 
    <div className="loader-indicator">
      <div className="lds-css ng-scope">
        <div className="lds-pacman">
          <div>
            <div></div>
            <div></div>
            <div></div>
            </div><div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoaderIndicator;
