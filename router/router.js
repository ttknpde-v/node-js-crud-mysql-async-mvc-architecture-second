const log = require('../log/logging').logger
const path = require('../log/logging').path
const crud = require('../crud/crud')
const express = require('../service/modules-app').express
const router = require('../service/modules-app').express.Router()
const bodyParser = require('../service/modules-app').bodyParser


// set middleware for post method
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true}))


// set path for showing ejs file and static files
// using .resolve("./") method instead .join(__dirname) because (./) Used to display the path where the terminal is opened
// So it's good when you deploy application to server
let ejs = path.resolve("./../ui/views");
let staticFiles = path.resolve("./../ui");
router.use(express.static(staticFiles))

const Crud = new crud()

router.get('/', (req, res) => {
    res.render(ejs + '/activity-home.ejs')
})

router.get('/views', async (req, res) => {
    try {

        let list = await Crud.reads()
        log.info({values: list})
        res.render(ejs + '/activity-views.ejs', {list: list})

    } catch (error) {

        log.debug("router's get('/view') method have the problem and cause : " + error.message)
        throw error
    }
})

router.get('/api/edit/(:id)', async (req, res) => {
    try {
        let toy = await Crud.read(req.params["id"]).then((toy) => {
            res.render(ejs + '/activity-edit.ejs', {
                toy_id: toy[0].toy_id,
                toy_product_name: toy[0].toy_product_name,
                toy_product_price: toy[0].toy_product_price
            })
        }).catch((error) => {
            log.info("catch() method in read async it's working and cause : " + error)
            res.redirect('/views')
        })

    } catch (error) {

        log.debug("router's get('/api/edit/(:id)') method have the problem and cause : " + error.message)
        throw error
    }
})

router.get('/api/delete/(:id)', async (req, res) => {
    try {

        let toy = await Crud.delete(req.params["id"]).then(() => {
            res.redirect('/views')
        }).catch((error) => {
            log.info("catch() method in delete async it's working and cause : " + error)
            res.redirect('/')
        })

    } catch (error) {

        log.debug("router's get('/api/edit/(:id)') method have the problem and cause : " + error.message)
        throw error
    }
})

router.post('/api/create', async (req, res) => {
    try {

        let {product_name, product_price, product_status} = req.body;
        let product_build = Crud.formatDatetimeSql()
        // log.info(`product_name : ${product_name}, product_price : ${product_price}, product_status : ${product_status} ,product_build : ${product_build}`)
        let toy = await Crud.create(product_name, product_price, product_status, product_build)
        // log.info({values: toy})
        res.redirect('/views')

    } catch (error) {
        log.debug("router's post('/api/create') method have the problem and cause : " + error.message)
        throw error
    }
})


router.post('/api/edit', async (req, res) => {
    try {

        let {product_name, product_price, product_status, toy_id} = req.body;
        // log.info(`product_name : ${product_name}, product_price : ${product_price}, product_status : ${product_status} ,product_build : ${product_build}`)
        let update = await Crud.update(product_name, product_price, product_status, toy_id)
        // log.info({values: toy})
        res.redirect('/views')

    } catch (error) {
        log.debug("router's post('/api/edit') method have the problem and cause : " + error.message)
        throw error
    }
})

module.exports = router