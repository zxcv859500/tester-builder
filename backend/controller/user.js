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
            .select('userId', 'password', 'name', 'id')
            .where('userId', username)
            .map((result) => {
                return {
                    userId: result.userId,
                    password: result.password,
                    id: result.id,
                    name: result.name
                }
            });
        if (user.length <= 0) {
            throw new Error("Wrong username or password");
        }

        if (encrypted === user[0].password) {
            return {
                token: await jwt.sign(
                    {
                        userId: user[0].id,
                        username: user[0].userId,
                        name: user[0].name
                    },
                    config.secret,
                    {
                        expiresIn: '7d'
                    }),
                userId: user[0].id
            }
        } else {
            throw new Error("Wrong username or password");
        }

    }
};