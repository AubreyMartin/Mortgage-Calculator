import { useState } from "react";
import "../styles/MortgageCalculator.css";

const MortgageCalculator = () => {
  const [amount, setAmount] = useState("");
  const [years, setYears] = useState("");
  const [interest, setInterest] = useState("");
  const [mortgageType, setMortgageType] = useState("Repayment");
  const [repayments, setRepayments] = useState<number | null>(null);
  const [totalRepayments, setTotalRepayments] = useState<number | null>(null);
  const [error, setError] = useState("");

  const calculateRepayments = () => {
    if (!amount || !years || !interest) {
      setError("Please fill in all fields before calculating.");
      return;
    }
    setError("");

    const principal = parseFloat(amount);
    const yearlyRate = parseFloat(interest) / 100;
    const months = parseInt(years) * 12;
    const monthlyRate = yearlyRate / 12;

    if (mortgageType === "Repayment") {
      const monthlyPayment =
        (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
      setRepayments(monthlyPayment);
      setTotalRepayments(monthlyPayment * months);
    } else {
      setRepayments(principal * monthlyRate);
      setTotalRepayments(principal * months * monthlyRate);
    }
  };

  return (
    <form className="container">
      <div className="box1">
        <h3>Mortgage Calculator</h3>
        <button
          type="button"
          className="clearall"
          onClick={() => window.location.reload()}
        >
          Clear All
        </button>
      </div>

      <div className="box2">
        <p>Mortgage Amount</p>
        <div className="input-container">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <span className="currency-symbol">£</span>
        </div>
      </div>

      <div className="box3">
        <label>Mortgage Term</label>
        <label>Interest Rate</label>
        <div className="input-container">
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
          />
          <span className="years">years</span>
        </div>
        <div className="input-container">
          <input
            type="number"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
          />
          <span className="percentage-symbol">%</span>
        </div>
      </div>

      <div className="box4">
        <p>Mortgage Type</p>
        <div className="Repayment">
          <input
            type="radio"
            id="Repayment"
            name="Mortgage_type"
            value="Repayment"
            checked={mortgageType === "Repayment"}
            onChange={(e) => setMortgageType(e.target.value)}
          />
          <label htmlFor="Repayment">Repayment</label>
        </div>

        <div className="Interest-Only">
          <input
            type="radio"
            id="InterestOnly"
            name="Mortgage_type"
            value="Interest Only"
            checked={mortgageType === "Interest Only"}
            onChange={(e) => setMortgageType(e.target.value)}
          />
          <label htmlFor="InterestOnly">Interest Only</label>
        </div>
      </div>

      <div className="box5">
        <button
          type="button"
          className="Calculate-Repayments"
          onClick={calculateRepayments}
        >
          <img
            src="src/assets/assets/images/icon-calculator.svg"
            alt="icon"
            className="button-icon"
          />
          Calculate Repayments
        </button>
      </div>

      {error && (
        <div id="error-message" style={{ color: "red", textAlign: "center" }}>
          {error}
        </div>
      )}
      {/* Container 2  */}
      <div className="container2">
        {repayments !== null && totalRepayments !== null ? (
          <div>
            <h1>Your results</h1>
            <p>
              Your results are shown below based on the information you
              provided. To adjust the results, edit the form and click
              "calculate repayments" again.
            </p>
            <div className="Outputbox">
              <div className="monthlyrepayments">
                <label>Your monthly repayments</label>
                <br />
                <output>£{repayments.toFixed(2)} </output>
              </div>
              <div className="center-line"></div>
              <div className="totalrepayments">
                <label>Total you'll repay over the term</label>
                <br />
                <output>£{totalRepayments.toFixed(2)} </output>
              </div>
            </div>
          </div>
        ) : (
          <div className="before">
            <img
              src="src/assets/assets/images/illustration-empty.svg"
              className="Calculator"
            />
            <h1>Results shown here</h1>
            <p>
              Complete the form and click "calculate repayments" to see your
              monthly repayments.
            </p>
          </div>
        )}
      </div>
    </form>
  );
};

export default MortgageCalculator;
