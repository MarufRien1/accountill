import React, { useEffect } from 'react'
import { toCommas } from '../../utils/utils'
import styles from './Dashboard.module.css'
import { useHistory, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getInvoicesByUser } from '../../actions/invoiceActions'
import Empty from '../svgIcons/Empty'
import Chart from './Chart'
// import Donut from './Donut'
import moment from 'moment'
import { Check, Pie, Bag, Card, Clock, Frown } from './Icons'
import Spinner from '../Spinner/Spinner'
import { Box, Container, Grid, Paper, Typography } from '@material-ui/core'


const Dashboard = () => {

    const location = useLocation()
    const history = useHistory()
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'))
    const { invoices, isLoading } = useSelector((state) => state?.invoices)
    // const unpaid = invoices?.filter((invoice) => (invoice.status === 'Unpaid') || (invoice.status === 'Partial'))
    const overDue = invoices?.filter((invoice) => invoice.dueDate <= new Date().toISOString())


    let paymentHistory = []
    for (let i = 0; i < invoices.length; i++) {
        let history = []
        if (invoices[i].paymentRecords !== undefined) {
            history = [...paymentHistory, invoices[i].paymentRecords]
            paymentHistory = [].concat.apply([], history);
        }

    }


    //sort payment history by date
    const sortHistoryByDate = paymentHistory.sort(function (a, b) {
        var c = new Date(a.datePaid);
        var d = new Date(b.datePaid);
        return d - c;
    });

    const recentPayments = sortHistoryByDate.slice(0, 10)


    let totalPaid = 0
    for (let i = 0; i < invoices.length; i++) {
        if (invoices[i].totalAmountReceived !== undefined) {
            totalPaid += invoices[i].totalAmountReceived
        }

    }

    let totalAmount = 0
    for (let i = 0; i < invoices.length; i++) {
        totalAmount += invoices[i].total
    }


    useEffect(() => {
        dispatch(getInvoicesByUser({ search: user?.result._id || user?.result?.googleId }));
        // eslint-disable-next-line
    }, [location, dispatch]);


    const unpaidInvoice = invoices?.filter((invoice) => invoice.status === 'Unpaid')
    const paid = invoices?.filter((invoice) => invoice.status === 'Paid')
    const partial = invoices?.filter((invoice) => invoice.status === 'Partial')

    if (!user) {
        history.push('/login')
    }


    if (isLoading) {
        return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '20px' }}>
            <Spinner />
        </div>
    }

    if (invoices.length === 0) {
        return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '20px' }}>
            {/* <Spinner /> */}
            <Empty />
            <p style={{ padding: '40px', color: 'gray' }}>Nothing to display. Click the plus icon to start creating</p>
        </div>
    }


    return (
        <Container maxWidth="lg" className={styles.pageContainer}>
            <Box className={styles.headerRow}>
                <Box>
                    <Typography variant="h5" className={styles.title}>Dashboard</Typography>
                    <Typography variant="body2" className={styles.subtitle}>
                        Track revenue, invoice status, and recent payments.
                    </Typography>
                </Box>
            </Box>

            <section className={styles.stat}>
                <Grid container spacing={2} className={styles.statsGrid}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper className={`${styles.statCard} ${styles.primaryCard}`} elevation={1}>
                            <div>
                                <Typography className={styles.statValue}>{toCommas(totalPaid)}</Typography>
                                <Typography className={styles.statLabel}>Payment received</Typography>
                            </div>
                            <div className={styles.statIcon}><Check /></div>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Paper className={styles.statCard} elevation={1}>
                            <div>
                                <Typography className={styles.statValue}>{toCommas(totalAmount - totalPaid)}</Typography>
                                <Typography className={styles.statLabel}>Pending amount</Typography>
                            </div>
                            <div className={styles.statIcon}><Pie /></div>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Paper className={styles.statCard} elevation={1}>
                            <div>
                                <Typography className={styles.statValue}>{toCommas(totalAmount)}</Typography>
                                <Typography className={styles.statLabel}>Total amount</Typography>
                            </div>
                            <div className={styles.statIcon}><Bag /></div>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Paper className={styles.statCard} elevation={1}>
                            <div>
                                <Typography className={styles.statValue}>{invoices.length}</Typography>
                                <Typography className={styles.statLabel}>Total invoices</Typography>
                            </div>
                            <div className={styles.statIcon}><Card /></div>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Paper className={`${styles.statCard} ${styles.successCard}`} elevation={1}>
                            <div>
                                <Typography className={styles.statValue}>{paid.length}</Typography>
                                <Typography className={styles.statLabel}>Paid invoices</Typography>
                            </div>
                            <div className={styles.statIcon}><Check /></div>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Paper className={styles.statCard} elevation={1}>
                            <div>
                                <Typography className={styles.statValue}>{partial.length}</Typography>
                                <Typography className={styles.statLabel}>Partially paid</Typography>
                            </div>
                            <div className={styles.statIcon}><Pie /></div>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Paper className={styles.statCard} elevation={1}>
                            <div>
                                <Typography className={styles.statValue}>{unpaidInvoice.length}</Typography>
                                <Typography className={styles.statLabel}>Unpaid invoices</Typography>
                            </div>
                            <div className={styles.statIcon}><Frown /></div>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Paper className={styles.statCard} elevation={1}>
                            <div>
                                <Typography className={styles.statValue}>{overDue.length}</Typography>
                                <Typography className={styles.statLabel}>Overdue</Typography>
                            </div>
                            <div className={styles.statIcon}><Clock /></div>
                        </Paper>
                    </Grid>
                </Grid>
            </section>

            {paymentHistory.length !== 0 && (
                <section className={styles.section}>
                    <Paper className={styles.sectionCard} elevation={1}>
                        <Typography variant="h6" className={styles.sectionTitle}>Payment history</Typography>
                        <Chart paymentHistory={paymentHistory} />
                    </Paper>
                </section>
            )}

            <section className={styles.section}>
                <Box className={styles.sectionHeader}>
                    <Typography variant="h6" className={styles.sectionTitle}>
                        {paymentHistory.length ? 'Recent payments' : 'Recent payments'}
                    </Typography>
                    <Typography variant="body2" className={styles.sectionSubtitle}>
                        {paymentHistory.length ? 'Latest 10 payments across all invoices.' : 'No payment received yet.'}
                    </Typography>
                </Box>

                <Paper className={styles.tableCard} elevation={1}>
                    <div className={styles.table}>
                        <table>
                            <tbody>
                                {paymentHistory.length !== 0 && (
                                    <tr>
                                        <th></th>
                                        <th>Paid by</th>
                                        <th>Date</th>
                                        <th>Amount</th>
                                        <th>Method</th>
                                        <th>Note</th>
                                    </tr>
                                )}

                                {recentPayments.map((record) => (
                                    <tr className={styles.tableRow} key={record._id}>
                                        <td><button>{record?.paidBy?.charAt(0)}</button></td>
                                        <td>{record.paidBy}</td>
                                        <td>{moment(record.datePaid).format('MMM D, YYYY')}</td>
                                        <td><span className={styles.amountPositive}>{toCommas(record.amountPaid)}</span></td>
                                        <td>{record.paymentMethod}</td>
                                        <td className={styles.noteCell}>{record.note}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Paper>
            </section>
        </Container>
    )
}

export default Dashboard
