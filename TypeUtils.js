module.exports = (function (){
    return {
        NUMBER_REGEX: /^[-+]?\d+(\.\d+)?([eE][-+]?\d+)?$/g,
        parseType: function (value) {
            return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
        },
        isObject: function (value) {
            if(this.isNull(value)){
                return false;
            }
            return 'object' === this.parseType(value);
        },
    
        isNumber: function (value) {
            return isFinite(value);
            // if(!this.isNull(value)){
            //     let type = this.parseType(value);
            //     if(type === 'number') {
            //         return true;
            //     }else if (type === 'string') {
            //         let matchResult = value.match(this.NUMBER_REGEX);
            //         return !!matchResult && matchResult.length === 1;
            //     }
            // }
            // return false;
        },
    
        isString: function (value) {
            if (this.isNull(value)) {
                return false;
            }
            return 'string' === this.parseType(value) && !this.isNumber(value);
        },
    
        isJsonStr: function (value) {
            try {
                let parseResult = JSON.parse(value);
                return this.isObject(parseResult);
            } catch (error) {
                return false;
            }
        },
    
        isNull: function (value) {
            let type = this.parseType(value);
            return ['null', 'undefined'].includes(type)
            || ('string' === type && value.length === 0)
            || ('number' === type && value !== value)
            || ('object' === type && Object.keys(value).length === 0);
        },
    }
}());