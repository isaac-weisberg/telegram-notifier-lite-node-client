import { TelegramNotifier } from "./TelegramNotifier";
import * as http from "http"; 

/*
`import *` statement is generally unwarranted 
and only the necessary members must be imported like

import { ClientRequest, IncomingMessage } from 'http'
*/


export class TelegramNotifierLite implements TelegramNotifier {

    baseUri: string; // Semicolons not needed
    port: number;
    token: string;

    constructor(baseUri: string, port: number, token: string) {
        this.baseUri = baseUri;
        this.port = port;
        this.token = token;
    }

    public send(data: any, token = ""): Promise<any> {
        // JSON.stringify is a function that throws
        // Errors should be handled here in a try/catch block. 
        // Might as well make the function async
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

        /*
        Following type is `Promise<any>`
        but it's unclear why exactly it is `any`
        because it's obvious that you resolve it with `http.IncomingMessage`
        */
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