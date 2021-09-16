const crypto = require('crypto')
const cryptoRandomString = require('crypto-random-string')

async function encrypt(data, password = cryptoRandomString({length: 10, type: 'alphanumeric'}), salt = cryptoRandomString({length: 10, type: 'alphanumeric'}), iv = crypto.randomFillSync(new Uint8Array(16)), keySize = '192', flavor = 'aes-192-cbc'){    
    return new Promise((resolve, reject) => {
        try {
            const key = crypto.scryptSync(password, salt, (keySize / 8))
            const cipher = crypto.createCipheriv(flavor, key, iv)
            cipher.setEncoding('hex')
            let encrypted = ''
                
            cipher.on('data', chunk => {encrypted += chunk})
            cipher.on('end', () => {resolve({password, salt, iv, encrypted})})

            cipher.write(data)
            cipher.end()
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = encrypt