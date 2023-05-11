'use strict'

const keyPressed = document.querySelectorAll('button')
const info = document.querySelector('.info')
const mainContainer = document.querySelector('.main-container')
const resultNumbers = document.querySelector('.result-numbers')
const resultInfo = document.querySelector('.result-info')
const resultOperation = document.querySelector('.result-operation')

const mathOperations = ['+', '-', '×', '÷', '%', 'xy', 'y√x']
const otherOperations = ['MR', 'M', 'C', '←', '+/-', '=']

let firstNumber = []
let firstNumberFlag = false
const secondNumber = []
let secondNumberFlag = false
let operation = ''
let operationFlag = false
const result = []

//function used to show info - how to use calculator
function rotateY() {
	mainContainer.classList.toggle('rotation')
}

info.addEventListener('click', rotateY)

const mainFunction = e => {
	const clickedKey = e.target.innerText
	console.log('Element clicked: ' + clickedKey)

	if (mathOperations.includes(clickedKey)) {
		console.log('Jest w operacjach matematycznych: ' + mathOperations.includes(clickedKey))
		functionMathOperations(clickedKey)
	} else if (otherOperations.includes(clickedKey)) {
		console.log('Jest w pozostałych operacjach: ' + otherOperations.includes(clickedKey))
		functionOtherOperations(clickedKey)
	} else if (clickedKey.match(/^[0-9.]+$/) !== null) {
		console.log('Jest liczbą: ' + clickedKey)
		functionNumbers(clickedKey)
	} else {
		showError(clickedKey)
	}
}

const functionNumbers = e => {
	let thisNumber = []
	if (firstNumberFlag === false) {
		thisNumber = firstNumber
	} else {
		thisNumber = secondNumber
	}
	console.log(thisNumber)

	if (thisNumber.length < 10 && !(e == '.' && thisNumber.includes('.') === true)) {
		thisNumber.push(e)
		console.log('Pierwsza liczba: ' + firstNumber)
		resultNumbers.innerText = thisNumber.join('')
	} else {
		console.log('nic')
	}
	console.log('aaaale')
}

const functionMathOperations = e => {
	if (firstNumber.length === 0) {
		return
	}
	if (firstNumberFlag === false) {
		firstNumberFlag = true
	}

	resultOperation.innerText = firstNumber.join('') + e
	resultNumbers.innerText = 0

	switch (e) {
		case '×':
			operation = '*'
			break
		case '÷':
			operation = '/'
			break
		case '%':
			operation = '*0.01'
			break
		case 'xy':
			operation = 'Math.pow'
			break
		case 'y√x':
			operation = 'Math.nthroot'
			break
		default:
			operation = e
	}

	const showError = e => {
		console.log('Nie wiem co to jest: ' + clickedKey)
	}
}

const functionOtherOperations = e => {
	
}



keyPressed.forEach(key => {
	key.addEventListener('click', mainFunction)
})
