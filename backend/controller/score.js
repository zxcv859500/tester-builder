const knex = require('./knexfile');

module.exports = {
    async getScore(params) {
        const { userId } = params;

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
    }
};