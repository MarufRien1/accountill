import express from 'express'
import { getPublicInvoice, payPublicInvoice } from '../controllers/publicInvoices.js'

const router = express.Router()

router.get('/invoices/:publicId', getPublicInvoice)
router.post('/invoices/:publicId/pay', payPublicInvoice)

export default router
