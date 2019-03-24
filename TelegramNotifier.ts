export interface TelegramNotifier {
    token: string;  // Semicolons are not necessary and should be omitted.
    send(data: any, token: string): Promise<any>; // Having a spacing between 2 lines improves readabilty.

}
