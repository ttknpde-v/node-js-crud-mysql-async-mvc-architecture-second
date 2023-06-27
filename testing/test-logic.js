const application = require('../service/modules-app').express()
const router = require('../router/router')
const log = require('../log/logging').logger

class TestLogic {
    constructor() {
        application.use(router).listen(3000 , (error) => {
            if (error)  log.warn("found some errors on port 3000 and cause : "+error)
        })
    }
}

new TestLogic()
