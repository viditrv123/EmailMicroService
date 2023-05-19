import { Router } from 'express'
import Notifictaion from '../model/Notification'
import Verification from '../model/Verification'

const router = Router()

router.post('/', async (req, res) => {
  const response = await Notifictaion.sendNotification(req, res)
  res.json(response)
})
router.get('/reset-password/:id/:token', async (req, res) => {
  const { params } = req
  const verificationData = await Verification.verifyToken(params)
  res.json(verificationData)
})

export default router
