import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

import User from '../models/userModel.js'
import Profile from '../models/ProfileModel.js'
import ClientModel from '../models/ClientModel.js'
import InvoiceModel from '../models/InvoiceModel.js'

dotenv.config()

const DB_URL = process.env.DB_URL || 'mongodb://127.0.0.1:27017/accountill'

const argSet = new Set(process.argv.slice(2))
const shouldDropCollections = argSet.has('--drop') || argSet.has('--reset')
const shouldDropDatabase = argSet.has('--drop-db') || argSet.has('--reset-db')
const shouldClearOnly = argSet.has('--clear')
const shouldClearDatabaseOnly = argSet.has('--clear-db')

const generatePublicId = () => crypto.randomBytes(16).toString('hex')

const addDays = (days) => {
	const d = new Date()
	d.setDate(d.getDate() + days)
	return d
}

const toMoney = (value) => Math.round(value * 100) / 100

const makeItems = () => {
	const catalog = [
		{ itemName: 'Website design', unitPrice: 600, quantity: 1, discount: 0 },
		{ itemName: 'Logo design', unitPrice: 150, quantity: 1, discount: 0 },
		{ itemName: 'Monthly retainer', unitPrice: 300, quantity: 1, discount: 0 },
		{ itemName: 'Consulting (hourly)', unitPrice: 75, quantity: 4, discount: 0 },
		{ itemName: 'Copywriting', unitPrice: 90, quantity: 2, discount: 0 },
	]

	const count = 2 + Math.floor(Math.random() * 2)
	const picked = []
	while (picked.length < count) {
		const candidate = catalog[Math.floor(Math.random() * catalog.length)]
		if (!picked.includes(candidate)) picked.push(candidate)
	}

	return picked.map((i) => ({
		itemName: i.itemName,
		unitPrice: String(i.unitPrice),
		quantity: String(i.quantity),
		discount: String(i.discount),
	}))
}

const computeTotals = ({ items, vat = 0 }) => {
	const subTotal = items.reduce((sum, item) => {
		const unitPrice = Number(item.unitPrice || 0)
		const quantity = Number(item.quantity || 0)
		const discount = Number(item.discount || 0)
		const line = unitPrice * quantity
		return sum + Math.max(0, line - discount)
	}, 0)

	const vatAmount = (subTotal * vat) / 100
	const total = subTotal + vatAmount
	return { subTotal: toMoney(subTotal), total: toMoney(total) }
}

