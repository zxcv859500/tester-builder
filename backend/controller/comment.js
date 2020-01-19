const knex = require('./knexfile');

module.exports = {
    async write(params) {
        const { content, author, date, articleId, id } = params;

        return knex('comment')
            .insert({
                content: content,
                author: author,
                date: date,
                articleId: articleId,
                userId: id
            })
    },

    async list(params) {
        const { articleId } = params;
        return knex('comment')
            .select('*').where('articleId', articleId);
    },

    async remove(params) {
        const { id, userId } = params;

        return knex('comment')
            .where({
                id: id,
                userId: userId
            })
            .del();
    }
};