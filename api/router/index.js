var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var fs = require('fs');

// 解析json
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({}));

//登录路由
router.post('/login', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    let username = req.body.username;
    if (username != '') {
        //读取json文件
        fs.readFile('./data/user.json', 'utf-8', (err, data) => {
            if (err) {
                res.send('数据库读取失败');
            } else {
                //比对json文件
                let result = JSON.parse(data);
                let registerUser = result["registerUser"];
                let check = false;
                for (var i = 0; i < registerUser.length; i++) {
                    if (username == registerUser[i]["name"]) {
                        check = true;
                        break;
                    }
                }
                if (check) {
                    let responsemsg = { statue: true };
                    res.send(responsemsg);
                } else {
                    registerUser.push({ "name": username, winTime: 0 });
                    result = JSON.stringify(result);
                    fs.writeFile('./data/user.json', result, (err) => {
                        if (err) {
                            console.log('写文件错误')
                        }
                    })
                    let responsemsg = { statue: true };
                    res.send(responsemsg);

                }
            }
        });
    }
});

//排名路由
router.post('/getTop10', (req, res, next) => {
    //跨域
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    //读取json文件
    fs.readFile('./data/user.json', 'utf-8', (err, data) => {
        if (err) {
            res.send('数据库读取失败');
        } else {
            let result = JSON.parse(data);
            let registerUser = result["registerUser"];
            registerUser.sort((a, b) => {
                return b.winTime - a.winTime;
            })
            if (registerUser.length < 10) {
                res.send(registerUser);
            } else {
                let top10User = registerUser.slice(0, 10);
                res.send(top10User);
            }
        }
    })
})

// 获胜
router.post('/winUpdate', (req, res, next) => {
    //跨域
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    let username = req.body.username;
    fs.readFile('./data/user.json', 'utf-8', (err, data) => {
        if (err) {
            res.send('数据库读取失败');
        } else {
            let result = JSON.parse(data);
            let registerUser = result["registerUser"];
            for (var i = 0; i < registerUser.length; i++) {
                if (username == registerUser[i]["name"]) {
                    registerUser[i]["winTime"] = registerUser[i]["winTime"] + 1;
                    break;
                }
            }
            result = JSON.stringify(result);
            fs.writeFile('./data/user.json', result, (err) => {
                if (err) {
                    console.log('写文件错误');
                }
            })
            let responsemsg = { statue: true };
            res.send(responsemsg);
        }
    })
})
module.exports = router;