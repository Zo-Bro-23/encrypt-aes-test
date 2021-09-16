const aes = require('encrypt-aes')

aes.encrypt('hey there').then(r => {
    aes.decrypt(r.encrypted, r.password, r.salt, r.iv).then(res => {console.log(res)})
})