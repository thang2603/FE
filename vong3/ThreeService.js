const db = require(`../service/db`);
const helper = require(`../service/helper`);
const createTableQuestion = async () => {
  const sql = `CREATE TABLE IF NOT EXISTS question_3 (
      id INT AUTO_INCREMENT PRIMARY KEY,
      ques VARCHAR(255) NOT NULL,
      ans VARCHAR(255) NOT NULL,
      no INT NOT NULL,
      type INT NOT NULL
    )`;
  const res = await db.query(sql);
};

const createTableAnswer3 = async () => {
  const sql = `CREATE TABLE IF NOT EXISTS answer_3 (
      ans VARCHAR(255) NOT NULL,
      idUser INT NOT NULL,
      updateAt INT NOT NULL
    )`;
  const res = await db.query(sql);
};

const createUserInTableAnswer = async (idUser) => {
  const sql = `INSERT INTO answer_3 (idUser, ans,updateAt) VALUES (${idUser}, '',0)`;
  const res = await db.query(sql);
};

const getListQuestion = async () => {
  const sql = `select * from question_3 `;
  try {
    const res = await db.query(sql);
    const data = helper.emptyOrRows(res);
    return data;
  } catch {}
};

const getQuestion = async (index) => {
  const sql = `select * from question_3 where no ='${index}'`;
  const res = await db.query(sql);
  const data = helper.emptyOrRows(res);
  return data;
};

const updateAnswer = async (ans, idUser, updateAt) => {
  const sql = `UPDATE answer_3
  SET ans = '${ans}',
    updateAt ='${updateAt}'
  WHERE idUser = '${idUser}';`;
  const res = await db.query(sql);
  return res;
};
const updateScoreGame = async (score, idUser) => {
  const sql = `UPDATE score2
  SET score = '${score}'
  WHERE idUser = '${idUser}';`;
  const res = await db.query(sql);
  return res;
};

const getAnswer = async () => {
  const sql = `select user.*,answer_3.ans,answer_3.updateAt from user
join answer_3 on user.id = answer_3.idUser`;
  const res = await db.query(sql);
  const data = helper.emptyOrRows(res);
  return data;
};

const updateStatusQuestion = async (id) => {
  const sql = `update question_2 set isActive = '1' where id ='${id}'`;
  try {
    const res = await db.query(sql);
  } catch {}
};

const createQuestion = async (data) => {
  const sql = `insert into question_3 (ques,ans,type,no) values('${data?.ques}','${data?.ans}', ${data?.type},${data?.no})`;
  try {
    const res = await db.query(sql);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const updateQuestion = async (data) => {
  const sql = `UPDATE question_3 SET ques = '${data.ques}', ans = '${data.ans}', type = ${data.type},no =${data.no}  WHERE (id = ${data.id});`;
  try {
    const res = await db.query(sql);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};
const deleteQuestion = async (id) => {
  const sql = `DELETE FROM question_3 WHERE id = ${id};`;
  try {
    const res = await db.query(sql);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};
module.exports = {
  getQuestion,
  updateScoreGame,
  updateAnswer,
  getAnswer,
  updateStatusQuestion,
  getListQuestion,
  createQuestion,
  updateQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  createTableAnswer3,
  createTableQuestion,
  createUserInTableAnswer,
};
