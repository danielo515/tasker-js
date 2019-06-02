import firebase from 'firebase';
import fbConf from '../fb.json';

firebase.initializeApp(fbConf);

const db = firebase.database();
export default db;

export function saveTask(task) {
    db.ref('habits/' + task.title).set(task);
}
