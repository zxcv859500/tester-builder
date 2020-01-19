const knex = require('./knexfile');

module.exports = {
    async write(params) {
        const { title, content, author, type, date, id } = params;

        return knex('article')
            .insert({
                title: title,
                content: content,
                author: author,
                type: type,
                date: date,
                userId: id
            })
    },

    async list(params) {
        const { type, page } = params;

        let count = await knex.count('id as cnt')
            .from('article');
        count = count[0].cnt;

        let articleList = await knex('article')
            .select('id', 'date', 'author', 'title')
            .where('type', type);
        for (let i = 1; i <= articleList.length; i++) articleList[i - 1]['index'] = i;
        articleList = articleList.reverse();
        const st = (page - 1) * 10,
            ed = page * 10 > count ? count : page * 10;

        let result = [];

        for (let i = st; i <= ed; i++) result.push(articleList[i]);
        return result;
    },

    async listCount(params) {
        const { type } = params;

        const count = await knex.count('id as cnt')
            .from('article')
            .where('type', type);
        return count[0].cnt;
    },

    async getArticle(params) {
        const { id } = params;

        const article = await knex('article')
            .select('*')
            .where('id', id);

        return article[0];
    },

    async remove(params) {
        const { id, userId } = params;

        return knex('article')
            .where({
                id: id,
                userId: userId
            })
            .del();
    },

    async edit(params) {
        const { id, title, content, userId } = params;

        return knex('article')
            .where({
                id: id,
                userId: userId
            })
            .update({
                title: title,
                content: content
            })
    }
};