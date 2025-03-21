// currency of day
const USD = 5.71
const EUR = 6.19
const GBP = 7.39

// Obtaining form's elements 
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const footer = document.querySelector("main footer")
const description = document.getElementById("description")
const result = document.getElementById("result")

// Manipulating input amount to receive only numbers
amount.addEventListener("input", () => {
  const hasCharactersRegex = /\D+/g
  amount.value = amount.value.replace(hasCharactersRegex, "")
})

form.onsubmit = (event) => {
  event.preventDefault()

  switch (currency.value) {
    case "USD":
      convertCurrency(amount.value, USD, "US$")
      break
    case "EUR":
      convertCurrency(amount.value, EUR, "€")
      break
    case "GBP":
      convertCurrency(amount.value, EUR, "£")
      break
  } 
}

// Function to convert currency
function convertCurrency(amount, price, symbol) {
  try {
    // Displaying the currency rate
    description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`
    // Calculate total
    let total = amount * price

    // Verify if result is not a number
    if(isNaN(total)) {
      return alert ("Por favor, digite o valor corretamente para convert.")
    }

    // convert to pt_BR format
    total = formatCurrencyBRL(total).replace("R$", "")
    // Display total result
    result.textContent = `${total} Reais`

    // Add class to display result to the element footer
    footer.classList.add("show-result")
    
  } catch (error) {
    console.log(error)
    // Remove class to display result to the element footer
    footer.classList.remove("show-result")
    alert("It wasn't possible to convert, try again latter.")
  }
}

// Format currency to real brazilian
function formatCurrencyBRL(value) {
  // First convert to number to format to pt-BR format
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
}