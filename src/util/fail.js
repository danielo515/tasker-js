export const fail = msg => {
    tk.flashLong(msg);
    tk.exit();
};
export const ensureLocal = (varName, failMsg) => {
    const value = tk.local(varName);
    if (value == 'undefined')
        fail(failMsg);
    return value;
};
