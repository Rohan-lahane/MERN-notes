import { useState } from 'react'
// import './App.css'

// const Hello = ({name,age}) =>{

//   // const {n1, a1} = props1
//   // const a1 = props1.age


//   return (
//   <>
//     <p>
//       Hello there, {name}, you are {age} years old 
//     </p>
//   </>
//   )
// }

// const App = () => {
//   console.log("Hello from component")
//   const now = new Date()
//   const a = 10
//   const b = 20

//   return (
//   <>
//     <p>Greetings, it is {now.toString()}</p>
//     <Hello name='Rohan' age = {16+5}  />
//     <Hello name = 'Ieeshaaa' age = {b} />
//     <Hello name = 'Rohann' age = {b}/>
//     <p>
//       {a}plus {b} is {a+b}
//     </p>
//   </>
//   )
// }
  
const colorstyle = {
  color: 'red',
  fontSize :20
}
const colorstyle2 ={
  color : 'blue',
  fontSize : 24
}

const Display = ({counter}) => <div>{counter}</div>
const Button =({ls,onClick1, text}) => {

  // const count = ls
  
  if(ls< 5)
  return(  <button style ={colorstyle} onClick= {onClick1}>{text}</button>
  // else
  // <button style ={colorstyle2} onClick= {onClick1}>{text}</button>
  )
  else 
  return ( <button style ={colorstyle2} onClick= {onClick1}>{text}</button>
    //
  )
}
const History = (props) =>{
  if(props.allClicks.length=== 0){
    return <>
    this app is used by pressing buttons
    </>
  }
  return <>
  button press history: {props.allClicks.join(' ')}
  </>

}

const App = () => {
  const [ counter, setCounter ] = useState(0)
  // const[clicks, setClicks] = useState({
  //   left: 0, right:0
  // })
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll]= useState([])
  console.log('left: ', left)
  // const handleClick =() => {
  //   console.log('clicked')
  //   setCounter(counter+2)
  // }

  const handleLeftClick =()=> {
   
    setAll(allClicks.concat('L'))
    setLeft(left+1)
  
  }

  const handleRightClick =()=> {
    
    setAll(allClicks.concat('R'))
    setRight(right+1)
  }

  return (
    <>
    {/* <div>{counter}</div> */}
    {/* <Display counter = {counter}/> */}
    {/* <button onClick ={handleClick}> plus</button> */}
    {left}
    <Button ls ={left} onClick1 = {handleLeftClick} text = 'left'/>
    <Button ls ={left} onClick1 = {handleRightClick} text = 'right'/>
    {right}    
    <History allClicks ={allClicks}/>
    {/* <p>{allClicks.join(', ')}</p> */}
    {/* <button onClick ={()=>setCounter(0)}> reset</button> */}
    </>
  )
}

export default App
