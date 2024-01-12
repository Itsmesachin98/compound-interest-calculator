const inputContainer = document.querySelectorAll(".input-container");
const currencyStats = document.getElementById("currency-stats");
const currencyIcon = document.querySelector(".currency-icon");

currencyStats.addEventListener("click", () => {
    const index = currencyStats.selectedIndex;
    const value = currencyStats.options[index].innerText;

    if (value === "₹") {
        currencyIcon.innerText = "₹";
    } else if (value === "$") {
        currencyIcon.innerText = "$";
    } else {
        currencyIcon.innerText = "₹";
    }
});

const toggleAnimationClass = (value) => {
    value.addEventListener("click", () => {
        value.classList.add("box-shadow-animation");

        document.body.addEventListener("click", (evt) => {
            if (!value.contains(evt.target)) {
                value.classList.remove("box-shadow-animation");
            }
        });
    });
};

for (let container of inputContainer) {
    toggleAnimationClass(container);
}
