const db = require(`../service/db`);
const helper = require(`../service/helper`);

const createTableUser = async () => {
  const sql = `CREATE TABLE IF NOT EXISTS user (
      id INT AUTO_INCREMENT PRIMARY KEY,
      fullName VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(255) NOT NULL
    )`;
  const res = await db.query(sql);
};

const getListUser = async () => {
  const sql = `select * from user where role = 'USER'`;
  try {
    const res = await db.query(sql);
    const data = helper.emptyOrRows(res);
    return data;
  } catch {}
};

const getAllUser = async () => {
  const sql = `select * from user`;
  try {
    const res = await db.query(sql);
    const data = helper.emptyOrRows(res);
    return data;
  } catch {}
};

const createUser = async (data) => {
  const sql = `insert into user (fullName,password,role) values('${data?.fullName}','${data?.password}', '${data?.role}')`;
  try {
    const res = await db.query(sql);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const updateUser = async (data) => {
  const sql = `UPDATE user SET fullName = '${data.fullName}', password = '${data.password}', role = '${data.role}' WHERE (id = ${data.id});`;
  try {
    const res = await db.query(sql);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const deleteUser = async (id) => {
  const sql = `DELETE FROM user WHERE id = ${id};`;
  try {
    const res = await db.query(sql);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const createTableGame5 = async () => {
  const sql = `CREATE TABLE IF NOT EXISTS user_5 (
     idUser INT NOT NULL)`;
  const res = await db.query(sql);
};

const insertUserGame5 = async (idUser) => {
  const sql = `insert into user_5 (idUser) values(${idUser})`;
  try {
    const res = await db.query(sql);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getUserGame5 = async (idUser) => {
  const sql = `select * from user_5`;
  try {
    const res = await db.query(sql);
    const data = helper.emptyOrRows(res);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const deleteUserGame5 = async (idUser) => {
  const sql = `delete from user_5 where idUser = ${idUser}`;
  try {
    const res = await db.query(sql);
    const data = helper.emptyOrRows(res);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
const getNameUserGame5 = async (idUser) => {
  const sql = `select user.*
  from user
  inner join user_5
  where user.id = user_5.idUser
  `;
  try {
    const res = await db.query(sql);
    const data = helper.emptyOrRows(res);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
const createTableQuestionGame5 = async () => {
  const sql = `CREATE TABLE IF NOT EXISTS question_5 (
      id INT AUTO_INCREMENT PRIMARY KEY,
      ques VARCHAR(255) NOT NULL,
      ans VARCHAR(255) NOT NULL
    )`;
  const res = await db.query(sql);
};

module.exports = {
  getListUser,
  deleteUser,
  createUser,
  updateUser,
  createTableUser,
  getAllUser,
  createTableGame5,
  createTableQuestionGame5,
  insertUserGame5,
  getUserGame5,
  deleteUserGame5,
  getNameUserGame5,
};
