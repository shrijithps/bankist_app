const loginButton = document.querySelector('.login_arrow');
const loginText = document.querySelector('.login_text');
const userID = document.querySelector('.user_id');
const userPassword = document.querySelector('.user_password')
const mainContainer = document.querySelector('.container');
const entriesUI = document.querySelector('.entries')
const currentBalanceC = document.querySelector('.currentBalance')
const entryAmount = document.querySelectorAll('.entry_amount');
const entry = document.querySelectorAll('.entry')
const creditC = document.querySelector('.credit_o');
const debitC = document.querySelector('.debit_o');
const countdownElement = document.getElementById("countdown");

var today = new Date();
var dateString = today.toDateString();
document.getElementById("date").textContent = dateString;
let totalBalance = 0;
let totalBalanceC = 0;
let creditAmount = 0;
let debitAmount = 0;
let currentBalance = 0; // Global balance tracker
let transactions = [];
let timeLeft = 10; // Set the countdown time (in seconds)
let timer = 0;



loginButton.addEventListener('click', function(){
    if(userID.value.trim() === '' && userPassword.value.trim() ===''){
        userID.style.border = '2px solid red';
        userPassword.style.border = '2px solid red';
    }
    else if(userID.value === 'js' && userPassword.value=== '1111'){
        toastMessage();
        userID.style.border = '';
        userPassword.style.border = '';
        userID.value = '';
        userPassword.value = '';
        loginText.textContent = "Good Morning! Shrijith";
        mainContainer.style.visibility = 'visible';
        displayTotalBalance();
        calculateCreditDebit();
        startTimer();
    }
})

function toastMessage(){
    Toastify({
        text: "Success",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#4CAF50",
    }).showToast();
}

function displayTotalBalance(){
    totalBalance =  calculateTotalBalance();
    document.querySelector(".currentBalance").textContent = '$'+totalBalance;
}

function handleTransaction(type) {
    let amountInput = 0;
    if(type==='WITHDRAWL'){
        amountInput = document.getElementById("amount");
    }
    else{
        amountInput = document.getElementById("loan_amount");
    }

    let amount = parseFloat(amountInput.value);  
    document.querySelector(".currentBalance").textContent = '$'+totalBalance + amount;

    let transaction = {
        date: new Date().toLocaleDateString(),
        amount: `${amount+'$'}`,
        type : type
    };

    transactions.push(transaction)
    updateEntriesUI();
 }

 function updateEntriesUI() {
    let entriesContainer = document.querySelector(".entries"); 

    if (!entriesContainer) {
        console.error("Container '.entries' not found");
        return;
    }

    if (!Array.isArray(transactions)) {
        console.error("transactions is not defined or not an array");
        return;
    }

    // Loop through transactions and re-add them
    transactions.forEach(tx => {
        let entryDiv = document.createElement("div");
        entryDiv.classList.add("entry");

        let trasactionType = document.createElement('div');
        trasactionType.classList.add('transaction_type');
        trasactionType.textContent = tx.type;

        if(tx.type === 'WITHDRAWL'){
            trasactionType.style.backgroundColor = "red"
            trasactionType.style.fontSize = "12px";
            trasactionType.style.borderRadius = "10px";
        }
        else{
            trasactionType.style.backgroundColor = "green"
            trasactionType.style.fontSize = "12px";
            trasactionType.style.borderRadius = "10px";
        }


        let dateDiv = document.createElement("div");
        dateDiv.classList.add("entry_date");
        dateDiv.textContent = tx.date;

        let amountDiv = document.createElement("div");
        amountDiv.classList.add("entry_amount");
        amountDiv.textContent = tx.amount;

        // Append all divs to entry
        entryDiv.appendChild(trasactionType);
        entryDiv.appendChild(dateDiv);
        entryDiv.appendChild(amountDiv);
        
        entriesContainer.appendChild(entryDiv);
    });
}


function calculateTotalBalance(){
    totalBalanceC = 0;
    entryAmount.forEach((value)=>{
        totalBalanceC += (Number)(value.textContent.replace('$', ''));
    })
    return totalBalanceC;
}

function calculateCreditDebit(){
    creditAmount = 0;
    debitAmount = 0;
    entry.forEach(entry => {
        const type = entry.querySelector('.entry_type').textContent.trim().toLowerCase();
        const amountText = Number(entry.querySelector('.entry_amount').textContent.replace('$', ''));
        
        if(type==="deposit"){
            creditAmount += amountText;
        }
        else{
            debitAmount += amountText;
        }
    })

        creditC.textContent = creditAmount;
        debitC.textContent = debitAmount;

    }

    function sortEntries(order="asc"){
        const container = document.querySelector('.entries');
        const entries = Array.from(document.querySelectorAll('.entry'));

        entries.sort((a,b) => {
            const dateA = parseFloat(a.querySelector(".entry_amount").textContent.trim().replace('$', ''));            ;
            const dateB = parseFloat(b.querySelector(".entry_amount").textContent.trim().replace('$', ''));
            return order==="asc" ? dateA-dateB : dateB-dateA;
        })

        const fragment = document.createDocumentFragment();
    entries.forEach(entry => fragment.appendChild(entry));

    container.innerHTML = "";
    container.appendChild(fragment); 

    }


    let sortOrder = "asc";

function toggleSort() {
    if (sortOrder === "asc") {
        sortEntries("asc");
        document.querySelector(".sorting_a").innerHTML = "&darr;"; // Change to down arrow
        sortOrder = "desc";
    } else {
        sortEntries("desc");
        document.querySelector(".sorting_a").innerHTML = "&uarr;"; // Change to up arrow
        sortOrder = "asc";
    }
}

function updateTimer() {
    countdownElement.textContent = `Logging out in ${timeLeft} seconds`;

    if (timeLeft <= 0) {
        clearInterval(timer);
        mainContainer.style.visibility = 'hidden';
        return;
    }
    timeLeft--;
}


function startTimer() {
    timeLeft = 300;

    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}




let arr = new Map(['1','one'], 
    ['2','two'],
    ['3','three']
)

arr.forEach((key, value) => {
    console.log(key, value)
})