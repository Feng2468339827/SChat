// sql语句
var sqlMap = {
  // 用户
  user: {
    addartical:'insert into articalcode(code) values (?);',
    addjournal:'insert into journal(time, content) values ( ?, ?);',
    query:'select * from journal order by ID desc limit ?,?;',
    login: 'SELECT * FROM  login WHERE user = ? and password = ? ;',
    add: 'insert into login(user, password) values ( ?, ?);'
  }
}

module.exports = sqlMap;