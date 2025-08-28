const express = require("express");
const app = express();
const cors = require("cors");
const {
    validatePrincipal,
    validateRate,
    validateTime,
} = require("./validators");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.post(
    "/investment",
    [validatePrincipal, validateRate, validateTime],
    async (req, res) => {
        try {
            const { principal, time, choice } = req.body;
            let { rate } = req.body;
            rate = rate / 100;

            const futureValue = (principal * Math.pow(1 + rate, time)).toFixed(
                2
            );
            const interestEarned = (futureValue - principal).toFixed(2);

            res.json({ success: true, futureValue, interestEarned });
        } catch (err) {
            console.error("Server error", err);
            res.status(500).json({ success: false, message: "Server error" });
        }
    }
);

app.listen(3000, () => console.log(`LISTENING ON PORT 3000`));
