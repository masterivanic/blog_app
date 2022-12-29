const dev = {
    app: {
        port: 3000
    },
    development_db: {
        host: 'localhost',
        port: 27017,
        name: 'MyDB'
    },
    production_db: {
        host: 'localhost',
        port: 27017,
        name: 'MyDB'
    }
}

const test = {
    app: {
        port: 3000
    },
    db: {
        host: 'localhost',
        port: 27017,
        name: 'test'
    }
}


module.exports = dev