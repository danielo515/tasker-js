/**
 * Creates a new empty task from scratch
 * @param {String} name the task name
 * @returns {Task}
 */
export const emptyTask = (name) => ({
    title: name,
    createdAt: new Date().toISOString(),
    executionLog: [],
});
