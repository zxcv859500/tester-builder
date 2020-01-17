const knex = require('./knexfile');

module.exports = {
    async write(params) {
        const { title, content, author, type, date } = params;

        return knex('article')
            .insert({
                title: title,
                content: content,
                author: author,
                type: type,
                date: date
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
        articleList = articleList.reverse();
        const st = (page - 1) * 10,
            ed = page * 10 > count ? count : page * 10;

        let result = [];

        for (let i = st; i <= ed; i++) result.push(articleList[i]);
        console.log(page);
        return result;
    },

    async listCount() {
        const count = await knex.count('id as cnt')
            .from('article');
        return count[0].cnt;
    }
};