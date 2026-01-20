import crypto from 'crypto'
import InvoiceModel from '../models/InvoiceModel.js'

const generatePublicId = () => crypto.randomBytes(16).toString('hex')

const computeTotalReceived = (invoice) => {
	if (typeof invoice.totalAmountReceived === 'number') return invoice.totalAmountReceived
	if (!Array.isArray(invoice.paymentRecords)) return 0
	return invoice.paymentRecords.reduce((sum, record) => sum + Number(record?.amountPaid || 0), 0)
}

const sanitizeInvoiceForPublic = (invoice) => {
	if (!invoice) return invoice

	return {
		publicId: invoice.publicId,
		dueDate: invoice.dueDate,
		currency: invoice.currency,
		items: invoice.items,
		rates: invoice.rates,
		vat: invoice.vat,
		total: invoice.total,
		subTotal: invoice.subTotal,
		notes: invoice.notes,
		status: invoice.status,
		invoiceNumber: invoice.invoiceNumber,
		type: invoice.type,
		totalAmountReceived: computeTotalReceived(invoice),
		client: invoice.client,
		paymentRecords: invoice.paymentRecords,
		createdAt: invoice.createdAt,
		businessDetails: invoice.businessDetails,
	}
}

export const getPublicInvoice = async (req, res) => {
	const { publicId } = req.params

	try {
		const invoice = await InvoiceModel.findOne({ publicId })

		if (!invoice) return res.status(404).json({ message: 'Invoice not found' })

		// Backfill publicId if missing (should be rare since we query by it)
		if (!invoice.publicId) {
			invoice.publicId = generatePublicId()
			await invoice.save()
		}

		return res.status(200).json(sanitizeInvoiceForPublic(invoice))
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

export const payPublicInvoice = async (req, res) => {
	const { publicId } = req.params
	const { amount, paidBy, note, cardLast4 } = req.body || {}

	try {
		const invoice = await InvoiceModel.findOne({ publicId })
		if (!invoice) return res.status(404).json({ message: 'Invoice not found' })

		const total = Number(invoice.total || 0)
		const currentReceived = Number(computeTotalReceived(invoice) || 0)
		const balanceDue = Math.max(0, total - currentReceived)

		const amountNumber = Number(amount)
		if (!Number.isFinite(amountNumber) || amountNumber <= 0) {
			return res.status(400).json({ message: 'Invalid payment amount' })
		}

		if (amountNumber > balanceDue) {
			return res.status(400).json({ message: 'Amount exceeds balance due' })
		}

		// Mock payment gateway: do NOT store full card details.
		const last4 = typeof cardLast4 === 'string' ? cardLast4.trim().slice(-4) : ''

		const paymentRecord = {
			amountPaid: amountNumber,
			datePaid: new Date(),
			paymentMethod: 'Card (Mock)',
			note: `${note ? String(note) : 'Online payment'}${last4 ? ` (**** ${last4})` : ''}`,
			paidBy: paidBy ? String(paidBy) : invoice?.client?.name,
		}

		const newTotalReceived = currentReceived + amountNumber
		const newStatus = newTotalReceived >= total ? 'Paid' : newTotalReceived > 0 ? 'Partial' : invoice.status

		const updatedInvoice = await InvoiceModel.findOneAndUpdate(
			{ publicId },
			{
				$push: { paymentRecords: paymentRecord },
				$set: {
					totalAmountReceived: newTotalReceived,
					status: newStatus,
				},
			},
			{ new: true }
		)

		return res.status(200).json({
			message: 'Payment processed',
			invoice: sanitizeInvoiceForPublic(updatedInvoice),
		})
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}
