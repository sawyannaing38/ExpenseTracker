// DOM Selecting
const totalAmount = document.querySelector(".total-amount");
const incomeAmount = document.querySelector(".income-amount");
const expenseAmount = document.querySelector(".expense-amount");
const transitionContainer = document.querySelector(".transition-lists");

// const variables
const icons = {
    "salary" : "paid",
    "freelance" : "hub",
    "pocketMoney" : "money_bag",
    "rent" : "home",
    "food" : "lunch_dining",
    "waterBill" : "water_drop",
    "electricBill" : "electric_bolt",
    "phoneBill" : "call",
    "educationBill" : "school",
    "entertainment" : "sports_soccer",
    "clothes" : "apparel",
    "travel" : "map",
    "gift" : "redeem",
    "grocery" : "grocery",
    "maintaince" : "engineering",
    "scammed": "phishing",
    "alcohal" : "liquor",
    "smoke" : "vaping_rooms",
    "unregular" : "unknown_med"
}

// Event
document.addEventListener("DOMContentLoaded", function() {
    
    // Getting current month and year
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const day = today.getDate();

    // Getting transition for the current month
    let transitions = JSON.parse(localStorage.getItem(`${month}/${year}`));

    // if there is no transition lists
    if (!transitions)
    {
        transitions = [];

        // Getting monthly income and expense from local storage
        let monthlyIncome = JSON.parse(localStorage.getItem("monthlyIncome"));

        if (monthlyIncome)
        {
            for (const income of monthlyIncome)
            {
                transitions.push(income);
            }
        }

        let monthlyExpense = JSON.parse(localStorage.getItem("monthlyExpense"));

        if (monthlyExpense)
        {
            for (const expense of monthlyExpense)
            {
                transitions.push(expense);
            }
        }

        // Storing into local Storage
        localStorage.setItem(`${month}/${year}`, JSON.stringify(transitions));
    }

    // Calculate total income
    const totalIncome = transitions.reduce(function(total, transition){
        if (transition.type == "income" && transition.day <= day)
        {
            return total + transition.amount;
        }
        
        return total;
    }, 0);

    // Calcualte total expense
    const totalExpense = transitions.reduce(function(total, transition) {
        if (transition.type == "expense" && transition.day <= day)
        {
            return total + transition.amount;
        }

        return total;
    }, 0)

    // Calculate total balance
    const totalBalance = totalIncome - totalExpense;

    totalAmount.textContent = totalBalance;
    incomeAmount.textContent = totalIncome;
    expenseAmount.textContent = totalExpense;

    // Getting transitions for today and show on the page
    const todayTransitions = transitions.filter(function(transition) {
        return transition.day == day;
    })

    // if there is no transitions today
    if (todayTransitions.length == 0)
    {
        // Show no transitions
        const p = document.createElement("p");
        p.classList = "warning";
        p.textContent = "No Transitions for today";
        transitionContainer.append(p);
        return;
    }

    for (const todayTransition of todayTransitions)
    {
        // Getting div
        const transitionItem = getTransition(todayTransition.amount, todayTransition.type, todayTransition.source);

        // Adding to transition container
        transitionContainer.append(transitionItem);
    }

})

// Function part
function getTransition(amount, type, source)
{   
    // Craete a div
    const div = document.createElement("div");
    div.classList = `transition ${type == "income"? "good" : "bad"}`;

    div.innerHTML = `
        <div>
            <div class="transition-icon">
                <span class="material-symbols-outlined">
                    ${icons[source]}
                </span>
            </div>
            <h4 class="transition-source">${source}</h4>
        </div>
        <div>
            <span class="transition-amount">${amount}</span>
            <span class="transition-date">Today</span>
        </div>
    `;

    return div;

}