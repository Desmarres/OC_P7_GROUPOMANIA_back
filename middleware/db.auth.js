// Vérification de la connection
const auth = (db) => {
    db.authenticate()
        .then(() => {
            console.info('Connection has been established successfully.')
        })
        .catch(err => {
            console.error('Unable to connect to the database: ', err)
})};

module.exports = auth;