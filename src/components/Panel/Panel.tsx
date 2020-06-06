import React from 'react'

export const Panel: React.FCX = ({ children, className }) => {
  return (
    <div
      className={`p-4 rounded border border-solid border-gray-400 shadow ${className}`}
    >
      {children}
    </div>
  )
}
