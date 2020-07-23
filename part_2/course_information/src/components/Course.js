import React from 'react';

const Total = ({ course }) => {
    const sum = course.parts.reduce((s,p) => p.exercises + s ,0)
    // console.log(sum)
    return(
      <p><b>total of {sum} exercises</b></p>
    ) 
}
  
const Part = (props) => {
    return (
      <p key={props.id}>
        {props.name} {props.exercises}
      </p>    
    )
}
  
const Coursepart = (props) => {
    return (
      <div key={props.id}>
        <h2>{props.name}</h2>
        {props.parts.map(Part)}
        <Total course={props}></Total>
      </div>
    )
}
  
const Course = ({ courses }) => {
    return(
      <div>
        <h1>Web Development Curriculum</h1>
        {courses.map(Coursepart)}
      </div>
    )
}

export default Course
  