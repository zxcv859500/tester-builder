const knex = require('./knexfile');
const moment = require('moment-timezone');

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
            .select('*')
            .where('articleId', articleId)
            .map(r => ({
                id: r.id,
                content: r.content,
                author: r.author,
                date: moment.tz(r.date, 'Asia/Seoul').format('YYYY-MM-DD hh:mm:ss'),
                articleId: r.articleId,
                userId: r.userId
            }))
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