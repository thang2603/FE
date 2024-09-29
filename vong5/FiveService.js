const db = require(`../service/db`);
const helper = require(`../service/helper`);

const createUserGame5 = async (idUser) => {
  const sql = `insert into user_5 (idUser) values(${idUser})`;
  try {
    const res = await db.query(sql);
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const deleteUserGame5 = async (idUser) => {
  const sql = `delete from user_5 where idUser = ${idUser}`;
  try {
    const res = await db.query(sql);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getListUserGame5 = async () => {
  const sql = `select * from user_5`;
  try {
    const res = await db.query(sql);
    const data = helper.emptyOrRows(res);
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const createQuestion5 = async (data) => {
  const sql = `insert into question_5 (ques,ans,no) values('${data?.ques}','${data?.ans}',${data?.no} )`;
  try {
    const res = await db.query(sql);
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getListQuestion5 = async () => {
  const sql = `select * from question_5`;
  try {
    const res = await db.query(sql);
    const data = helper.emptyOrRows(res);
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getQuestion5 = async (idQues) => {
  const sql = `select * from question_5  where no = ${idQues}`;
  try {
    const res = await db.query(sql);
    const data = helper.emptyOrRows(res);
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
const deleteQuestion5 = async (idQues) => {
  const sql = `delete from question_5 where id = ${idQues} `;
  try {
    const res = await db.query(sql);
    const data = helper.emptyOrRows(res);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
const updateQuestion = async (data) => {
  const sql = `UPDATE question_5 SET ques = '${data.ques}', ans = '${data.ans}',no =${data.no} WHERE (id = ${data.id});`;
  try {
    const res = await db.query(sql);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getListUser = async () => {
  const sql = `select user.*,score1.score from user 
  join user_5
  join score1
  where user.id = user_5.idUser and user.id = score1.idUser`;
  try {
    const res = await db.query(sql);
    const data = helper.emptyOrRows(res);

    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = {
  createUserGame5,
  deleteUserGame5,
  getListUserGame5,
  createQuestion5,
  getListQuestion5,
  deleteQuestion5,
  updateQuestion,
  getQuestion5,
  getListUser,
};