async function main() {
	console.log(`[seed] Connecting to DB_URL=${DB_URL}`)
	await mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

	const seedUsers = [
		{ name: 'Demo User', email: 'demo@accountill.test' },
		{ name: 'Acme Owner', email: 'owner@acme.test' },
	]
	const seedClientEmails = ['billing@globex.test', 'accounts@initech.test', 'payables@umbrella.test']
	const seedInvoiceNumbers = Array.from({ length: 12 }, (_, i) => `INV-${String(1000 + i)}`)
	const seedUserEmails = seedUsers.map((u) => u.email)

	if (shouldDropDatabase || shouldClearDatabaseOnly) {
		console.log('[seed] Dropping database')
		await mongoose.connection.dropDatabase()
		if (shouldClearDatabaseOnly) {
			console.log('[seed] Database cleared.')
			await mongoose.disconnect()
			return
		}
	} else if (shouldDropCollections || shouldClearOnly) {
		console.log('[seed] Clearing collections')
		await Promise.all([
			User.deleteMany({}),
			Profile.deleteMany({}),
			ClientModel.deleteMany({}),
			InvoiceModel.deleteMany({}),
		])
		if (shouldClearOnly) {
			console.log('[seed] Collections cleared.')
			await mongoose.disconnect()
			return
		}
	} else {
		// Idempotent "seed without reset": only remove the records this script creates.
		await Promise.all([
			InvoiceModel.deleteMany({ invoiceNumber: { $in: seedInvoiceNumbers } }),
			ClientModel.deleteMany({ email: { $in: seedClientEmails } }),
			Profile.deleteMany({ email: { $in: seedUserEmails } }),
			User.deleteMany({ email: { $in: seedUserEmails } }),
		])
	}

	const demoPassword = 'Password123!'
	const hashed = await bcrypt.hash(demoPassword, 12)

	const users = await User.insertMany(
		seedUsers.map((u) => ({ name: u.name, email: u.email, password: hashed }))
	)

	const demoUserId = String(users[0]._id)
	const acmeUserId = String(users[1]._id)

	await Profile.insertMany([
		{
			name: 'Demo User',
			email: 'demo@accountill.test',
			phoneNumber: '+1 555 000 111',
			businessName: 'Demo Studio',
			contactAddress: '123 Market Street, Springfield',
			paymentDetails: 'Bank transfer / Card',
			website: 'https://example.com',
			userId: [demoUserId],
		},
		{
			name: 'Acme Owner',
			email: 'owner@acme.test',
			phoneNumber: '+1 555 000 222',
			businessName: 'Acme Corp',
			contactAddress: '77 Industrial Ave, Metropolis',
			paymentDetails: 'Pay on delivery',
			website: 'https://acme.test',
			userId: [acmeUserId],
		},
	])

	const clients = await ClientModel.insertMany([
		{
			name: 'Globex LLC',
			email: 'billing@globex.test',
			phone: '+1 555 222 333',
			address: '9 Sunset Blvd, Los Angeles',
			userId: [demoUserId],
		},
		{
			name: 'Initech',
			email: 'accounts@initech.test',
			phone: '+1 555 444 555',
			address: '1 Silicon Valley, CA',
			userId: [demoUserId],
		},
		{
			name: 'Umbrella Inc',
			email: 'payables@umbrella.test',
			phone: '+1 555 777 888',
			address: '13 Raccoon City',
			userId: [acmeUserId],
		},
	])

	const invoiceTemplates = [
		{
			creator: [demoUserId],
			currency: 'USD',
			rates: 'Hourly',
			vat: 0,
			type: 'Service',
			notes: 'Thanks for your business!',
		},
		{
			creator: [demoUserId],
			currency: 'USD',
			rates: 'Fixed',
			vat: 7.5,
			type: 'Project',
			notes: 'Payment due within 7 days.',
		},
		{
			creator: [acmeUserId],
			currency: 'USD',
			rates: 'Fixed',
			vat: 5,
			type: 'Service',
			notes: 'Please include invoice number in the reference.',
		},
	]

	const statusSet = ['Unpaid', 'Partial', 'Paid']

	const invoicesToCreate = []
	for (let i = 0; i < 12; i++) {
		const t = invoiceTemplates[i % invoiceTemplates.length]
		const client = clients[i % clients.length]
		const items = makeItems()
		const { subTotal, total } = computeTotals({ items, vat: t.vat })

		const status = statusSet[i % statusSet.length]
		const dueDate = i % 4 === 0 ? addDays(-5) : addDays(7 + i) // some overdue

		let paymentRecords = []
		let totalAmountReceived = 0

		if (status === 'Partial') {
			const paid = toMoney(total * 0.4)
			paymentRecords = [
				{
					amountPaid: paid,
					datePaid: addDays(-2),
					paymentMethod: 'Card',
					note: 'Partial payment (seed)',
					paidBy: client.name,
				},
			]
			totalAmountReceived = paid
		}

		if (status === 'Paid') {
			paymentRecords = [
				{
					amountPaid: total,
					datePaid: addDays(-1),
					paymentMethod: 'Bank transfer',
					note: 'Paid in full (seed)',
					paidBy: client.name,
				},
			]
			totalAmountReceived = total
		}

		invoicesToCreate.push({
			publicId: generatePublicId(),
			dueDate,
			currency: t.currency,
			items,
			rates: t.rates,
			vat: t.vat,
			total,
			subTotal,
			notes: t.notes,
			status,
			invoiceNumber: `INV-${String(1000 + i)}`,
			type: t.type,
			creator: t.creator,
			totalAmountReceived,
			client: {
				name: client.name,
				email: client.email,
				phone: client.phone,
				address: client.address,
			},
			paymentRecords,
			createdAt: addDays(-(14 - i)),
		})
	}

	await InvoiceModel.insertMany(invoicesToCreate)

	console.log('[seed] Done.')
	console.log('Demo login credentials:')
	console.log('  email: demo@accountill.test')
	console.log(`  password: ${demoPassword}`)
	console.log('  email: owner@acme.test')
	console.log(`  password: ${demoPassword}`)

	await mongoose.disconnect()
}

main().catch(async (err) => {
	console.error('[seed] Failed:', err)
	try {
		await mongoose.disconnect()
	} catch {
		// ignore
	}
	process.exit(1)
})
