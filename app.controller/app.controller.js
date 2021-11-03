const mysql = require('mysql2');

class ClassCrud{

    constructor(){
        this.sql = mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'123329Ms-748',
            port:3306,
        });
        this.sql.query("use lojadb");
    }

    read(req, res){
        if(!req.params.id){
            this.sql.query("select * from user order by id asc", (err, results, fields) => {
                res.render("selecionar", {data:results});
            });
        }else{
            this.sql.query("select * from user where id=?", [req.params.id], (err, results, fields) => {
                res.render("selecionar", {data:results});
            });
        }
    }

    delete(req, res){
        this.sql.query("delete from user where id=?", [req.params.id]);
        res.render("deletar", {id: req.params.id});
    }

    create(req, res){
        this.sql.query("insert into user values (?, ?, ?)", [req.body.id, req.body.name, req.body.age]);
        res.render('inserir', {name:req.body.name})
    }

    update(req, res, controller=null){
        this.sql.query("update user set name=?, age=? where id=?", [req.body.name, req.body.age, req.body.id]);
        res.render("editar", {name: req.body.name})
    }

}

module.exports = ClassCrud;