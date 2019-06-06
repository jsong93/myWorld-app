const sqlite3 = require('sqlite3').verbose();
// import sqlite3 from 'sqlite3';
const dbname = 'jsong.sqlite';
const db = new sqlite3.Database(dbname);

db.serialize(() => {
  const sql = `create table if not exists barrage 
    (id integer primary key,time,content text)`;
  db.run(sql);
});

class Barrage {
  static all(callback) {
    db.all(' select * from barrage ', callback);
  }

  static find(id, callback) {
    db.get(' select * from barrage where id = ? ', id, callback);
  }

  static create(data, callback) {
    const sql = ' insert into barrage (time,content) values (?,?) ';
    db.run(sql, data.time, data.content, callback);
  }

  static delete(id, callback) {
    if (!id) return callback(new Error(`do not find ${id}`));
    db.run(' delete from barrage where id = ? ', id, callback);
  }

  static addColumn(callback) {
    db.run(' alter table barrage add column time text', callback);
  }
}

module.exports = db;
module.exports.Barrage = Barrage;
