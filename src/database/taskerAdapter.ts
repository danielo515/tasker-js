import {AdapterSync, AdapterOptions} from 'lowdb';
type deserializer<T> = (data: string )=> T;
type serializer<T> = (data: T )=> string;

const _serialize = d => JSON.stringify(d,null,2);
const _deserialize = (str:string) => JSON["parse"](str);

interface iTaskerAdapter<T> extends AdapterSync<T> {
    source: string;
    serialize: serializer<T>;
    defaultValue: T;
    deserialize: deserializer<T>;
}


class TaskerAdapter<T> implements iTaskerAdapter<T>  {
    deserialize: deserializer<T>;
    serialize: serializer<T>;
    defaultValue: T;
    readonly "@@reference": T;
    constructor(
        readonly source: string,
        readonly options: AdapterOptions<T>
        ){ 
            this.serialize = options.serialize || _serialize;
            this.deserialize = options.deserialize || _deserialize;
            this.defaultValue = options.defaultValue;
        }

    read():T{
        tk.flash('About to read from database');
        try {
            const data = tk.readFile(this.source);
            return this.deserialize(data);
        } catch (error) {
            tk.flashLong('Database error ' + error.message);
            this.write(this.defaultValue);
            return this.defaultValue;
        }
    }
    write(data):void{
        tk.writeFile(this.source,this.serialize(data),false);
        tk.flash('Database write complete')
    }
}

export default TaskerAdapter;