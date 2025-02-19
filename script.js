document
  .querySelector(".Calculate-Repayments")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission

    //  Get input values
    const amount = document.getElementById("amount").Value;
    const years = document.getElementById("years").value;
    const interest = document.getElementById("interest").value;
    const mortgageType = document.querySelector(
      'input[name="Mortgage_type"]:checked'
    );
    // Select the result container
    const resultContainer = document.querySelector(".container2");

    // Show error if any field is missing
    if (!amount || !years || !interest || !mortgageType) {
      document.getElementById("error-message").style.display = "block";
      return;
    }

    // Hide error message if inputs are valid
    document.getElementById("error-message").style.display = "none";

    // Calculate monthly payment
    const principal = parseFloat(amount);
    const rate = parseFloat(interest) / 100 / 12;
    const months = parseFloat(years) * 12;
    const monthlyPayment =
      mortgageType.value === "Repayment"
        ? (principal * rate) / (1 - Math.pow(1 + rate, -months))
        : principal * rate;

    // Replace content in the result section
    resultContainer.innerHTML = `
        <h1>Monthly Payment: £${monthlyPayment.toFixed(2)}</h1>
        <p>For a ${years}-year term at an interest rate of ${interest}%.</p>
        <p>Mortgage Type: ${mortgageType.value}</p>
    `;
  });
