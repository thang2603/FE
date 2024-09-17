const db = require(`../service/db`);
const helper = require(`../service/helper`);

const createTableQuestion = async () => {
  const sql = `CREATE TABLE IF NOT EXISTS question_2 (
      id INT AUTO_INCREMENT PRIMARY KEY,
      ques VARCHAR(255) NOT NULL,
      ans VARCHAR(255) NOT NULL,
      no INT NOT NULL,
      isActive INT NOT NULL,
      type INT NOT NULL,
      link VARCHAR(255),
    )`;
  const res = await db.query(sql);
};

const createTableAnswer2 = async () => {
  const sql = `CREATE TABLE IF NOT EXISTS answer_2 (
      ans VARCHAR(255) NOT NULL,
      idUser INT NOT NULL
    )`;
  const res = await db.query(sql);
};

const createUserInTableAnswer = async (idUser) => {
  const sql = `INSERT INTO answer_2 (idUser, ans) VALUES (${idUser}, '')`;
  const res = await db.query(sql);
};
const getListQuestion = async () => {
  const sql = `select * from question_2 `;
  try {
    const res = await db.query(sql);
    const data = helper.emptyOrRows(res);
    return data;
  } catch {}
};
const getQuestion = async (index) => {
  const sql = `select * from question_2 where no ='${index}'`;
  const res = await db.query(sql);
  const data = helper.emptyOrRows(res);
  return data;
};

const updateAnswer = async (ans, idUser) => {
  const sql = `UPDATE answer_2
  SET ans = '${ans}'
  WHERE idUser = '${idUser}';`;
  const res = await db.query(sql);
  return res;
};

const updateScoreGame = async (score, idUser) => {
  const sql = `UPDATE score1
  SET score = ${score}
  WHERE idUser = ${idUser};`;
  const res = await db.query(sql);
  return res;
};

const getAnswer = async () => {
  const sql = `select user.*,answer_2.ans from user
join answer_2 on user.id = answer_2.idUser`;
  const res = await db.query(sql);
  const data = helper.emptyOrRows(res);
  return data;
};

const updateStatusQuestion = async (id) => {
  const sql = `update question_2 set isActive = '1' where no ='${id}'`;
  try {
    const res = await db.query(sql);
  } catch {}
};

const createQuestion = async (data) => {
  const sql = `insert into question_2 (ques,ans,type, no,isActive,link) values('${
    data?.ques
  }','${data?.ans}', ${data?.type},${data?.no},${data?.isActive},'${
    data?.link || ""
  }')`;
  try {
    const res = await db.query(sql);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const updateQuestion = async (data) => {
  const sql = `UPDATE question_2 SET ques = '${data.ques}', ans = '${
    data.ans
  }', type = ${data.type},no =${data.no}, isActive=${data?.isActive}, link= '${
    data?.link || ""
  }'  WHERE (id = ${data.id});`;
  try {
    const res = await db.query(sql);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};
const deleteQuestion = async (id) => {
  const sql = `DELETE FROM question_2 WHERE id = ${id};`;
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
  deleteQuestion,
  createQuestion,
  createTableAnswer2,
  createTableQuestion,
  createUserInTableAnswer,
};
