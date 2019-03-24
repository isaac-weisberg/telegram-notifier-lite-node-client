"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
class TelegramNotifierLite {
    constructor(baseUri, port, token) {
        this.baseUri = baseUri;
        this.port = port;
        this.token = token;
    }
    send(data, token = "") {
        const json = JSON.stringify({
            token: token || this.token,
            message: JSON.stringify(data, null, 2)
        });
        const options = {
            hostname: this.baseUri,
            path: '/api/send',
            method: 'POST',
            port: this.port,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return new Promise((resolve, reject) => {
            const req = http.request(options, (res) => {
                if (res.statusCode === 200) {
                    resolve(res);
                }
                else {
                    reject(res);
                }
            });
            req.on('error', (error) => {
                reject(error);
            });
            req.write(json);
            req.end();
        });
    }
}
exports.TelegramNotifierLite = TelegramNotifierLite;
