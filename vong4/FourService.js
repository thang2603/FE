const db = require(`../service/db`);
const helper = require(`../service/helper`);

const getListQuestionByIdUser = async (idUser) => {
  const sql = `select * from question_4 where idUser = '${idUser}'`;
  try {
    const res = await db.query(sql);
    const data = helper.emptyOrRows(res);
    return data;
  } catch {}
};

const getListQuestion = async () => {
  const sql = `select question_4.*, user.fullName
    from question_4 
    inner join user
    on user.id = question_4.idUser`;
  try {
    const res = await db.query(sql);
    const data = helper.emptyOrRows(res);
    return data;
  } catch {}
};

const createQuestion = async (data) => {
  const sql = `insert into question_4 (ques,ans,idUser, score,type) values('${data?.ques}','${data?.ans}', ${data?.idUser},${data?.score},1)`;
  try {
    const res = await db.query(sql);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const updateQuestion = async (data) => {
  const sql = `UPDATE question_4 SET ques = '${data.ques}', ans = '${data.ans}', idUser = ${data.idUser},score =${data.score},type=1  WHERE (id = ${data.id});`;
  try {
    const res = await db.query(sql);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const deleteQuestion = async (id) => {
  const sql = `DELETE FROM question_4 WHERE id = ${id};`;
  try {
    const res = await db.query(sql);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = {
  getListQuestionByIdUser,
  getListQuestion,
  deleteQuestion,
  createQuestion,
  updateQuestion,
};
