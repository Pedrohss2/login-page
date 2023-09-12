const { Console } = require('console');
const express = require('express'); // Importando o express
const { request } = require('https');
const app  = express();
const routes  = require('./routes')

// http://meusite.com/profiles/
// http://meusite.com/sobre <-- GET --> Entregue a página sobre

app.use(express.urlencoded( { extended: true}))

app.use(routes)



app.listen(3000, () => {
    console.log('http://localhost:3000')
})

