import { TelegramNotifier } from "./TelegramNotifier";
import * as http from "http";

export class TelegramNotifierLite implements TelegramNotifier {

    baseUri: string;
    port: number;
    token: string;

    constructor(baseUri: string, port: number, token: string) {
        this.baseUri = baseUri;
        this.port = port;
        this.token = token;
    }

    public send(data: any, token = ""): Promise<any> {
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
        }

        return new Promise<any>(
            (resolve, reject) => {
                const req = http.request(options, (res: http.IncomingMessage) => {
                    if (res.statusCode === 200) {
                        resolve(res);
                    } else {
                        reject(res);
                    }
                })
                req.on('error', (error) => {
                    reject(error);
                })
                req.write(json)
                req.end()
            });
    }
}