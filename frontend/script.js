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
        const choice = document.getElementById("choice").value;

        try {
            const res = await fetch("http://localhost:3000/investment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ principal, rate, time, choice }),
            });

            const data = await res.json();

            if (data.success) {
                console.log(data);
            } else {
                alert(data.message);
            }
        } catch (err) {
            console.log("Server error: ", err);
            alert("Server error");
        }
    });
})();
