class DirectSql {
    static reads = 'select * from toystore.toys;'
    static read = 'select * from toystore.toys where toy_id = ? ;'
    static create = 'insert into  toystore.toys(toy_product_name, toy_product_price , toy_product_status , toy_product_build) values(?,?,?,?) ;'
    static delete = 'delete from toystore.toys where toy_id = ? ;'
    static update = 'update toystore.toys set toy_product_name = ? , toy_product_price = ? , toy_product_status = ? where toy_id = ? ;'
}

module.exports = DirectSql