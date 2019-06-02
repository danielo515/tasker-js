import firebase from 'firebase';
import fbConf from '../fb.json';
import {formatOutputTask} from './tasks';

firebase.initializeApp(fbConf);

const db = firebase.database();

const habits = db.ref('/habits');

export function subscribe(cb) {
    habits.on('child_changed',(snapshot) => {
        if(snapshot.exists()) cb(formatOutputTask(
            snapshot.val()
        ));
    });
}

window.subscribe = subscribe;

export function saveTask(task) {
    db.ref('habits/' + task.title).set(task);
}
