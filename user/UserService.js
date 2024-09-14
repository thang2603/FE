const db = require(`../service/db`);
const helper = require(`../service/helper`);

const getListUser = async () => {
  const sql = `select * from user`;
  try {
    const res = await db.query(sql);
    const data = helper.emptyOrRows(res);
    return data;
  } catch {}
};

const createUser = async (data) => {
  const sql = `insert into user (fullName,password,role) values('${data?.fullName}','${data?.password}', '${data?.role}')`;
  try {
    const res = await db.query(sql);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const updateUser = async (data) => {
  const sql = `UPDATE user SET fullName = '${data.fullName}', password = '${data.password}', role = '${data.role}' WHERE (id = ${data.id});`;
  try {
    const res = await db.query(sql);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const deleteUser = async (id) => {
  const sql = `DELETE FROM user WHERE id = ${id};`;
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
  deleteUser,
  createUser,
  updateUser,
};
