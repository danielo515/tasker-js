const logErrs = (fn) => (...args) => {
    try {
        fn(...args);
    } catch (error) {
        tk.flashLong(error.toString());
    }
};

export default logErrs;