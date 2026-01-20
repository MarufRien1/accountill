
//Copyright (c) 2022 Panshak Solomon

import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

import invoiceRoutes from './routes/invoices.js'
import clientRoutes from './routes/clients.js'
import userRoutes from './routes/userRoutes.js'
import publicRoutes from './routes/public.js'

import profile from './routes/profile.js'
import pdfTemplate from './documents/index.js'
// import invoiceTemplate from './documents/invoice.js'
import emailTemplate from './documents/email.js'

const app = express()
dotenv.config()

app.use((express.json({ limit: "30mb", extended: true })))
app.use((express.urlencoded({ limit: "30mb", extended: true })))
app.use((cors()))

app.use('/invoices', invoiceRoutes)
app.use('/clients', clientRoutes)
app.use('/users', userRoutes)
app.use('/public', publicRoutes)
app.use('/profiles', profile)

// Render printable invoice HTML (client should open a new window and call window.print())
app.post('/render-invoice', (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.send(pdfTemplate(req.body))
})

// Legacy endpoints (server-side PDF generation removed in favor of browser printing)
app.post('/create-pdf', (req, res) => {
    res.status(410).json({
        message: 'Server-side PDF generation has been removed. Use /render-invoice and window.print() from the browser.',
    })
})

app.get('/fetch-pdf', (req, res) => {
    res.status(410).json({
        message: 'Server-side PDF generation has been removed. Use /render-invoice and window.print() from the browser.',
    })
})

// SEND INVOICE EMAIL (HTML body only; users can print/save as PDF from the browser)
app.post('/send-pdf', async (req, res) => {
    const { email, company } = req.body

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    try {
        await transporter.sendMail({
            from: ` Accountill <hello@accountill.com>`,
            to: `${email}`,
            replyTo: `${company.email}`,
            subject: `Invoice from ${company.businessName ? company.businessName : company.name}`,
            text: `Invoice from ${company.businessName ? company.businessName : company.name}`,
            html: emailTemplate(req.body),
        })
        res.send(Promise.resolve())
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
})


app.get('/', (req, res) => {
    res.send('SERVER IS RUNNING')
})

const DB_URL = process.env.DB_URL
const PORT = process.env.PORT || 5000

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message))

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

