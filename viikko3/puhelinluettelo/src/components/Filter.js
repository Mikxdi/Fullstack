import React from 'react'


const Filter = (props) => {
  return (
    <div>
      Search for people<input value={props.filter} onChange={props.onChange} />
    </div>
  )
}

export default Filter