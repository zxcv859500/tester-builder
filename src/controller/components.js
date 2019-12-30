module.exports = class Components {
    /**
     *
     * @param comLst list 컴포넌트 리스트
     * @param Variables Variables
     * @param number number
     */
    constructor(comLst, Variables, number) {
        this.variables = Variables.data;
        let components = {};
        console.log(number);

        for (const data of comLst) {
            components[data['name']] = {};

            if (data.type === 'eval') {
                components[data['name']]['value'] = this.eval_script(data['value'], data['props']);

                components[data['name']]['template'] =
                    `<div class='problem${number}-components-${data['name']}'><B>${components[data['name']]['value']}</B></div>
                    <style>
                        .problem${number}-components-${data['name']} {
                            position: absolute;
                            top: ${data['location']['y']}px;                                                                                                              
                            left: ${data['location']['x']}px;                                                                                    
                            width: ${data['width']}px;
                            height: ${data['height']}px;
                            color: ${(data['mode'] === 'hidden') ? "#0063CC" : "black"};
                            letter-spacing: ${data['letter-space']}px;
                            text-align: ${data['text-align']};
                            ${(number !== 1 && data['mode'] === 'hidden') ? "visibility: hidden;" : ""}                            
                        }
                    </style>
                    `
            } else if (data.type === 'bar') {
                components[data['name']]['template'] =
                    `<div class=problem${number}-components-${data['name']}></div>
                    <style>
                        .problem${number}-components-${data['name']} {
                            position: absolute;
                            top: ${data['location']['y']}px;
                            left: ${data['location']['x']}px;
                            border-top: ${data['border']}px solid ${(data['mode'] === 'hidden') ? "#0063CC" : "#ddd"};                            
                            width: ${data['width']}px;
                            height: ${data['height']}px;
                            ${(number !== 1 && data['mode'] === 'hidden') ? "visibility: hidden;" : ""}                              
                        }
                    </style>
                    `
            } else if (data.type === 'rectangle') {
                components[data['name']]['template'] =
                    `<div class=problem${number}-components-${data['name']}></div>
                    <style>
                        .problem${number}-components-${data['name']} {
                            position: absolute;
                            top: ${data['location']['y']}px;
                            left: ${data['location']['x']}px;
                            border: ${data['border']}px solid ${(data['mode'] === 'hidden') ? "#0063CC" : "black"};
                            width: ${data['width']}px;
                            height: ${data['height']}px;
                            ${(number !== 1 && data['mode'] === 'hidden') ? "visibility: hidden;" : ""}                            
                        }                       
                    </style>
                    `
            } else if (data.type === 'static') {
                components[data['name']]['template'] =
                    `<div class=problem${number}-components-${data['name']}><B>${data['value']}</B></div>
                    <style>
                        .problem${number}-components-${data['name']} {
                            position: absolute;
                            top: ${data['location']['y']}px;
                            left: ${data['location']['x']}px;
                            color: ${(data['mode'] === 'hidden') ? "#0063CC" : "black"};
                            font-size: ${data['size']}px;  
                            letter-spacing: ${data['letter-space']}px;   
                            text-align: ${data['text-align']};                 
                            ${(number !== 1 && data['mode'] === 'hidden') ? "visibility: hidden;" : ""}
                        }
                    </style>`
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