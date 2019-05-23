export const startTask = {
    enter(locals, tasker){
        tasker.flash('Starting task');
        const varName = `TASK_${locals.par1}_START`;
        tasker.setGlobal(varName, Date.now().toString());
    },
    exit(locals, tasker){

    }
};