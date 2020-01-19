const knex = require('./knexfile');

module.exports = {
    async getProblems(grade, chapter, semester) {
        return knex('problem_inform')
            .select('*')
            .where({
                idgrade: grade,
                idchapter: chapter,
                idsemester: semester
            });
    },
    async getComp(problemId) {
        return knex('problem')
            .select('json')
            .where('problemId', problemId)
            .map((res) =>{
                return res.json;
            });
    },
    async getVars(problemId) {
        return  knex('problem_vars')
            .select('json', 'number')
            .where('problemId', problemId);
    },
    async count() {
        return knex('problem')
            .count('problemId as cnt')
    }
};