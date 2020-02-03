import React from 'react'

const ErrorNotification = ({ message }) => {
  const notificationStyle = {
    color: 'red',
    background: 'grey',
    width: '80%',
    fontSize: 25,
    borderStyle: 'solid',
    padding: 20
  }

  if (message === null) {
    return null
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

export default ErrorNotification