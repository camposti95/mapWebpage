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