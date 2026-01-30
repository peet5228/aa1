const express = require('express')
const bcrypt = require('bcryptjs')
const db = require('../db')
const router = express.Router()
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

router.post('/login', async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const ip = req.ip;
        const agent = req.headers['user-agent'];

        // 1. ใช้ ? เพื่อความปลอดภัยและลดโอกาส Query พัง
        const [rows] = await db.query(`SELECT * FROM tb_member WHERE username = ? AND role = ?`, [username, role]);
        const m = rows[0];

        // 2. ตรวจสอบก่อนว่าเจอ User ไหม ถ้าไม่เจอให้รีบตอบกลับ (Return)
        if (!m) {
            console.log("User not found");
            return res.status(403).json({ message: 'Login Failed: User not found' });
        }

        // 3. ตรวจสอบ Password (m มีค่าแน่นอนแล้วตรงนี้)
        const isOk = await bcrypt.compare(password, m.password);
        const status = isOk ? 'success' : 'failed';

        // เก็บ Log การ Login
        await db.query(`INSERT INTO tb_login (username, role, status, ip, agent) VALUES (?, ?, ?, ?, ?)`, 
            [username, role, status, ip, agent]);

        if (!isOk) {
            return res.status(403).json({ message: 'Login Failed: Wrong password' });
        }

        // 4. สร้าง Token (เช็คให้ชัวร์ว่า JWT_SECRET ใน .env มีค่า)
        if (!JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }

        const token = jwt.sign(
            { id_member: m.id_member, username: m.username, role: m.role },
            JWT_SECRET,
            { expiresIn: '2h' }
        );

        // ส่ง Token กลับไป
        res.json({ token, role: m.role });

    } catch (err) {
        console.log("Error Login:", err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
// API Register
router.post('/regis',async (req,res) => {
    try{
        const {first_name,last_name,email,username,password,role} = req.body
        const hash = await bcrypt.hash(password,10)
        const [rows] = await db.query(`insert into tb_member (first_name,last_name,email,username,password,role) values (?,?,?,?,?,?)`,[first_name,last_name,email,username,hash,role])
        res.json(rows)
    }catch(err){
        console.error("Error Register",err)
        res.status(500).json({message:'Error Register'})
    }
})

module.exports = router