let userPin = ''; 
let currentOption = ''; 
let balance = 59000; 

function toggleVisibility(pinId) {
  const pinInput = document.getElementById(pinId);
  pinInput.type = pinInput.type === 'password' ? 'text' : 'password';
}

function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
}

function setPin() {
  const pinInput = document.getElementById('setPin').value;
  if (pinInput.length === 4 && /^\d{4}$/.test(pinInput)) {
    userPin = pinInput;
    alert("PIN set successfully!");
    showScreen('cardInsertScreen');
  } else {
    alert("Please enter a valid 4-digit PIN.");
  }
}

function insertCard() {
  alert("Card inserted successfully. Please enter your PIN.");
  showScreen('pinVerifyScreen');
}


function verifyPin() {
  const enteredPin = document.getElementById('verifyPin').value;
  if (enteredPin === userPin) {
    alert("PIN verified successfully!");
    showScreen('optionsScreen');
  } else {
    alert("Incorrect PIN. Please try again.");
  }
}

function resetPin() {
  showScreen('welcomeScreen');
  alert("Please set a new PIN.");
}

function selectOption(option) {
  currentOption = option;
  const transactionTitle = document.getElementById('transactionTitle');
  const amountInput = document.getElementById('amount');
  const accountNumberInput = document.getElementById('accountNumber');

  amountInput.value = ''; 
  amountInput.placeholder = 'Enter Amount'; 
  amountInput.style.display = 'none';
  accountNumberInput.value = ''; 
  accountNumberInput.style.display = 'none';

  switch (option) {
    case 'deposit':
      transactionTitle.innerText = 'Deposit';
      amountInput.style.display = 'block';
      break;
    case 'withdraw':
      transactionTitle.innerText = 'Withdraw';
      amountInput.style.display = 'block';
      break;
    case 'transfer':
      transactionTitle.innerText = 'Transfer Money';
      amountInput.style.display = 'block';
      accountNumberInput.style.display = 'block';
      accountNumberInput.placeholder = 'Enter Account Number';
      break;
    case 'checkBalance':
      transactionTitle.innerText = 'Check Balance';
      alert(`Your remaining balance is: ${balance}`);
      showScreen('thankYouScreen');
      return;
  }

  showScreen('transactionScreen');
}

function completeTransaction() {
  const amount = parseFloat(document.getElementById('amount').value);
  const accountNumber = document.getElementById('accountNumber').value;

  switch (currentOption) {
    case 'deposit':
      if (amount > 0) {
        balance += amount;
        alert(`Deposited: ${amount}. New Balance: ${balance}`);
        showScreen('optionsScreen');
      } else {
        alert("Please enter a valid amount.");
      }
      break;

    case 'withdraw':
      if (amount > 0 && amount <= balance) {
        balance -= amount;
        alert(`Withdrew: ${amount}. Remaining Balance: ${balance}`);
        showScreen('optionsScreen');
      } else {
        alert("Insufficient funds or invalid amount.");
      }
      break;

    case 'transfer':
      if (amount > 0 && accountNumber) {
        alert(`Transferred ${amount} to account: ${accountNumber}`);
        showScreen('thankYouScreen');
      } else {
        alert("Please enter a valid amount and account number.");
      }
      break;
  }
}
