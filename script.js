'use strict'

const keyPressed = document.querySelectorAll('button')
const info = document.querySelector('.info')
const mainContainer = document.querySelector('.main-container')

function rotateY() {
	mainContainer.classList.toggle('rotation')

}

info.addEventListener('click', rotateY)
