import axios from 'axios'
const baseUrl = '/api/notes'

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

const create = (newObject) => {

  const request = axios.post(baseUrl, newObject)
  return request.then(response =>response.data)
//   return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  const request= axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response=>response.data)

}

export default { 
  getAll: getAll, 
  create: create, 
  update: update 
}