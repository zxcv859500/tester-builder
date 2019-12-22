module.exports = {

    /**
     * 정수 범위 난수
     *
     * @param decimalScope 범위
     * @return 정수 난수
     */
    int_random(decimalScope) {
        const min = decimalScope[0];
        const max = decimalScope[1];

        return Math.floor(Math.random()*(max-min+1)) + min;
    },

    /**
     * 실수 범위 난수
     *
     * @param decimalScope 범위
     * @param fix 소수 자리 수
     * @retrun 실수 난수
     */
    float_random(decimalScope, fix) {
        const min = decimalScope[0];
        const max = decimalScope[1];

        return (Math.random()*(max-min+1) + min).toFixed(fix)
    },

    /**
     * type: eval 의 스크립트 처리
     *
     * @param script evalScript
     * @param props evalScript 에 쓰이는 변수들 리스트
     * @returns 처리된 eval script
     */
    // TODO: 해당 prop이 없을 때 예외 발생
    eval_script(script, props) {
        let defScript = '';

        for (const prop of props) {
            defScript += `const data['${prop}'];`
        }

        return defScript + script;
    },

    parser(varLst) {
        let variables = [];

        // Type: int_random or float_random부터 처리
        for (const data of varLst) {
            if (data['type'] === 'int_random') {
                variables.push({
                    name: data['name'],
                    value: this.int_random(data['decimalScope'])
                })
            }

            else if (data['type'] === 'float_random') {
                variables.push({
                    name: data['name'],
                    value: this.float_random(data['decimalScope'], data['fix'])
                })
            }
        }

        // 나머지 eval
        for (const data of varLst) {
            if (data['type'] === 'eval') {
                const script = this.eval_script(data['value'], data['props']);
                variables.push({
                    name: data['name'],
                    value: eval(script)
                })
            }
        }

        return variables;
    }
};