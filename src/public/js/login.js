const form = document.getElementById('loginForm');


form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);
    fetch('/api/sessions/login', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => {
        if (result.status === 200) {
            window.location.replace('products');
        }
    })
})

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => (obj[key] = value));
    try {
        const response = await fetch('/api/sessions/login', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
            window.location.replace('/products'); 
        } else {
            const errorMessage = document.getElementById('error-message');
            errorMessage.style.display = 'block';
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
});

form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form)
    const obj = {}
    data.forEach((value, key) => obj[key] = value);
    fetch('/api/jwt/login', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => {
        if (result.status === 200) {
            result.json()
                .then(json => {
                    localStorage.setItem('authToken', json.jwt)
                    console.log("Cookies generadas:");
                    console.log(document.cookie);
                })
        } else if (result.status === 401) {
            console.log(result);
            alert("Login invalido revisa tus credenciales!");
        }
    })

})