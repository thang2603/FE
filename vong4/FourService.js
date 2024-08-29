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

module.exports = {
  getListQuestionByIdUser,
  // updateScoreGame,
  // updateAnswer,
  // getAnswer,
  // updateStatusQuestion,
  // getListQuestion,
};
