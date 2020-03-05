import * as express from 'express'
import { Application } from 'express'
import routes from './routes/users'
import * as bodyParser from 'body-parser'
class App {
    public app: Application
    public port: number

    constructor(appInit: { port: number;}) {
        this.app = express()
        this.port = appInit.port
        this.middleware()
        this.routes()
    }
    private middleware() {
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: true }))
    }
    private routes() {
        this.app.use('/users', routes);
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the http://localhost:${this.port}`)
        })
    }
}

export default App
