import App from './app'

const server = new App({
    port: 5000,
})
server.listen()

export default server.app
