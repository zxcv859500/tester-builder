const knex = require('./knexfile');

module.exports = {
    async getProblems(grade, chapter, semester) {
        return await knex('problem')
            .select('*')
            .where({
                idgrade: grade,
                idchapter: chapter,
                idsemester: semester
            });
    }
}