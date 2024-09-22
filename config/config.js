const config = {
  db: {
    host: "localhost",
    user: "root",
    password: "123456",
    database: "olimpya",
    waitForConnections: true, // Đợi kết nối khả dụng nếu quá tải
    connectionLimit: 10, // Số lượng kết nối tối đa trong pool
    queueLimit: 0, // Giới hạn số lượng yêu cầu chờ xử lý
  },
};
module.exports = config;
