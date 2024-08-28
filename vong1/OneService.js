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
  const sql = `SELECT question.*,question_game_1.idUser,question_game_1.no
    from question 
    inner join question_game_1
    on question.id = question_game_1.idQuestion 
    and question_game_1.idUser =${idUser}
    and question_game_1.no =${noQues}`;
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
module.exports = {
  getListUser,
  createUser,
  getUserByName,
  getQuestionByIdAndNo,
  updateScoreGame,
  getQuestionGroupByNo,
};
