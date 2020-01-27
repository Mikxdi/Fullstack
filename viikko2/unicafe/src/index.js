import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Buttons = ({ good, bad, neutral }) => {
    return (<div>
        <Button name='Hyvä' handleClick={good[1]} amount={good[0] + 1} />
        <Button name='Neutraali' handleClick={neutral[1]} amount={neutral[0] + 1} />
        <Button name='Huono' handleClick={bad[1]} amount={bad[0] + 1} />
    </div>
    )
}

const Button = ({ handleClick, name, amount }) => {
    return(
        <button onClick={() => handleClick(amount)}>{name}</button>
    )
}

const Statistics =({good, bad, neutral}) => {
    const total = good + bad + neutral
    const points  = good - bad
    const medi = points / total
    if(total > 0){
        return(
            <div>
                <table>
                    <tbody>
                        <StatisticLine name='Hyvä' amount={good} />
                        <StatisticLine name='Neutraali' amount={neutral} />
                        <StatisticLine name='Huono' amount={bad} />
                        <StatisticLine name='Yhteensä' amount={total} />
                        <StatisticLine name='Keskiarvo' amount={medi} />
                        <StatisticLine name='Positiivista' amount={good / total} />
                    </tbody>
                </table>
            </div>
        )
    }
    return(
        <div> Ei palautetteita</div>
    )
}

const StatisticLine=(props) => {
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.amount}</td>
        </tr>
    )
}
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
   
    <div>
        <h1>Anna palautetta</h1>
        <Buttons good={[good, setGood]} neutral={[neutral, setNeutral]} bad={[bad, setBad]} /> 
        
        <h1>Tilastoja</h1>
        <Statistics good={good} neutral={neutral} bad={bad} /> 
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)