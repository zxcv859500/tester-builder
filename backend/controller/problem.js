const knex = require('./knexfile');
const variables  = require('./variables');
const fs = require('fs');

module.exports = {
    async getProblemId(type) {
        const problemList = await knex('problem')
            .where('type', type);
        const problem = problemList[Math.floor(Math.random() * problemList.length)];
        return problem.problemId;
    },
    async makeProblem(grade, chapter, semester, problemNumber) {
        console.log(grade, chapter, semester, problemNumber);
        await fs.readFile(`problemSet/${grade}/${semester}/${chapter}/${problemNumber}.json`, 'utf-8', async (err, data) => {
            const obj = JSON.parse(data);
            let compObj = JSON.parse(data);
            const width = compObj['width'];
            const height = compObj['height'];
            let problemAmount = width * height;
            delete compObj.var;
            const problemId = await knex
                .insert({
                    json: JSON.stringify(compObj),
                    type: `${grade}${semester}${chapter}${problemNumber}`
                }, ['problemId'])
                .into('problem');
            for (let i = 1; i <= problemAmount; i++) {
                const varLoad = new variables(obj);
                let vars = {
                    "vars": []
                };
                for (const key in varLoad.data) {
                    if (varLoad.data.hasOwnProperty(key)) {
                        vars['vars'].push({
                            name: key,
                            value: varLoad.data[key],
                            props: [],
                            type: "eval"
                        })
                    }
                }
                await knex.insert({
                    problemId: problemId[0].toString(),
                    json: JSON.stringify(vars),
                    number: i
                })
                    .into('problem_vars');
            }
        });
    },
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
    },
    async typeMaker() {
        const problems = await knex('problem')
            .select('*');
        let count = 1;
        let result;
        for (const problem of problems) {
            console.log(problem);
            const type = problem.problemId.slice(0, -1);
            await knex('problem')
                .where('problemId', problem.problemId)
                .update({
                    problemId: count,
                    type: type
                });
            await knex('problem_vars')
                .where('problemId', problem.problemId)
                .update({
                    problemId: count
                });
            count++;
        }
        return result;
    }
};