const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
    user: 'seu_usuario',
    host: 'localhost',
    database: 'gastos_db',
    password: 'sua_senha',
    port: 5432,
});

app.use(bodyParser.json());
app.use(express.static('public')); // Para servir HTML, CSS, JS

app.post('/adicionarGasto', (req, res) => {
    const { valor, forma_pagamento, gastante } = req.body;

    pool.query(
        'INSERT INTO gastos (valor, forma_pagamento, gastante) VALUES ($1, $2, $3)',
        [valor, forma_pagamento, gastante],
        (error) => {
            if (error) {
                console.error('Erro ao adicionar gasto:', error);
                res.status(500).json({ message: 'Erro ao adicionar gasto.' });
            } else {
                res.status(200).json({ message: 'Gasto adicionado com sucesso!' });
            }
        }
    );
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
