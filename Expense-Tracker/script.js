const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const list = document.getElementById('list');
const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const dateInput = document.getElementById('date');
const category = document.getElementById('category');

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function addTransaction(e) {
  e.preventDefault();
  const transaction = {
    id: Date.now(),
    text: text.value,
    amount: +amount.value,
    date: dateInput.value,
    category: category.value,
  };
  transactions.push(transaction);
  updateLocalStorage();
  renderTransactions();
  form.reset();
}

function removeTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  updateLocalStorage();
  renderTransactions();
}

function renderTransactions() {
  list.innerHTML = "";
  transactions.forEach(t => {
    const sign = t.amount > 0 ? "+" : "-";
    const li = document.createElement("li");
    li.classList.add(t.amount > 0 ? "plus" : "minus");
    li.innerHTML = `
      ${t.text} (${t.category}) [${t.date}] 
      <span>${sign}₹${Math.abs(t.amount)}</span> 
      <span class="delete-btn" onclick="removeTransaction(${t.id})">x</span>`;
    list.appendChild(li);
  });
  updateValues();
  drawChart();
}

function updateValues() {
  const amounts = transactions.map(t => t.amount);
  const total = amounts.reduce((acc, val) => acc + val, 0).toFixed(2);
  const inc = amounts.filter(a => a > 0).reduce((acc, a) => acc + a, 0).toFixed(2);
  const exp = amounts.filter(a => a < 0).reduce((acc, a) => acc + a, 0).toFixed(2);

  balance.innerText = `₹${total}`;
  income.innerText = `+₹${inc}`;
  expense.innerText = `-₹${Math.abs(exp)}`;
}

function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

form.addEventListener('submit', addTransaction);

renderTransactions();
