const models = require('../../server/db')
const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const crypto = require('crypto')

// 连接数据库
const conn = mysql.createConnection(models.mysql)
conn.connect()
const jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败',
    })
  } else {
    res.json(ret)
  }
}

// 接口：增加信息sql,编辑修改信息sql1
router.post('/save', (req, res) => {
  const md5 = crypto.createHash('md5')
  const params = req.body
  const sql = `insert into sys_user(sys_id,sys_username,sys_pwd,sys_nickname,sys_phone,sys_head_protrait,sys_usertype,sys_userlevel) 
  select 0,?,?,?,?,?,?,? FROM DUAL WHERE NOT EXISTS(SELECT sys_username FROM sys_user WHERE  sys_username = ?)`
  const sql1 = `update sys_user set sys_nickname = ?,sys_phone = ?,sys_userType = ? where sys_id = ?`
  md5.update(params.pwd)
  // params.pwd = md5.digest('hex')
  if (params.id == 0) {
    conn.query(sql, [params.username, md5.digest('hex'), params.nickname, params.phone, params.headProtrait, params.userType, params.level, params.username], function (err, result) {
      if (err) {
        console.log(err)
      }
      if (result) {
        jsonWrite(res, result)
      }
    })
  } else {
    conn.query(sql1, [params.nickname, params.phone, params.userType, params.id], function (err, result) {
      if (err) {
        console.log(err)
      }
      if (result) {
        jsonWrite(res, result)
      }
    })
  }
})

// 接口：用户管理分页接口查询
router.get('/getlist', (req, res) => {
  const params = req.query
  const sql = `SELECT * FROM sys_user WHERE sys_username LIKE '%${params.keyword}%' 
  OR sys_phone LIKE '%${params.keyword}%' OR sys_nickname LIKE '%${params.keyword}%' 
  limit ${(params.pageIndex - 1) * params.pageSize},${params.pageSize}`
  const sql2 = `SELECT COUNT(*) as total FROM sys_user`
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      conn.query(sql2, function (err, result2) {
        if (err) {
          console.log(err)
        }
        if (result2) {
          let ret = {
            data: result,
            total: result2[0].total,
          }
          jsonWrite(res, ret)
        }
      })
    }
  })
})

// 接口：删除单条数据
router.post('/del', (req, res) => {
  const params = req.body
  const sql = `DELETE FROM sys_user WHERE sys_id=${params.id}`
  conn.query(sql, params, function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

// 接口：登录
router.post('/login', (req, res) => {
  const md5 = crypto.createHash('md5')
  const params = req.body
  md5.update(params.password)
  const sql = `SELECT * FROM sys_user WHERE sys_username=? AND sys_pwd=?`
  conn.query(sql, [params.username, md5.digest('hex')], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

// 接口：查询用户信息
router.get('/get', (req, res) => {
  const params = req.query
  const sql = `select * from info_user a RIGHT JOIN (select sys_id from sys_user where sys_username = ?) b on a.sys_id = b.sys_id`
  conn.query(sql, [params.username], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

// 接口：编辑修改更新用户信息
router.post('/alterinfo', (req, res) => {
  const params = req.body
  const sql = `insert into info_user(info_id,sys_id,info_real_name,info_sex,info_age,info_addr,info_phone,info_education) value (0,?,?,?,?,?,?,?)`
  const sql1 = `update info_user set info_real_name = ?,info_sex = ?,info_age = ?,info_addr = ?,info_phone = ?,info_education = ? where info_id = ?`
  if (params.id == 0 || params.id == null) {
    conn.query(sql, [params.sid, params.realname, params.sex, params.age, params.addr, params.phone, params.education], function (err, result) {
      if (err) {
        console.log(err)
      }
      if (result) {
        jsonWrite(res, result)
      }
    })
  } else {
    conn.query(sql1, [params.realname, params.sex, params.age, params.addr, params.phone, params.education, params.id], function (err, result) {
      if (err) {
        console.log(err)
      }
      if (result) {
        jsonWrite(res, result)
      }
    })
  }
})

// 接口：修改密码
router.post('/modifypwd', (req, res) => {
  const md5 = crypto.createHash('md5')
  const mdx = crypto.createHash('md5')
  const params = req.body
  const sql = `UPDATE sys_user SET sys_pwd=? WHERE sys_id = ? AND sys_pwd = ?`
  md5.update(params.oldPassword)
  mdx.update(params.newPassword)
  conn.query(sql, [mdx.digest('hex'), params.userId, md5.digest('hex')], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

module.exports = router
