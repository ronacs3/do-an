const formatAuto = (value?: boolean | undefined, fallback = '-') => {
    if (value == true) {
        return 'ON';
    }
    if (value == false) {
        return 'OFF';
    }
    return fallback;
};

export default formatAuto;
