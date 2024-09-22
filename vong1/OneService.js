const db = require(`../service/db`);
const helper = require(`../service/helper`);

const createTableQuestion = async () => {
  const sql = `CREATE TABLE IF NOT EXISTS question_1 (
      id INT AUTO_INCREMENT PRIMARY KEY,
      ques VARCHAR(255) NOT NULL,
      ans VARCHAR(255) NOT NULL,
      idUser INT NOT NULL,
      no INT NOT NULL
    )`;
  const res = await db.query(sql);
};

const createTableQuestionGroup = async () => {
  const sql = `CREATE TABLE IF NOT EXISTS question_group (
      id INT AUTO_INCREMENT PRIMARY KEY,
      ques VARCHAR(255) NOT NULL,
      ans VARCHAR(255) NOT NULL,
      no INT NOT NULL
    )`;
  const res = await db.query(sql);
};

const createTableScore1 = async () => {
  const sql = `CREATE TABLE IF NOT EXISTS score1(
      idUser INT NOT NULL,
      score INT NOT NULL
    )`;
  const res = await db.query(sql);
};

const getListUser = async () => {
  const sql = `select user.*, score1.score 
  from user
  inner join score1
  where user.id = score1.idUser and role ='USER'`;
  const rows = await db.query(sql);
  const data = helper.emptyOrRows(rows);
  return data;
};
const getListUserOrderByScore = async () => {
  const sql = `select user.*, score1.score 
  from user
  inner join score1
  where user.id = score1.idUser and role = "USER"
  ORDER BY score ASC`;
  const rows = await db.query(sql);
  const data = helper.emptyOrRows(rows);
  return data;
};
const createUser = async (data) => {
  const sql = `INSERT INTO user (fullName, password, role) VALUES ('${data?.fullName}', '${data?.password}', 'user')`;
  const res = await db.query(sql);
  return res;
};

const createUserInTableScore = async (idUser) => {
  const sql = `INSERT INTO score1 (idUser, score) VALUES (${idUser},0)`;
  const res = await db.query(sql);
};

const getUserByName = async (name) => {
  const sql = `SELECT * FROM user WHERE fullName = '${name}'`;
  const res = await db.query(sql);
  return res;
};
// Group question
const getQuestionGroupByNo = async (index) => {
  const sql = `SELECT * FROM question_group WHERE no = '${index}'`;
  const rows = await db.query(sql);
  const data = helper.emptyOrRows(rows);
  return data;
};

const getAllQuestionGroup = async () => {
  const sql = `SELECT * FROM question_group`;
  const rows = await db.query(sql);
  const data = helper.emptyOrRows(rows);
  return data;
};

const createQuestionGroup = async (data) => {
  const sql = `insert into question_group (ques,ans,no) values('${data?.ques}','${data?.ans}',${data?.no})`;
  try {
    const res = await db.query(sql);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const updateQuestionGroup = async (data) => {
  const sql = `UPDATE question_group SET ques = '${data.ques}', ans = '${data.ans}',no =${data.no}  WHERE (id = ${data.id});`;
  try {
    const res = await db.query(sql);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const deleteQuestionGroup = async (id) => {
  const sql = `DELETE FROM question_group WHERE id = ${id};`;
  try {
    const res = await db.query(sql);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// -----------------------------------
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
  createTableQuestion,
  createTableScore1,
  createUserInTableScore,
  createTableQuestionGroup,
  getAllQuestionGroup,
  createQuestionGroup,
  updateQuestionGroup,
  deleteQuestionGroup,
  getListUserOrderByScore,
};
