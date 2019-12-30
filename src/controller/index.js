const Variables = require('./variables');
const Components = require('./components');

module.exports = class controller {
    constructor(problemData) {
        this.width = problemData['width'];
        this.height = problemData['height'];

        this.variables = new Variables(problemData['var']);
        this.components = new Components(problemData['comp'], this.variables, 1);

        let templateScript = '';
        let problemNumber = 1;

        for (let i = 1; i <= this.width; i++) {
            let tempScript = '';
            let columnScript = '';

            for (let j = 1; j <= this.height; j++, problemNumber++) {
                const compData = this.components.data;
                tempScript = '';
                for (const compName in compData) {
                    if (compData.hasOwnProperty(compName)) {
                        tempScript += compData[compName]['template'];
                    }
                }

                this.variables = new Variables(problemData['var']);
                this.components = new Components(problemData['comp'], this.variables, problemNumber + 1);
                columnScript += `<div class="problem-${problemNumber}">
        <p class="number">${problemNumber}</p>
        ${tempScript}
    </div>
    <style>        
        .problem-${problemNumber} {
            position: relative;
            margin: 5px;
            width: 300px;
            height: 300px;
        } 
        .number {
            position: absolute;
            top: 15px;        
            left: 80px;
            margin: 16px 0px 0px -24px;
            border: 2px solid black;
            border-radius: 75px;
            text-align: center;
            width: 21px;
            height: 22px;
            line-height: 22px;
            padding: 0px 2px 0px 0px;
            font-size: 17px;
            font-weight: normal;
        }
    </style>`;
            }
            templateScript += `<div class=problem-column style="width:${100 / this.width}%; float: left;">${columnScript}</div>`
        }
        const label = problemData['label'];
        templateScript = `<div class='test-paper'>
                          <h4 class="paper-label">${label}</h4>
    ${templateScript}
                          </div>
                          <style>
                            .test-paper {
                                position: relative;
                            }
                            .paper-label{
                                font-size: 18pt;
                                padding: 15px 15px 8px;
                                margin: 0;
                            }
                           </style>`;

        this.templates = templateScript;

        this.paperInform = {};
        this.paperInform['grade'] = problemData['grade'];
        this.paperInform['chapter'] = problemData['chapter'];
        this.paperInform['chapter2'] = problemData['chapter2'];
        this.paperInform['chapter2_small'] = problemData['chapter2_small'];
        this.paperInform['badge'] = problemData['badge'];
    }

    get template() {
        return this.templates;
    }

    get inform() {
        return this.paperInform;
    }
};
