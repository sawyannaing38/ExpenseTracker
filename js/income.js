// DOM Selecting
const addBtn = document.querySelector(".addMore-btn");
const formContainer = document.querySelector(".forms");
const continueBtn = document.querySelector(".continue-btn");
const continueAnywayBtn = document.querySelector(".continue-btn2");

// State variable
let formCount = 1;
let warningMessage = false;
let monthyIncomeLists = [];

// const variables
const soruces = ["salary", "freelance", "pocketMoney"];

// For Event
addBtn.addEventListener("click", function() {
    
    formCount += 1;

    if (formCount > 3)
    {
        return;
    }

    // Create another input form
    const div = getInputForm(formCount);

    // Adding to Dom
    formContainer.append(div);
})

continueBtn.addEventListener("click", function() 
{
    // Variables for storing user monthly income
    monthyIncomeLists = [];

    // Checking how many form
    const formCount = formContainer.childElementCount;

    // Loop throug that
    for (let i = 1; i <= formCount; i++)
    {
        // Getting amount, source and day 
        const amount = document.querySelector(`.amount${i}`).value;
        const source = document.querySelector(`.source${i}`).value;
        const day = document.querySelector(`.day${i}`).value;

        // Check empty input
        if (!amount || !source || !day)
        {
            warning(i);
            continue;
        }

        // Check valid input or not
        if (!isValidAmount(amount) || !isValidSource(source) || !isValidDay(day))
        {
            // Show warning message 
            warning(i);
            continue;
        }

        document.querySelector(`.warning${i}`).textContent = "";
        // Stores that data inside monthyIncomeLists
        const data = {
            "amount" : Number(amount),
            "source" : source,
            "day" : Number(day)
        };

        monthyIncomeLists.push(data);
    }

    if (warningMessage)
    {
        return;
    }

    // Stores that in local storage
    localStorage.setItem("monthlyIncome", JSON.stringify(monthyIncomeLists));

    // Navigate to another page
    window.location.href = "expense.html";
})

continueAnywayBtn.addEventListener("click", function() 
{
    // if the monthlyincoelists is not empty 
    if (monthyIncomeLists.length > 0)
    {
        // Store in local storage
        localStorage.setItem("monthlyIncome", JSON.stringify(monthyIncomeLists));
    }

    // Navigate to another page
    window.location.href = "expense.html";
})

// For Function
// For getting inputFor
function getInputForm(number)
{
    // Create a div
    const div = document.createElement("div");
    div.className = `form${number}`;

    div.innerHTML = `
        <div class="income-adding">
            <div class="amount-source">
                <div class="amount-container">
                    <span class="material-symbols-outlined">
                        paid
                    </span>
                    <input class="amount${number}" type="number" name="amount${number}" id="amount${number}" placeholder="Amount" min="0" autocomplete="off" autofocus>
                </div>
                <div class="source-container">
                    <span class="material-symbols-outlined">
                        crowdsource
                    </span>
                    <select name="source${number}" id="source${number}" class="source${number}">
                        <option value="" selected disabled>Choose Source</option>
                        <optgroup label="souce-lists">
                            <option value="salary">Salary</option>
                            <option value="freelance">Freelance</option>
                            <option value="pocketMoney">Pocket Money</option>
                        </optgroup>
                    </select>
                </div>
            </div>
            <div class="day-container">
                <span class="material-symbols-outlined">
                    calendar_today
                </span>
                <input type="number" class="day${number}" name="day${number}" id="day${number}" autocomplete="off" placeholder="Receive Day">
            </div>
        </div>
        <p class="warning${number}"></p>
    `

    return div;
}

// For warning user
function warning(number)
{
    // Warn the user 
    document.querySelector(`.warning${number}`).textContent = "Some Input are missing or invalid by click continue anway, we will only save valid input";
    continueAnywayBtn.style.display = "inline-block";
    warningMessage = true;
}

// For checking valid amount or not
function isValidAmount(number)
{
    const amount = Number(number);

    if (amount && amount > 0)
    {
        return true;
    }

    return false;
}

// For checking valid source or not
function isValidSource(source)
{
    if (soruces.includes(source))
    {
        return true;
    }

    return false;
}

// For checking valid day or not
function isValidDay(number)
{
    const day = Number(number);

    if (day && day >= 1 && day <= 31)
    {
        return true;
    }

    return false;
}