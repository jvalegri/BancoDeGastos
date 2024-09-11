document.getElementById('gastoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const valor = document.getElementById('valor').value;
    const forma_pagamento = document.getElementById('forma_pagamento').value;
    const gastante = document.getElementById('gastante').value;

    const data = {
        valor: valor,
        forma_pagamento: forma_pagamento,
        gastante: gastante
    };

    fetch('/adicionarGasto', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        document.getElementById('mensagem').innerText = result.message;
    })
    .catch(error => {
        document.getElementById('mensagem').innerText = 'Erro ao adicionar gasto.';
        console.error('Erro:', error);
    });
});
