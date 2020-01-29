module.exports = class Components {
    /**
     *
     * @param comLst list 컴포넌트 리스트
     * @param Variables Variables
     * @param number number
     * @param mode
     */
    constructor(comLst, Variables, number, mode) {
        this.variables = Variables.data;
        let components = {};

        for (const data of comLst) {
            components[data['name']] = {};

            if (data.type === 'eval') {
                try {
                    components[data['name']]['value'] = this.eval_script(data['value'], data['props']);
                } catch(e) {
                    console.log(e);
                }
                components[data['name']]['template'] =
                    `<div class='problem${number}-components-${data['name']} '><B>${components[data['name']]['value']}</B></div>
                    <style>
                        .problem${number}-components-${data['name']} {
                            position: absolute;
                            top: ${data['location']['y'] * 2 / 3}px;                                                                                                              
                            left: ${data['location']['x'] * 2 / 3}px;                                                                                    
                            width: ${data['width'] * 2 / 3}px;
                            height: ${data['height'] * 2 / 3}px;
                            color: ${(data['mode'] === 'hidden') ? "#0063CC" : "black"};
                            letter-spacing: ${data['letter-space'] * 2 / 3}px;
                            font-size: ${data['size'] * 2 / 3}px;
                            text-align: ${data['text-align']};
                            ${(mode === 0 && number !== 1 && data['mode'] === 'hidden') ? "visibility: hidden;" : ""};
                            ${eval(data['style_extra'])}                            
                        }
                    </style>
                    `
            } else if (data.type === 'bar') {
                components[data['name']]['template'] =
                    `<div class=problem${number}-components-${data['name']}></div>
                    <style>
                        .problem${number}-components-${data['name']} {
                            position: absolute;
                            top: ${data['location']['y'] * 2 / 3}px;
                            left: ${data['location']['x'] * 2 / 3}px;
                            border-top: ${data['border']}px solid ${(data['mode'] === 'hidden') ? "#0063CC" : "black"};                            
                            width: ${data['width'] * 2 / 3}px;
                            height: ${data['height'] * 2 / 3}px;
                            ${(mode === 0 && number !== 1 && data['mode'] === 'hidden') ? "visibility: hidden;" : ""}
                            ${eval(data['style_extra'])}                                                          
                        }
                    </style>
                    `
            } else if (data.type === 'rectangle') {
                components[data['name']]['template'] =
                    `<div class=problem${number}-components-${data['name']}></div>
                    <style>
                        .problem${number}-components-${data['name']} {
                            position: absolute;
                            top: ${data['location']['y'] * 2 / 3}px;
                            left: ${data['location']['x'] * 2 / 3}px;
                            border: ${data['border'] * 2 / 3}px solid ${(data['mode'] === 'hidden') ? "#0063CC" : "black"};
                            width: ${data['width'] * 2 / 3}px;
                            height: ${data['height'] * 2 / 3}px;
                            background-color: ${data['color']};
                            ${(mode === 0 && number !== 1 && data['mode'] === 'hidden') ? "visibility: hidden;" : ""};
                            ${eval(data['style_extra'])}   
                        }                       
                    </style>
                    `
            } else if (data.type === 'static') {
                components[data['name']]['template'] =
                    `<div class=problem${number}-components-${data['name']}><B>${data['value']}</B></div>
                    <style>
                        .problem${number}-components-${data['name']} {
                            position: absolute;
                            top: ${data['location']['y'] * 2 / 3}px;
                            left: ${data['location']['x'] * 2 / 3}px;
                            color: ${(data['mode'] === 'hidden') ? "#b8b6ae" : "black"};
                            font-size: ${data['size'] * 2 / 3}px;                                                                                                            
                            width: ${data['width'] * 2 / 3}px;
                            letter-spacing: ${data['letter-space'] * 2 / 3}px;   
                            text-align: ${data['text-align']};                 
                            ${(mode === 0 && number !== 1 && data['mode'] === 'hidden') ? "visibility: hidden;" : ""}
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
            if (prop !== 'gcd') {
                defScript += `const ${prop} = ${this.variables[`${prop}`]};`
            }
        }
        function gcd(a, b) {
            if (!b)
                return a;
            return gcd(b, a % b);
        }
        gcd(1,2 );
        return eval(defScript + script);
    }
};