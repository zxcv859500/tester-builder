const knex = require('./knexfile');

module.exports = {
    async getChapter(grade) {
        return await knex('chpater')
            .select('*')
            .where('idgrade', grade);
    }
}