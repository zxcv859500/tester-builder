const knex = require('./knexfile');
const crypto = require('crypto');
const config = require('../config');
const jwt = require('jsonwebtoken');

module.exports = {
    async login(username, password) {
        const cipher = crypto.createCipheriv('aes-256-cbc', config.aesSecret, config.aesSecret.substr(0, 16));
        let encrypted = cipher.update(password, 'utf8', 'base64'); // 'HbMtmFdroLU0arLpMflQ'
        encrypted += cipher.final('base64');

        const user = await knex('member')
            .select('userId', 'password', 'nickname')
            .where('userId', username)
            .map((result) => {
                return {
                    userId: result.userId,
                    password: result.password
                }
            });
        console.log(user);
        if (user.length <= 0) {
            throw new Error("Wrong username or password");
        }

        if (encrypted === user[0].password) {
            return await jwt.sign(
                {
                    username: user[0].userId
                },
                config.secret,
                {
                    expiresIn: '7d'
                })
        } else {
            throw new Error("Wrong username or password");
        }

    }
};