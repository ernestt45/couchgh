var config = {
    db: {
        connector: "mongodb://localhost:27017/chochgh",
        type: "mongodb",
        username: '',
        password: '',
    },
    email: {
        tramsportMethod: 'SMTP',
        service: 'gmail',
        port: 465,
        host: 'smtp.gmail.com',
        auth: {
            user: 'chochgh@gmail.com',
            pass: 'Jimjam241'
        },
    }
}

module.exports = config