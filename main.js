import { CountUp } from './countUp.js';

const input = document.getElementById('input');

function countUp(infectados, recuperados, fallecidos) {
    const options = { duration: 0.3 };
    const c1 = new CountUp('infectados', infectados, options);
    const c2 = new CountUp('recuperados', recuperados, options);
    const c3 = new CountUp('fallecidos', fallecidos, options);
    
    c1.start();
    c2.start();
    c3.start();
}

window.addEventListener('load', e => {
    fetch('https://covid19.mathdro.id/api')
            .then(res => res.json())
            .then(data => {
                
            const {confirmed, recovered, deaths} = data;
            countUp(confirmed.value, recovered.value, deaths.value);
        })
        .catch(error => {
            console.log(error);
        })
        input.value = 'Global'
});



input.addEventListener('change', e => {
    let endpoint;
    const texto = e.target.value;
    if (texto === 'Global'){
        endpoint = 'https://covid19.mathdro.id/api';
    } else {
        endpoint = `https://covid19.mathdro.id/api/countries/${texto}`;
    }

    fetch(endpoint)
        .then(res => res.json())
        .then(data => {
            const { confirmed, recovered, deaths } = data;
            countUp(confirmed.value, recovered.value, deaths.value);
        })
        .catch(error =>{
            console.log(error);
        })

    input.blur();
})

input.addEventListener('focus', e => {
    input.value = '';
})