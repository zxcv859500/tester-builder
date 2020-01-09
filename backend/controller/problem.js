const knex = require('./knexfile');

module.exports = {
    async getProblems(grade, unit, semester) {
        return await knex('problem')
            .select('*')
            .where({
                idgrade: grade,
                idunit: unit,
                idsemester: semester
            });
    }
}