const _serialize = d => JSON.stringify(d,null,2);
const _deserialize = (str) => JSON['parse'](str);

class TaskerAdapter{

    constructor( source, {
        serialize = _serialize,
        deserialize = _deserialize,
        defaultValue
    } ){ 
        this.source = source;
        this.serialize = serialize;
        this.deserialize = deserialize;
        this.defaultValue = defaultValue;
    }

    read(){
        tk.flash('Reading from database');
        try {
            const data = tk.readFile(this.source);
            return this.deserialize(data);
        } catch (error) {
            tk.flashLong('Database error ' + error.message);
            this.write(this.defaultValue);
            return this.defaultValue;
        }
    }
    write(data){
        tk.writeFile(this.source,this.serialize(data),false);
        tk.flash('DB write complete!');
    }
}

export default TaskerAdapter;