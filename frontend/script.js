(() => {
    "use strict";

    const form = document.getElementById("details");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        if (!form.checkValidity()) {
            // Invalid form → show Bootstrap feedback
            e.stopPropagation();
            form.classList.add("was-validated");
            return;
        }

        // Form is valid → collect values
        const principal = document.getElementById("principal").value;
        const rate = document.getElementById("rate").value;
        const time = document.getElementById("time").value;
        const deposits = document.getElementById("deposits").value;
        const choice = document.getElementById("choice").value;

        try {
            const res = await fetch(
                "https://compound-interest-calculator-v17c.onrender.com/investment",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        principal,
                        rate,
                        time,
                        deposits,
                        choice,
                    }),
                }
            );

            const data = await res.json();

            if (data.success) {
                if (!document.getElementById("output-container")) {
                    renderOutput();
                }
                injectValues(data.futureValue, data.interestEarned, principal);
            } else {
                alert(data.message);
                if (document.getElementById("output-container")) {
                    injectValues("NaN", "NaN", "NaN");
                }
            }
        } catch (err) {
            console.log("Server error: ", err);
            alert("Server error");
            if (document.getElementById("output-container")) {
                injectValues("NaN", "NaN", "NaN");
            }
        }
    });
})();

function renderOutput() {
    const outputContainer = document.createElement("div");
    outputContainer.classList.add(
        "d-flex",
        "flex-column",
        "flex-md-row",
        "gap-4"
    );
    outputContainer.id = "output-container";

    const spanTexts = ["Future Value", "Interest Earned", "Initial Value"];
    const spanIds = ["future-value", "interest-earned", "initial-value"];

    for (let i = 0; i <= 2; i++) {
        const div = document.createElement("div");
        div.classList.add(
            "flex-fill",
            "bg-primary",
            "text-white",
            "p-3",
            "rounded"
        );

        const span1 = document.createElement("span");
        span1.classList.add("d-block", "fs-5");
        span1.innerText = spanTexts[i];

        const span2 = document.createElement("span");
        span2.classList.add("d-block", "fs-2");
        span2.id = spanIds[i];

        div.appendChild(span1);
        div.appendChild(span2);

        outputContainer.appendChild(div);
    }

    document.getElementById("top-wrapper").appendChild(outputContainer);
}

function injectValues(futureValue, interestEarned, initialValue) {
    document.getElementById("future-value").innerText = futureValue;
    document.getElementById("interest-earned").innerText = interestEarned;
    document.getElementById("initial-value").innerText = initialValue;
}
