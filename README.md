# 📈 Compound Interest Calculator

A web-based **Compound Interest Calculator** that helps you project the **future value of investments** with or without additional deposits.  
Built with **Node.js + Express (backend)** and **HTML, CSS, JavaScript, Bootstrap (frontend)**.

🔗 **Live Site**: [wealthcalc.vercel.app](https://wealthcalc.vercel.app/)

---

## 🚀 Features

-   Calculate compound interest based on:
    -   **Initial investment (Principal)**
    -   **Annual interest rate**
    -   **Investment duration (Years)**
    -   **Additional deposits** (monthly or yearly)
-   Input validation on both **frontend and backend**
-   Clean and responsive UI using **Bootstrap 5**
-   Real-time calculation results:
    -   Future Value
    -   Interest Earned
    -   Initial Value
-   Robust backend with **Joi-based validation**

---

## 📂 Project Structure

```
compound-interest-calculator
│── frontend/              # Client-side code
│   ├── index.html         # Main UI
│   └── script.js          # Form handling & API integration
│
│── backend/               # Server-side code
│   ├── app.js             # Express server & API routes
│   ├── validators.js      # Joi validation middleware
│   ├── package.json
│   └── package-lock.json
│
│── .gitignore
│── README.md
```

---

## ⚙️ Tech Stack

**Frontend**

-   HTML5, CSS3
-   JavaScript (Vanilla JS)
-   Bootstrap 5

**Backend**

-   Node.js
-   Express.js
-   Joi (for validation)
-   CORS

**Deployment**

-   Frontend → [Vercel](https://vercel.com/)
-   Backend → [Render](https://render.com/)

---

## 📖 API Endpoints

### `POST /investment`

Calculates compound interest.

#### Request Body:

```json
{
    "principal": 10000,
    "rate": 10,
    "time": 5,
    "deposits": "2000",
    "choice": "year"
}
```

-   `principal` → Initial investment (number, required)
-   `rate` → Annual interest rate (number, required)
-   `time` → Time in years (number, required)
-   `deposits` → Additional deposit amount (string, can be empty)
-   `choice` → "year" or "month" (required if deposits provided)

#### Response (Success):

```json
{
    "success": true,
    "futureValue": "19562.03",
    "interestEarned": "9562.03"
}
```

#### Response (Error):

```json
{
    "success": false,
    "message": "Invalid rate"
}
```

---

## 🛠️ Local Setup

1. **Clone the repo**

    ```bash
    git clone https://github.com/Itsmesachin98/compound-interest-calculator.git
    cd compound-interest-calculator
    ```

2. **Backend Setup**

    ```bash
    cd backend
    npm install
    node app.js
    ```

    Server runs at: `http://localhost:3000`

3. **Frontend Setup**
    - Open `frontend/index.html` in a browser.
    - By default, frontend fetches results from `http://localhost:3000/investment`.

---

## ✅ Validation Rules

-   **Principal**: `1 – 1,000,000,000`
-   **Rate**: `1 – 100`
-   **Time**: `1 – 100` years
-   **Deposits**: empty OR `1 – 1,000,000,000`
-   **Choice**: `year` or `month`

---

## 📊 Example Calculations

-   **Principal**: ₹10,000
-   **Rate**: 10%
-   **Time**: 5 years
-   **Deposit**: ₹2,000 per year

👉 **Future Value** and **Interest Earned** are displayed instantly.

---

## 📜 License

This project is open-source and available under the **MIT License**.

---

## 🙌 Acknowledgments

-   [Bootstrap](https://getbootstrap.com/)
-   [Express](https://expressjs.com/)
-   [Vercel](https://vercel.com/)
-   [Render](https://render.com/)

---
