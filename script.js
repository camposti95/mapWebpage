import greeter from './json-files/greeter.json' assert { type: 'json' }

const map = L.map('map').setView([35.6764, 139.6500],13)

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'    
}).addTo(map)

L.marker([35.6764, 139.6500]).addTo(map)
    .bindPopup('Tokyo, Capital of Japan.')

L.marker([29.4252, -98.4946]).addTo(map)
    .bindPopup('San Antonio, Texas. Home')

let latlngs = [
    [35.6764, 139.6500],
    [36.7168, 106.4935],
    [21.0998, -13.1175],
    [31.7795, -82.3128],
    [29.4252, -98.4946],
]
let polyline = L.polyline(latlngs, {color: 'orange'}).addTo(map)
map.fitBounds(polyline.getBounds())

const greetContainer = document.getElementById('greet-container')
const selectButtton = document.getElementById('select')
const mario = document.getElementById('mario')
const luigi = document.getElementById('luigi')
const yoshi = document.getElementById('yoshi')
const pikachu = document.getElementById('pikachu')
const bulbasaur = document.getElementById('bulbasaur')
const kirby = document.getElementById('kirby')
let charArray = [mario, luigi, yoshi, pikachu, bulbasaur, kirby]
const marioGreet = document.getElementById('mario-greet')
const luigiGreet = document.getElementById('luigi-greet')
const yoshiGreet = document.getElementById('yoshi-greet')
const pikachuGreet = document.getElementById('pikachu-greet')
const bulbasaurGreet = document.getElementById('bulbasaur-greet')
const kirbyGreet = document.getElementById('kirby-greet')
const greetArray = [marioGreet, luigiGreet, yoshiGreet, pikachuGreet, bulbasaurGreet, kirbyGreet]

greetContainer.addEventListener('mouseover', function(e) {
    let character = e.target
    for(let i = 0; i < charArray.length; i++) {
        if(character == charArray[i]) {
            hoverGreeter(i)
        }
    }
})

greetContainer.addEventListener('mouseout', function(e) {
    let character = e.target
    for(let i = 0; i < charArray.length; i++) {
        if(character == charArray[i]) {
            clearGreeter(i)
        }
    }
})

function hoverGreeter(i) {
    greetArray[i].innerText = greeter[i].Greeting
}
function clearGreeter(i) {
    greetArray[i].innerText = ''
}

let selecetedCharacter
greetContainer.addEventListener('click', function() {
    selecetedCharacter = document.activeElement.id
})

let tourGuide
selectButtton.addEventListener('click', function() {
    tourGuide = selecetedCharacter
    let tourGuideUpper = tourGuide.charAt(0).toUpperCase() +  tourGuide.slice(1)
    $('.choice').text(`You choose ${tourGuideUpper}!`).css({'padding':'1rem', 'border':'2px solid black'})
})

let imageAddress
function guide() {
    for(let i = 0; i < charArray.length; i++) {
        switch(tourGuide) {
            case 'mario':
                imageAddress = greeter[0].img
                break
            case 'luigi':
                imageAddress = greeter[1].img
                break
            case 'yoshi':
                imageAddress = greeter[2].img
                break
            case 'pikachu':
                imageAddress = greeter[3].img
                break
            case 'bulbasaur':
                imageAddress = greeter[4].img
                break
            case 'kirby':
                imageAddress = greeter[5].img
        }
    }
}

$('#tour1').click(function(){
    $('.hide1').show()
    guide()
    $('#guide1').attr('src', imageAddress)
})
$('#tour2').click(function(){
    $('.hide2').show()
    guide()
    $('#guide2').attr('src', imageAddress)
})
$('#tour3').click(function(){
    $('.hide3').show()
    guide()
    $('#guide3').attr('src', imageAddress)
})

const formElement = document.querySelector('.form')

formElement.addEventListener('submit', e => {
    e.preventDefault()

    const formData = new FormData(formElement)
    const data = Object.fromEntries(formData)

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    }

    let result = fetch("https://reqres.in/api/users", options)
    result.then(res => res.json())
        .then(d => {console.log(d)})
})