//const URL = 'http://localhost:5500/predict'
const URL = 'https://churn-service-jhcs.herokuapp.com/predict'
// const customer = {"contract": "two_year", "tenure": 12, "monthlycharges": 10}

const spanError = document.getElementById('error')
const spanPrediction = document.getElementById('pred')

var contract = document.getElementById('contract')
var tenure = document.getElementById('tenure')
var monthlycharges = document.getElementById('monthlycharges')

async function prediction() {
  customer = {
    "contract": contract.value,
    "tenure": Number(tenure.value),
    "monthlycharges": Number(monthlycharges.value)
  }
  console.log(contract.value)
  console.log(customer)
    const res = await fetch(URL, {
 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customer),
    });
    const data = await res.json();
    if (data.churn == true) {
      w='will';
    } else {
      w="won't";
    }
    console.log(JSON.stringify(customer))

    spanPrediction.innerHTML = 'The customer <b>'+ w + '</b> churn and the probability is of churn is: ' + Math.round(100*data.churn_probability).toString() + '%';
  
    console.log('Save')
    console.log(res)
    console.log(data)

    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
      }
}

// <script src="https://platform.linkedin.com/badges/js/profile.js" async defer type="text/javascript"></script>