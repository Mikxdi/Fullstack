import React from 'react'


const Course = (props) =>{
    
    return(
        props.courses.map((course, i)=>{
            return(
                <div key={i}>
                    <Header course={course.name} />
                    <Content parts={course.parts}/>    
                    <Total parts={course.parts}/>
                </div>
            )
        })
    )
  }
  const Content = (props) => {
      return(
          <div>
              {props.parts.map((pa, i)=> <Part key={i} part ={pa.name} exercises={pa.exercises}/>)}
          </div>
      )
  }
  
  const Part = (props) => {
      return(
          <p>
              {props.part} {props.exercises}
          </p>
      )
  }
  
  const Total = (props) => {
      const total =props.parts.map(exe => exe.exercises).reduce((total, amount)=> total+ amount)

        return(
          <p>Number of exercises {total}</p>
        )
  }
  
  const Header = (props) => {
      return(
          <h1 key={props.key}>{props.course} </h1>
      )
  }

  export default Course