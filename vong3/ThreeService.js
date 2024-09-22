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

const createTableImage = async () => {
  const sql = `CREATE TABLE IF NOT EXISTS image_3 (
      id INT AUTO_INCREMENT PRIMARY KEY,
      link VARCHAR(255) NOT NULL,
      idQues VARCHAR(255) NOT NULL
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
  const sql = `select question_3.*, 
  image_3.id as idImage,
  image_3.link from question_3 
  join image_3 
  where question_3.id = image_3.idQues
  order by no asc
  `;
  try {
    const data = await db.query(sql);
    let res = helper.emptyOrRows(data);
    const newMap = new Map();
    if (res?.length > 1) {
      for (let i = 0; i < res.length; i++) {
        const item = { ...res[i] };
        if (newMap.get(item?.id)) {
          let tempData = newMap.get(item?.id);
          const listImage = [
            ...tempData.image,
            {
              id: item?.idImage,
              link: item?.link,
            },
          ];
          const newData = { ...tempData, image: [...listImage] };
          newMap.set(item?.id, newData);
        } else {
          newMap.set(item?.id, {
            id: item.id,
            ques: item?.ques,
            ans: item?.ans,
            no: item?.no,
            type: item?.type,
            image: [
              {
                id: item?.idImage,
                link: item?.link,
              },
            ],
          });
        }
      }
      res = Array.from(newMap.values());
    }

    return res;
  } catch {}
};

const getQuestion = async (index) => {
  const sql = `select * from question_3 where no ='${index}'`;
  const res = await db.query(sql);
  const data = helper.emptyOrRows(res);
  return data;
};

const getImage = async (index) => {
  const sql = `select id,link from image_3 where idQues='${index}'`;
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

const createImage = async (link, idQues) => {
  const sql = `insert into image_3 (idQues,link) values(${idQues},'${link}')`;
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

const updateIamge = async (id, link) => {
  const sql = `UPDATE image_3 SET link = '${link}' WHERE (id = ${id});`;
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
const deleteImage = async (id) => {
  const sql = `DELETE FROM image_3 WHERE id = ${id};`;
  try {
    const res = await db.query(sql);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};
module.exports = {
  getImage,
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
  createTableImage,
  createImage,
  updateIamge,
  deleteImage,
};
