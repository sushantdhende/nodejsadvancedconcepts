const crypto = require('crypto');

/** do some expensive work */
crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    
})