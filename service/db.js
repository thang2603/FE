const mysql = require("mysql2/promise");

// Tạo pool với cấu hình kết nối
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "olimpya",
  waitForConnections: true, // Đợi kết nối khả dụng nếu quá tải
  connectionLimit: 10, // Số lượng kết nối tối đa trong pool
  queueLimit: 0, // Giới hạn số lượng yêu cầu chờ xử lý
});

// Sử dụng pool để query
async function query(sql, params) {
  const [rows] = await pool.query(sql, params);
  return rows;
}

module.exports = { query };
