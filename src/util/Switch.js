const Switch = ({default: defaultVal, ...options}) => {
    if (!defaultVal) throw new Error('Default value not provided');
    return value => {
        const selected = options[value];
        return selected ? selected(value) : defaultVal(value);
    };
};
 
module.exports = Switch;