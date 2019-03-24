export interface TelegramNotifier {
    token: string;
    send(data: any, token: string): Promise<any>;

}
