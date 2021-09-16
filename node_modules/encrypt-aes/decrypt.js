const crypto = require('crypto')
const cryptoRandomString = require('crypto-random-string')

async function decrypt(data, password, salt, iv, keySize = '192', flavor = 'aes-192-cbc'){    
    if(!password){
        throw 'Forgot password?'
    }else if(!salt){
        throw 'Hey! Pass me the salt.'
    }else if(!iv){
        throw 'Don\'t worry! IV doesn\'t always mean intervascular.'
    }
    
    return new Promise((resolve, reject) => {
        try {
            const key = crypto.scryptSync(password, salt, (keySize / 8))
            const decipher = crypto.createDecipheriv(flavor, key, iv)
            let decrypted = ''
                
            decipher.on('readable', () => {
                while (null !== (chunk = decipher.read())) {
                decrypted += chunk.toString('utf8')
            }
            })
            decipher.on('end', () => resolve({decrypted}))

            decipher.write(data, 'hex')
            decipher.end()
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = decrypt