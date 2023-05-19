import jwt from 'jsonwebtoken'
import axios from 'axios'
import MS_PATH from '../constant/MS_PATH'

const verifyToken = async (attrs) => {
  try {
    const { id = 1, token, email = '' } = attrs
    const applicationResponse = await axios(MS_PATH.APPLICATION_MS.APP_BY_ID.replace('ENTER_USER_ID', id))
    const { data: ApplicationData } = applicationResponse
    const { name } = ApplicationData[0]
    const secret = process.env.TOKEN_ENCRYPTION_KEY + email
    console.log(`secret is ${secret}`)
    const verifyToken = jwt.verify(token, secret)
    return { message: 'Successfully verified' }
  } catch (e) {
    console.log('Could not verify')
  }
}

const Verification = {
  verifyToken
}

export default Verification
