const Variables = require('./variables');
const Components = require('./components');

module.exports = class controller {
    constructor(compJson, varJsonList, mode) {
        this.variables = [];
        for (const varJson of varJsonList) {
            this.variables[varJson['number']] = new Variables(varJson['json']);
        }
        this.build(compJson, mode);
        this.compJson = compJson;
    }

    build(compJson, mode) {
        this.width = compJson['width'];
        this.height = compJson['height'];

        let templateScript = '';
        let problemNumber = 1;

        for (let i = 1; i <= this.width; i++) {
            let tempScript = '';
            let columnScript = '';

            for (let j = 1; j <= this.height; j++, problemNumber++) {
                this.components = new Components(compJson['comp'], this.variables[problemNumber], problemNumber, mode);
                const compData = this.components.data;
                tempScript = '';
                for (const compName in compData) {
                    if (compData.hasOwnProperty(compName)) {
                        tempScript += compData[compName]['template'];
                    }
                }

                columnScript += `<div class="problem-${problemNumber}">
        <p class="number">${problemNumber}</p>
        ${tempScript}
    </div>
    <style>        
        .problem-${problemNumber} {
            position: relative;
            margin: 5px;
            width: ${compJson['problemWidth'] * 2 / 3}px;
            height: ${compJson['problemHeight'] * 2 / 3}px;
            z-index: -1;
        } 
        .number {
            position: absolute;
            top: 5px;        
            left: 40px;
            margin: 11px 0px 0px -16px;
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
        const label = compJson['label'];
        templateScript = `<div class='test-paper'>
                          <h4 class="paper-label">${label}</h4>
    ${templateScript}
                          </div>
                          <style>
                            .test-paper {
                                position: relative;
                            }
                            .paper-label{
                                font-size: 12pt;
                                padding: 15px 15px 8px;
                                margin: 0;
                            }
                           </style>`;

        this.templates = templateScript;

        this.paperInform = {};
        this.paperInform['grade'] = compJson['grade'];
        this.paperInform['chapter'] = compJson['chapter'];
        this.paperInform['chapter2'] = compJson['chapter2'];
        this.paperInform['chapter2_small'] = compJson['chapter2_small'];
        this.paperInform['badge'] = compJson['badge'];
    }

    get template() {
        return this.templates;
    }

    get inform() {
        return this.paperInform;
    }
};
