module.exports = class Components {
    /**
     *
     * @param comLst list 컴포넌트 리스트
     * @param Variables Variables
     */
    constructor(comLst, Variables) {
        this.variables = Variables.data;
        let components = {};

        for (const data of comLst) {
            if (data.type === 'eval') {
                components[data['name']]['value'] = this.eval_script(data['value'], data['props']);

                components[data['name']]['template'] =
                    `<div class='components-${data['name']}'>
                        <u>${components[data['name']]['value']}</u>
                    </div>
                    <style>
                        .components-${data['name']} {
                            position: absolute;
                            top: ${data['location']['x']};
                            left: ${data['location']['y']};
                            width: ${data['location']['width']};
                            height: ${data['location']['height']};
                        }
                    </style>
                    `
            } else if (data.type === 'bar') {
                components[data['name']]['template'] =
                    `<div class=components-${data['name']}></div>
                    <style>
                        .components-${data['name']} {
                            position: absolute;
                            top: ${data['location']['x']};
                            left: ${data['location']['y']};
                            border-top: ${data['border']} solid black;
                        }
                    </style>
                    `
            } else if (data.type === 'rectangle') {
                components[data['name']]['template'] =
                    `<div class=components-${data['name']}></div>
                    <style>
                        .components-${data['name']} {
                            position: absolute;
                            top: ${data['location']['x']};
                            left: ${data['location']['y']};
                            border: ${data['border']} solid black;
                        }                       
                    </style>
                    `
            }
        }

        this.components = components;
    }

    get data() {
        return this.components;
    }

    /**
     *
     * @param script dict
     * @param props list
     * @returns {number}
     */
    eval_script(script, props) {
        let defScript = '';

        for (const prop of props) {
            defScript += `const ${prop} = ${this.variables[`${prop}`]};`
        }

        return eval(defScript + script);
    }
};