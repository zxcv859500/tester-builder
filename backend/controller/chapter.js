const knex = require('./knexfile');

module.exports = {
    async getChapters(grade) {
        return await knex('chapter')
            .select('*')
            .where('idgrade', grade);
    }
}