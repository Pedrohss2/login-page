exports.homePage = (request, resoponse) => {
    resoponse.send(`
        <form action="/" method="POST">
            Nome: <input type="text" name="nome">
            <button>DIGA OLÁ MUNDO</button>
        </form>
    `);   
}