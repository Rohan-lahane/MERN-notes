import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/notes'

let token = null

const setToken  =(newToken)=>{

  console.log("settoken called with ", newToken)
  token = `Bearer ${newToken}`
  console.log("token is now set to: ", token)

}


const getAll = () => {
  const request = axios.get(baseUrl)
//   console.log( "print " ,request , "anddd  ",response.data)
//     const nonExisting = {
//     id: 10000,
//     content: 'This note is not saved to server',
//     date: '2019-05-30T17:30:31.098Z',
//     important: false,
//   }
  return request.then(response => response.data)

  
}

const create = async (newObject) => {
  
  const config ={
    headers: {Authourisation: token}, 
  }
  console.log('create a note called: ', newObject, config, "and our token is: ", token)
  const response = await axios.post(baseUrl, newObject, config)
  console.log("please post thiss: ", response.data)
  return response.data
  // const request = axios.post(baseUrl, newObject)
  // return request.then(response =>response.data)
//   return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  console.log("update note importance called ")
  const request= axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response=>response.data)
}

export default { 
   getAll, 
   create, 
   update,
   setToken 
}