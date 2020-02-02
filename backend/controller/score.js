const knex = require('./knexfile');

module.exports = {
    async getScore(params) {
        const {userId} = params;

        const scores = await knex('scores')
            .select('score')
            .where('userId', userId)

        let average = 0;
        for (const score of scores) {
            average += score.score;
        }
        average /= scores.length;
        if (isNaN(average)) average = 0;
        return average.toFixed(1);
    },

    async getScoreList(params) {
        const {userId} = params;

        let scores = await knex('scores')
            .select('*')
            .where('userId', userId);

        for (const score of scores) {
            const problem = await knex('problem_inform')
                .select('*')
                .where('id', score.chapter_id);

            const chapter = await knex('chapter_inform')
                .select('name')
                .where({
                    idgrade: problem[0].idgrade,
                    semester: `${problem[0].idsemester}학기`,
                    idchapter: problem[0].idchapter
                });
            score.chapter = chapter[0].name;
            score.problem = problem[0].name;
        }
        return scores;
    }
};
