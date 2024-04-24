const path = require('path')
const { format } = require('date-fns')
const { v4: uuid } = require('uuid')
const fs = require('fs')
const fsPromises = require('fs').promises

const logEvents = async (message, logFileName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`

    try {
        const logsDir = path.join(__dirname, '..', 'logs');
        if (!fs.existsSync(logsDir)) {
            await fsPromises.mkdir(logsDir)
        }
        await fsPromises.appendFile(path.join(logsDir, logFileName), logItem)
    } catch (err) {
        console.log(err)
    }
}

// will log every message but we probably wouldn't want to do that for a real app 
const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log')
    console.log(`${req.method} ${req.path}`)
    next() // moves on to next piece of middleware or ? 
}

module.exports = { logEvents, logger}