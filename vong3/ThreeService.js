const db = require(`../service/db`);
const helper = require(`../service/helper`);

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
module.exports = {
  getQuestion,
  updateScoreGame,
  updateAnswer,
  getAnswer,
  updateStatusQuestion,
  getListQuestion,
};
