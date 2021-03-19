const transacoesUL = document.querySelector('#transactions')
const displayReceitas = document.querySelector('#money-plus')
const displayDespesas = document.querySelector('#money-minus')
const displayBalance = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')



const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))
let transactions = localStorage.getItem('transactions') != null ? localStorageTransactions : []

const removeTransaction = ID => {
    transactions = transactions.filter(transaction => transaction.id != ID)
    updateLocalStorage()
    init()
}

const addTransacoes = transaction => {

    const operator = transaction.amount < 0 ? '-' : '+'
    const CSSclass = transaction.amount < 0 ? 'minus' : 'plus'
    const amountSemOperador = Math.abs(transaction.amount)
    const li = document.createElement('li')

    li.classList.add(CSSclass)
    li.innerHTML = `    
     ${transaction.name} <span>${operator} R$ ${amountSemOperador}</span><button class="delete-btn" onClick="removeTransaction(${transaction.id})">x</button>`

     transacoesUL.append(li) 
}

const updateBalance = () => {
    const transactionsAmounts = transactions
        .map(transaction => transaction.amount)
    const total = transactionsAmounts
        .reduce((accumulator, transaction) => accumulator + transaction, 0).toFixed(2)
    const receita = transactionsAmounts
        .filter(value => value > 0)
        .reduce((accumulator, value) => accumulator + value, 0)
        .toFixed(2)
    const despesa = Math.abs(transactionsAmounts
        .filter(value => value < 0, 0)
        .reduce((accumulator, value) => accumulator + value,0)
        .toFixed(2))
    
    displayBalance.textContent = `R$ ${total}`
    displayReceitas.textContent = `R$ ${receita}`
    displayDespesas.textContent = `R$ ${despesa}`
}


const init = () => {
    transacoesUL.innerHTML = ''
    transactions.forEach(addTransacoes)
    updateBalance()
}

init()

const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

const generateID = () => Math.round(Math.random()*1000)

form.addEventListener('submit', event => {
    event.preventDefault()

    const transactionName = inputTransactionName.value.trim()
    const transactionAmount = inputTransactionAmount.value.trim()

    if (transactionName === '' || transactionAmount === ''){
        alert('Favor inserir um valor')
        return
    }

    const transaction = { id: generateID(), name: transactionName, amount: Number(transactionAmount)}

    transactions.push(transaction)
    init()
    updateLocalStorage()

    inputTransactionName.value = ''
    inputTransactionAmount.value = ''

})