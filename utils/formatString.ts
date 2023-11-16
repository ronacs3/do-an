const formatString = (value?: string | undefined, fallback = '-') => {
    if (value) {
        return value;
    }
    return fallback;
};

export default formatString;
