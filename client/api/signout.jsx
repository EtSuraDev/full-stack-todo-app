import axios from 'axios';




const signout = async (router) => {
    try {
        const res = await axios.post(`${process.env.domain}/api/auth/signout`)
        router.push("/login")
      } catch (error) {
        router.push("/")
        console.log(error)
      }
  }



export default signout