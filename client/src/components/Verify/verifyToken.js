export const verifyToken = async () => {
  return fetch('http://localhost:9576/auth/verify-token', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Response not OK')
      }
      return response.json()
    })
    .catch(error => {
      console.error('Error verifying token:', error)
      throw error
    })
}
