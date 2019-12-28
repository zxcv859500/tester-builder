const Variables = require('./variables');
const Components = require('./components');

module.exports = class controller {
    constructor(problemData) {
        this.variables = new Variables(problemData['var']);
        this.components = new Components(problemData['comp'], this.variables);

        this.width = problemData['width'];
        this.height = problemData['height'];

        const compData = this.components.data;
        let templateScript = '';

        for (const compName in compData) {
            if (compData.hasOwnProperty(compName)) {
                templateScript += compData[compName]['template'];
            }
        }

        templateScript = `<div class='test-paper'>${templateScript}</div>`;

        this.templates = templateScript;
    }

    get template() {
        return this.templates;
    }
};
