import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Paper, Typography, TextField, Button, Grid, Box } from '@material-ui/core'
import moment from 'moment'
import Spinner from '../Spinner/Spinner'
import { fetchPublicInvoice, payPublicInvoice } from '../../api'
import { toCommas } from '../../utils/utils'

const PayInvoice = () => {
	const { publicId } = useParams()

	const [invoice, setInvoice] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	const [payerName, setPayerName] = useState('')
	const [cardNumber, setCardNumber] = useState('')
	const [expiry, setExpiry] = useState('')
	const [cvc, setCvc] = useState('')
	const [amount, setAmount] = useState('')
	const [paying, setPaying] = useState(false)
	const [success, setSuccess] = useState('')

	const totalAmountReceived = useMemo(() => Number(invoice?.totalAmountReceived || 0), [invoice])
	const total = useMemo(() => Number(invoice?.total || 0), [invoice])
	const balanceDue = useMemo(() => Math.max(0, total - totalAmountReceived), [total, totalAmountReceived])

	useEffect(() => {
		let mounted = true

		const run = async () => {
			setLoading(true)
			setError('')
			setSuccess('')

			try {
				const res = await fetchPublicInvoice(publicId)
				if (!mounted) return
				setInvoice(res.data)
				setPayerName(res.data?.client?.name || '')
				setAmount(String(Math.max(0, Number(res.data?.total || 0) - Number(res.data?.totalAmountReceived || 0))))
			} catch (e) {
				if (!mounted) return
				setError(e?.response?.data?.message || 'Failed to load invoice')
			} finally {
				if (mounted) setLoading(false)
			}
		}

		run()
		return () => {
			mounted = false
		}
	}, [publicId])

	const handlePay = async (e) => {
		e.preventDefault()
		setPaying(true)
		setError('')
		setSuccess('')

		try {
			const trimmed = String(cardNumber).replace(/\s+/g, '')
			const last4 = trimmed.slice(-4)

			// Mock gateway: we do not send/store full card details.
			const payload = {
				amount: Number(amount),
				paidBy: payerName,
				note: 'Online payment',
				cardLast4: last4,
			}

			await new Promise((r) => setTimeout(r, 700))
			const res = await payPublicInvoice(publicId, payload)
			setInvoice(res.data?.invoice)
			setSuccess('Payment successful (mock).')
			setCardNumber('')
			setExpiry('')
			setCvc('')
		} catch (e) {
			setError(e?.response?.data?.message || 'Payment failed')
		} finally {
			setPaying(false)
		}
	}

	if (loading) return <Spinner />

	if (error) {
		return (
			<Container maxWidth="sm" style={{ paddingTop: 40, paddingBottom: 40 }}>
				<Paper style={{ padding: 28 }} elevation={1}>
					<Typography variant="h6">Unable to load invoice</Typography>
					<Typography style={{ marginTop: 12, color: '#E11D48' }}>{error}</Typography>
				</Paper>
			</Container>
		)
	}

	if (!invoice) return null

	return (
		<Container maxWidth="sm" style={{ paddingTop: 40, paddingBottom: 56 }}>
			<Box style={{ textAlign: 'center', marginBottom: 16 }}>
				<Typography variant="overline" style={{ color: '#64748B', letterSpacing: 1.2 }}>
					Accountill Payments
				</Typography>
			</Box>
			<Paper style={{ padding: 28 }} elevation={1}>
				<Typography variant="h5" gutterBottom style={{ fontWeight: 800 }}>
					Pay invoice {invoice.invoiceNumber ? `#${invoice.invoiceNumber}` : ''}
				</Typography>

				<Typography variant="body2" style={{ color: '#64748B' }} gutterBottom>
					Due {invoice.dueDate ? moment(invoice.dueDate).format('MMMM Do YYYY') : '—'}
				</Typography>

				<Grid container spacing={2} style={{ marginTop: 8, marginBottom: 20 }}>
					<Grid item xs={6}>
						<Typography variant="overline" style={{ color: '#64748B' }}>
							Total
						</Typography>
						<Typography variant="h6">{toCommas(total)}</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography variant="overline" style={{ color: '#64748B' }}>
							Balance Due
						</Typography>
						<Typography variant="h6">{toCommas(balanceDue)}</Typography>
					</Grid>
				</Grid>

				{success && <Typography style={{ color: '#16A34A', marginBottom: 12 }}>{success}</Typography>}

				{error && <Typography style={{ color: '#E11D48', marginBottom: 12 }}>{error}</Typography>}

				<form onSubmit={handlePay}>
					<TextField
						label="Name"
						variant="outlined"
						fullWidth
						style={{ marginBottom: 12 }}
						value={payerName}
						onChange={(e) => setPayerName(e.target.value)}
					/>

					<TextField
						label="Amount"
						type="number"
						variant="outlined"
						fullWidth
						style={{ marginBottom: 12 }}
						inputProps={{ min: 0, step: '0.01' }}
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
					/>

					<TextField
						label="Card Number (mock)"
						variant="outlined"
						fullWidth
						style={{ marginBottom: 12 }}
						placeholder="4242 4242 4242 4242"
						value={cardNumber}
						onChange={(e) => setCardNumber(e.target.value)}
					/>

					<Grid container spacing={2}>
						<Grid item xs={6}>
							<TextField
								label="Expiry"
								variant="outlined"
								fullWidth
								placeholder="MM/YY"
								value={expiry}
								onChange={(e) => setExpiry(e.target.value)}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								label="CVC"
								variant="outlined"
								fullWidth
								placeholder="123"
								value={cvc}
								onChange={(e) => setCvc(e.target.value)}
							/>
						</Grid>
					</Grid>

					<Typography variant="caption" style={{ display: 'block', color: '#64748B', marginTop: 12 }}>
						This is a mock payment form. Card details are not stored.
					</Typography>

					<Button
						type="submit"
						variant="contained"
						color="primary"
						disabled={paying || balanceDue <= 0}
						style={{ marginTop: 16, width: '100%' }}
					>
						{balanceDue <= 0 ? 'Already Paid' : paying ? 'Processing…' : 'Pay Now'}
					</Button>
				</form>
			</Paper>
		</Container>
	)
}

export default PayInvoice
