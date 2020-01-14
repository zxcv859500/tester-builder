const knex = require('./knexfile');

module.exports = {
    async getChapters(grade) {
        return knex('chapter_inform')
            .select('*')
            .where('idgrade', grade);
    }
}