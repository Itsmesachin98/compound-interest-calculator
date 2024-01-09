const principle = document.getElementById("principle");
const rate = document.getElementById("rate");
const year = document.getElementById("year");
const deposit = document.getElementById("deposit");
const button = document.getElementById("button");
const options = document.getElementById("options");

// This function triggers when the calculate button is clicked
button.addEventListener("click", () => {
    sendDataToServer();
});

// This function sends the data to the backend server
const sendDataToServer = async () => {
    const allInput = {
        principle: principle.value,
        rate: rate.value,
        year: year.value,
        deposit: deposit.value,
        options: options.value,
    };

    try {
        const response = await fetch("http://localhost:8080/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(allInput),
        });

        const result = await response.json();
        console.log(result);
    } catch (err) {
        console.log("Error occured: ", err);
    }
};
