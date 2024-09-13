const db = require(`../service/db`);
const helper = require(`../service/helper`);

const getListUser = async () => {
  const sql = `select user.*, score1.score 
  from user
  inner join score1
  where user.id = score1.idUser`;
  const rows = await db.query(sql);
  const data = helper.emptyOrRows(rows);
  return data;
};

const createUser = async (data) => {
  const sql = `INSERT INTO user (fullName, password, role) VALUES ('${data?.fullName}', '${data?.password}', 'user')`;
  const res = await db.query(sql);
  return res;
};

const getUserByName = async (name) => {
  const sql = `SELECT * FROM user WHERE fullName = '${name}'`;
  const res = await db.query(sql);

  return res;
};
const getQuestionGroupByNo = async (index) => {
  const sql = `SELECT * FROM question WHERE id = '${index}'`;
  const rows = await db.query(sql);
  const data = helper.emptyOrRows(rows);
  return data;
};
const getQuestionByIdAndNo = async (idUser, noQues) => {
  const sql = `select * from question_1 where idUser = ${idUser} and no = ${noQues}`;
  const res = await db.query(sql);

  return res;
};

const updateScoreGame = async (score, idUser) => {
  const sql = `UPDATE score1
  SET score = '${score}'
  WHERE idUser = '${idUser}';`;
  const res = await db.query(sql);
  return res;
};

const getAllQuestionAndUser = async () => {
  const sql = `select question_1.*, user.fullName
    from question_1 
    inner join user
    on user.id = question_1.idUser`;
  const res = await db.query(sql);
  const data = helper.emptyOrRows(res);
  return data;
};

const createQuestion = async (data) => {
  const sql = `insert into question_1 (ques,ans,idUser, no) values('${data?.ques}','${data?.ans}', ${data?.idUser},${data?.no})`;
  try {
    const res = await db.query(sql);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};
const updateQuestion = async (data) => {
  const sql = `UPDATE question_1 SET ques = '${data.ques}', ans = '${data.ans}', idUser = ${data.idUser},no =${data.no}  WHERE (id = ${data.id});`;
  try {
    const res = await db.query(sql);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const deleteQuestion = async (id) => {
  const sql = `DELETE FROM question_1 WHERE id = ${id};`;
  try {
    const res = await db.query(sql);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = {
  getListUser,
  createUser,
  getUserByName,
  getQuestionByIdAndNo,
  updateScoreGame,
  getQuestionGroupByNo,
  getAllQuestionAndUser,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};
