import moment from 'moment'

export default function (
  { name,
    address,
    phone,
    email,
    dueDate,
    date,
    id,
    notes,
    subTotal,
    type,
    vat,
    total,
    items,
    status,
    totalAmountReceived,
    balanceDue,
    company,
  }) {
  const balanceDueNumber = Number(String(balanceDue ?? '0').replace(/,/g, ''))
  return `
<!DOCTYPE html>
<html>
<head>
<style>

*, *::before, *::after {
  box-sizing: border-box;
}

@page {
  size: A4;
  margin: 12mm;
}

html, body {
  margin: 0;
  padding: 0;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

.invoice-container {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
  width: 186mm;
  max-width: 100%;
  margin: 0 auto;
  padding: 0;
}

.top {
  display: grid;
  grid-template-columns: 1fr 240px;
  gap: 16px;
  align-items: start;
  margin-bottom: 14px;
}

.brand {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.brand img {
  max-width: 140px;
  max-height: 60px;
  object-fit: contain;
}

.doc {
  text-align: right;
}

.doc h1 {
  margin: 0;
  font-size: 14px;
  letter-spacing: 0.5px;
}

.doc .muted {
  margin: 4px 0 0;
  font-size: 10px;
  color: #666;
}

.parties {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 12px;
}

.block {
  font-size: 10px;
  line-height: 1.35;
}

.block h3 {
  margin: 0 0 6px;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #666;
  font-weight: 700;
}

.block p {
  margin: 0;
}

.summaryBox {
  border: 1px solid #eee;
  border-radius: 6px;
  padding: 10px;
  font-size: 10px;
}

.summaryBox .row {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 3px 0;
}

.summaryBox .label {
  color: #666;
}

.summaryBox .value {
  font-weight: 700;
}

table {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

table td, table th {
  border: 1px solid rgb(247, 247, 247);
  padding: 10px;
}

table tr:nth-child(even){background-color: #f8f8f8;}

table tr:hover {background-color: rgb(243, 243, 243);}

table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #FFFFFF;
  color: rgb(78, 78, 78);
}

.summary {
  margin-top: 12px;
  margin-left: auto;
  width: 80mm;
  max-width: 100%;
  margin-bottom: 12px;
}

@media print {
  .invoice-container {
    width: auto;
    margin: 0;
  }
}

</style>
</head>
<body>
<div class="invoice-container">

<section class="top">
  <div class="brand">
    <div>
      ${company?.logo ? `<img src="${company?.logo}" alt="Company logo" />` : `<h2 style="margin:0; font-size: 14px;">${company?.businessName ? company?.businessName : (company?.name || '')}</h2>`}
    </div>
  </div>

  <div class="doc">
    <h1>${balanceDueNumber <= 0 ? 'Receipt' : type}</h1>
    <p class="muted">${id}</p>
    <div class="summaryBox" style="margin-top: 8px; text-align:left;">
      <div class="row"><span class="label">Status</span><span class="value">${status}</span></div>
      <div class="row"><span class="label">Date</span><span class="value">${moment(date).format('ll')}</span></div>
      <div class="row"><span class="label">Due Date</span><span class="value">${moment(dueDate).format('ll')}</span></div>
      <div class="row"><span class="label">Amount</span><span class="value">${total}</span></div>
    </div>
  </div>
</section>

<section class="parties">
  <div class="block">
    <h3>From</h3>
    <p><strong>${company?.businessName ? company?.businessName : (company?.name || '')}</strong></p>
    <p>${company?.email || ''}</p>
    <p>${company?.phoneNumber || ''}</p>
    <p>${company?.contactAddress || ''}</p>
  </div>

  <div class="block">
    <h3>Bill To</h3>
    <p><strong>${name || ''}</strong></p>
    <p>${email || ''}</p>
    <p>${phone || ''}</p>
    <p>${address || ''}</p>
  </div>
</section>

<table>
  <tr>
    <th style="font-size: 9px">Item</th>
    <th style="font-size: 9px">Quantity</th>
    <th style="font-size: 9px">Price</th>
    <th style="font-size: 9px">Discount(%)</th>
    <th style="text-align: right; font-size: 9px">Amount</th>
  </tr>

  ${(items || []).map((item) => (
    `  <tr>
    <td style="font-size: 9px">${item.itemName}</td>
    <td style="font-size: 9px">${item.quantity}</td>
    <td style="font-size: 9px">${item.unitPrice}</td>
    <td style="font-size: 9px">${item.discount}</td>
    <td style="text-align: right; font-size: 9px">${(item.quantity * item.unitPrice) - (item.quantity * item.unitPrice) * item.discount / 100}</td>
  </tr>`
  )).join('')
    }


</table>

<section class="summary">
    <table>
        <tr>
          <th style="font-size: 9px">Invoice Summary</th>
          <th></th>
        </tr>
        <tr>
          <td style="font-size: 9px">Sub Total</td>
          <td style="text-align: right; font-size: 9px; font-weight: 700">${subTotal}</td>
        </tr>

        <tr>
            <td style="font-size: 10px">VAT</td>
            <td style="text-align: right; font-size: 9px; font-weight: 700">${vat}</td>
          </tr>

        <tr>
            <td style="font-size: 10px">Total</td>
            <td style="text-align: right; font-size: 9px; font-weight: 700">${total}</td>
          </tr>

        <tr>
            <td style="font-size: 10px" >Paid</td>
            <td style="text-align: right; font-size: 9px; font-weight: 700">${totalAmountReceived}</td>
          </tr>

          <tr>
          <td style="font-size: 9px">Balance Due</td>
          <td style="text-align: right; font-size: 9px; font-weight: 700">${balanceDue}</td>
        </tr>
        
      </table>
  </section>
  <div>
      <hr>
      <h4 style="font-size: 9px">Note</h4>
      <p style="font-size: 9px">${notes}</p>
  </div>
</div>
</body>
</html>`
    ;
};