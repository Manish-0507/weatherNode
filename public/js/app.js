

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data);
    })
})
// fetch('http://localhost:3000/weather?address=boston').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error);
//         } else {
//             console.log(data.location);
//             console.log(data.forecast);
//         }
//     })
// })

const weatherForm = document.querySelector('form')

const messageOne = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')

messageOne.textContent = ''


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputval = document.querySelector('.input').value;
    messageOne.textContent = 'loading...';
    messagetwo.textContent = '';

    fetch('http://localhost:3000/weather?address=' + inputval).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messagetwo.textContent = data.forecast;

            }
        })
    })
})

