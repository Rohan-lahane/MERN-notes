import PropTypes from 'prop-types'

const LoginForm = ({  username,
    password,
    handleUsernameChange,
    handlePasswordChange,
    handleSubmit
    }) => {

    return(
    <form onSubmit={handleSubmit}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={ handleUsernameChange
        //     ({ target }) => {
        //     // console.log("our target is :", target, "and it's value is: ", target.value)
        //     console.log(
        //         "handleUsernameChange: ",handleUsernameChange,
        //         "\n handlePasswordChange: ", handlePasswordChange,
        //         "\n username: ", username, 
        //         "\n password: ", password,
        //         "\n target: ", target,
        //         "\n target value: ", target.value,
        //         "\n handleSubmit: " , handleSubmit
        
        //     )
        //     handleUsernameChange(target.value)
        // }
      }
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">Send_Login</button>
    </form>   
    )   
    }

    LoginForm.propTypes = {
      handleSubmit: PropTypes.func.isRequired,
      handleUsernameChange: PropTypes.func.isRequired,
      handlePasswordChange: PropTypes.func.isRequired,
      username: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired
    }

  export default LoginForm 
