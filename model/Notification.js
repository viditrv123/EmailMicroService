import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import Mailgen from 'mailgen'
import axios from 'axios'
dotenv.config()

const createUrlLink = async (attrs) => {
  try {
    const { email = '', id } = attrs
    const secret = process.env.TOKEN_ENCRYPTION_KEY + email
    console.log(`secret1 is ${secret}`)
    const reqBody = {
      email, id
    }
    const token = jwt.sign(reqBody, secret, { expiresIn: '15m' })
    const link = `http://localhost:3000/reset-password/${id}/${token}`
    console.log(link)
    const addToken = await axios.post('http://localhost:8000/api/v1/route/reset-password/token', { token })
    return link
  } catch (e) {
    console.log('Error while creating link ' + e)
  }
}

const sendNotification = async (req, res) => {
  try {
    const { body: { email, id } } = req
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_FOR_RESET_PASSWORD_LINK,
        pass: process.env.EMAIL_PASSWORD
      }
    })

    const MailGenGenerator = new Mailgen({
      theme: 'default',
      product: {
        name: 'mailgen',
        link: 'https://mailgen.js'
      }
    })

    const response = {
      body: {
        name: 'Shanaaya',
        intro: 'Please use password reset link',
        outro: 'Looking forward to see in the platform'
      }
    }

    const changePasswordLink = await createUrlLink({ email, id })

    const mail = MailGenGenerator.generate(response)

    const reqBody = {
      from: `"Shanaaya 👻" ${process.env.EMAIL_FOR_RESET_PASSWORD_LINK}`, // sender address
      to: `${email}`, // list of receivers
      subject: 'Change your password', // Subject line
      html: `<b>Click the link ${changePasswordLink}</b>` // html body
    }
    const mailDetails = await transporter.sendMail(reqBody)
    res.json({ details: mailDetails })
  } catch (e) {
    console.log('Error while sending the mail' + e)
  }
}

const Notifictaion = {
  createUrlLink,
  sendNotification
}

export default Notifictaion
