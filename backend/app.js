const express = require("express");
const app = express();
const cors = require("cors");
const {
    validatePrincipal,
    validateRate,
    validateTime,
    validateDeposits,
    validateChoice,
} = require("./validators");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.post(
    "/investment",
    [
        validatePrincipal,
        validateRate,
        validateTime,
        validateDeposits,
        validateChoice,
    ],
    async (req, res) => {
        try {
            const { principal, time, deposits, choice } = req.body;
            let { rate } = req.body;
            rate = Number(rate) / 100;

            let output;

            if (deposits === "") {
                // Case 1: Empty
                output = calculateWithoutDeposits(
                    Number(principal),
                    rate,
                    Number(time)
                );
            } else {
                // Case 2: Valid
                output = calculateWithDeposits(
                    Number(principal),
                    rate,
                    Number(time),
                    Number(deposits),
                    choice
                );
            }

            return res.json({
                success: true,
                futureValue: output.futureValue,
                interestEarned: output.interestEarned,
            });
        } catch (err) {
            console.error("Server error", err);
            res.status(500).json({ success: false, message: "Server error" });
        }
    }
);

function calculateWithoutDeposits(principal, rate, time) {
    const futureValue = principal * Math.pow(1 + rate / 12, time * 12);
    const interestEarned = futureValue - principal;

    return {
        futureValue: futureValue.toFixed(2),
        interestEarned: interestEarned.toFixed(2),
    };
}

function calculateWithDeposits(principal, rate, time, deposits, choice) {
    let mutualAmount = calculateWithoutDeposits(principal, rate, time);
    let depositsAmount;
    let futureValue, interestEarned;

    if (choice === "year") {
        const g = Math.pow(1 + rate / 12, 12);
        depositsAmount = deposits * ((Math.pow(g, time) - 1) / (g - 1));
        futureValue = Number(mutualAmount.futureValue) + depositsAmount;
        interestEarned = futureValue - (principal + deposits * time);
    } else {
        depositsAmount =
            deposits * ((Math.pow(1 + rate / 12, time * 12) - 1) / (rate / 12));
        futureValue = Number(mutualAmount.futureValue) + depositsAmount;
        interestEarned = futureValue - (principal + deposits * time * 12);
    }

    return {
        futureValue: futureValue.toFixed(2),
        interestEarned: interestEarned.toFixed(2),
    };
}

app.listen(3000, () => console.log(`LISTENING ON PORT 3000`));
