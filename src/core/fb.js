import firebase from 'firebase';
import fbConf from '../fb.json';

firebase.initializeApp(fbConf);

const db = firebase.database();

const habits = db.ref('/habits');

export function subscribe(cb) {
    habits.on('child_changed',(snapshot) => {
        if(snapshot.exists()) cb(snapshot.val());
    });
}

export function getData(cb) {
    habits.once('value',(snapshot) => {
        if(snapshot.exists()) cb(
            snapshot.val()
        );
    });
}

window.getData = getData;

export function saveTask(task) {
    db.ref('habits/' + task.title).set(task);
}
