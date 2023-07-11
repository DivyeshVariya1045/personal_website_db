module.exports = (newObj) => {
  return `
 <!DOCTYPE html>
<html>
<head>
<title>Homely Solution</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
</head>
<body>
<div class="container">
  <div class="card">
<div class="card-header">
Invoice
<strong>${newObj.booking.booking_date}</strong> 

</div>
<div class="card-body">
<div class="row mb-4">


<div class="col-sm-6">
<h6 class="mb-3">To:</h6>
<div>
<strong>${newObj.booking.firstName}   ${newObj.booking.lastName}</strong>
</div>
<div>${newObj.booking.address}</div>
<div>${newObj.booking.city}</div>
<div>Email:${newObj.booking.email}</div>
<div>Mo No:${newObj.booking.mobileNo}</div>
</div>
</div>

<div class="table-responsive-sm">
<table class="table table-striped">
<thead>
<tr>
<th>#</th>
<th>Service</th>
<th>Description</th>
<th class="right">Price</th>
<th class="center">Qty</th>
</tr>
</thead>

${newObj.details.map((services, index) => {
  return `<tbody>
<tr>
<td>${index + 1}</td>
${services.service.map((item) => {
  return `<td class="left strong">${item.s_name}</td>
<td class="left">${item.s_desc}</td>
<td class="right">${item.price}</td>
<td class="center">${services.qty}</td></tr>`;
})}


</tbody>`;
})}

</table>
</div>
<div class="row">
<div class="col-lg-4 col-sm-5">

</div>

<div class="col-lg-4 col-sm-5 ml-auto">
<table class="table table-clear">
<tbody>
<tr>
<td class="left">
<strong>Subtotal</strong>
</td>
<td class="right">${newObj.booking.total_amt}</td>
</tr>


<td class="left">
<strong>Total</strong>
</td>
<td class="right">
<strong>${newObj.booking.total_amt}</strong>
</td>
</tr>
</tbody>
</table>

</div>

</div>

</div>
</div>
</div>
</body>
</html>
`;
};
