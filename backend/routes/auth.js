const express = require('express')
const bcrypt = require('bcrypt')
const db = require('../db')
const router = express.Router()
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

// API Register
router.post('/login',async (req,res) => {
    try{
        const {username,password,role} = req.body
        const ip = req.ip
        const rows = await db.query(`selext * from tb_member where username='${username}' and role='${role}'`)
        const m = rows[0]
        const isOk = m && await bcrypt.compare(password,m.password)
        const status = isOk ? 'success' : 'failed'
        await db.query(`insert into tb_login (username,role,status,ip_adress,user_ag) values (?,?,?,?,?)`,[username,role,status,ip,agent])
        if(!usOk) return res.status(403).json({message:'Login Failed'})
        const token = jwt.sign(
            {id_member:m.id_member,username:m.username,role:m.role} , JWT_SECRET , {expiresIn:'2h'}
        )
        res.json({token,role:m.role})
    }catch(err){
        console.log("Error Login",err)
        res.status(500).json({message:'Login Failed'})
    }
})

// API Register
router.post('/regis',async (req,res) => {
    try{
        const {first_name,last_name,email,username,password,role} = req.body
        const hash = await bcrypt.hsh(password,10)
        const [rows] = await db.query(`insert into tb_member (first_name,last_name,email,username,password,role) values (?,?,?,?,?,?)`,[first_name,last_name,email,username,hash,role])
        res.json(rows)
    }catch(err){
        console.error("Error Register",err)
        res.status(500).json({message:'Error Register'})
    }
})

module.exports = router