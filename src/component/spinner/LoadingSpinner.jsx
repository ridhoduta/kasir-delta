import React from 'react'

const LoadingSpinner = () => {
  return (
    <div className="spinner-overlay">
        <div className="spinner-container">
            <div className="spinner"></div>
            <div className="loading-text">Memproses...</div>
        </div>
    </div>
  )
}

export default LoadingSpinner
