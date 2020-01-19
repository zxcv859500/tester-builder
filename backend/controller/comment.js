const knex = require('./knexfile');

module.exports = {
    async write(params) {
        const { content, author, date, articleId } = params;

        return knex('comment')
            .insert({
                content: content,
                author: author,
                date: date,
                articleId: articleId
            })
    },

    async list(params) {
        const { articleId } = params;
        console.log(articleId);
        const result = await knex('comment')
            .select('*')
            .where('articleId', articleId);

        return result;
    }
};