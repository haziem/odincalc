'use strict'
function calculator() {
	//declare variables
	const keyPressed = document.querySelectorAll('button')
	const info = document.querySelector('.info')
	const mainContainer = document.querySelector('.main-container')
	const displayMain = document.querySelector('.display-main')
	const displayInfo = document.querySelector('.display-info')
	const displayOperation = document.querySelector('.display-operation')
	const displayMemory = document.querySelector('.display-memory')

	const mathOperations = ['+', '-', '×', '÷', 'xy', 'y√x']
	const otherOperations = ['MR', 'M', 'C', '=']
	const instantOperations = ['←', '+/-', '%']

	let operation = ''
	let presentNumber = '0'
	let firstNumber = ''
	let secondNumber = ''
	let result = ''
	let memory = ''

	//functions
	const mainFunction = e => {
		displayInfo.textContent = ''
		let key = e.target.textContent
		checkKey(key)
	}
	const rotateY = () => {
		mainContainer.classList.toggle('rotation')
	}

	const checkKey = key => {
		if (operation !== '' && secondNumber == '') {
			presentNumber = 0
		} //clear display if operation is chosen
		if (result !== '') {
			presentNumber = 0
			result = ''
		}
		if (mathOperations.includes(key)) {
			functionMathOperations(key)
		} else if (otherOperations.includes(key)) {
			functionOtherOperations(key)
		} else if (instantOperations.includes(key)) {
			functioninstantOperations(key)
		} else if (key.match(/^[0-9.]+$/) !== null) {
			functionNumbers(key)
		} else {
			showError(key)
		}
	}

	const functionNumbers = key => {
		if (presentNumber.toString().length < 10 && !(key == '.' && presentNumber.includes('.') === true)) {
			presentNumber += key
			if (presentNumber[0] == '0' && presentNumber[1] !== '.') {
				presentNumber = presentNumber.slice(1)
			}
			console.log('zero a presentNumber ', presentNumber)
			displayMain.textContent = presentNumber
		}

		assignNumber()
	}

	const functionMathOperations = key => {
		if (firstNumber === '') {
			return
		}
		operation = key
		let toDisplay = key
		if (toDisplay === 'y√x') {
			toDisplay = '?√'
			displayOperation.textContent = toDisplay + firstNumber
			return
		}
		if (toDisplay === 'xy') {
			console.log('x: ', key)
			toDisplay = '?'
		}

		displayOperation.textContent = firstNumber + toDisplay
	}

	const functioninstantOperations = key => {
		console.log('key: ' + key + ' presentNumber: ' + presentNumber)
		console.log(typeof presentNumber)
		switch (key) {
			case '←':
				presentNumber = presentNumber.toString().slice(0, -1)
				if (presentNumber == '') {
					presentNumber = '0'
				}

				break
			case '+/-':
				presentNumber = presentNumber * -1

				break
			case '%':
				presentNumber = presentNumber / 100

				break
			default:
				break
		}
		displayMain.textContent = presentNumber
		assignNumber()
	}
	const functionOtherOperations = key => {
		switch (key) {
			case 'C':
				clearAll()
				break
			case 'MR':
				memoryRead()
				break
			case 'M':
				memorySave()
				break
			case '=':
				calculate()
				break
			default:
				break
		}
	}
	const assignNumber = () => {
		if (operation !== '') {
			secondNumber = presentNumber
		} else {
			firstNumber = presentNumber
		}
		console.log('firstNumber: ' + firstNumber)
		console.log('secondNumber: ' + secondNumber)
		console.log('result: ' + result)
	}
	const calculate = () => {
		if (firstNumber === '' || secondNumber === '') {
			return
		}
		switch (operation) {
			case '+':
				result = parseFloat(firstNumber) + parseFloat(secondNumber)
				break
			case '-':
				result = parseFloat(firstNumber) - parseFloat(secondNumber)
				break
			case '×':
				result = parseFloat(firstNumber) * parseFloat(secondNumber)
				break
			case '÷':
				if (secondNumber == '0') {
					showError('Divide by 0')
					return
				}
				result = parseFloat(firstNumber) / parseFloat(secondNumber)
				break
			case 'xy':
				result = Math.pow(parseFloat(firstNumber), parseFloat(secondNumber))
				break
			case 'y√x':
				result = Math.pow(parseFloat(firstNumber), 1 / parseFloat(secondNumber))
				break
			default:
				break
		}
		displayMain.textContent = result
		firstNumber = result
		secondNumber = ''
		operation = ''
		displayOperation.textContent = ''
	}

	const memorySave = () => {
		if (presentNumber === '') {
			console.log('nico')
			return
		}
		memory = displayMain.textContent
		displayMemory.innerText = 'Memory: ' + memory
	}
	const memoryRead = () => {
		if (memory === '') {
			return
		}
		presentNumber = memory
		assignNumber()
		displayMain.textContent = presentNumber
	}

	const clearAll = () => {
		presentNumber = '0'
		firstNumber = ''
		secondNumber = ''
		operation = ''
		memory = ''
		displayMain.textContent = presentNumber
		displayOperation.textContent = ''
		displayInfo.textContent = ''
		displayMemory.textContent = ''
	}

	const showError = key => {
		displayInfo.textContent = 'Error: ' + key
	}
	//start
	info.addEventListener('click', rotateY)
	displayMain.textContent = presentNumber
	keyPressed.forEach(key => {
		key.addEventListener('click', mainFunction)
	})
}

calculator()
