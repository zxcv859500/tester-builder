const knex = require('./knexfile');

module.exports = {
    async getUnits(grade) {
        return await knex('unit')
            .select('*')
            .where('idgrade', grade);
    }
}