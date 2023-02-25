import {useState, forwardRef, useImperativeHandle} from 'react'
import PropTypes  from 'prop-types'

const Toggleable =forwardRef((props, refs)=>{
    const[visible, setVisible] = useState(false)
    
    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }
    console.log("props children ", props.children)
    const toggleVisibility = () => {
      setVisible(!visible)
    }

    useImperativeHandle(refs, () => {
      return {
        toggleVisibility
      }
    })

   
    return (
        <div>
          <div style={hideWhenVisible}>
            <button onClick={toggleVisibility}>{props.buttonLabel}</button>
          </div>
          <div style={showWhenVisible}>
            {
              
              props.children
              // console.log("toggle children: ")
            }
            <button onClick={toggleVisibility}>Cancel</button>
          </div>
        </div>
      )

      

})

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}



export default Toggleable