import { Conversation } from "./Conversation";

export interface Message{
    id?:number,
    received?:boolean,
    body?:string,
    sender?:string,
    conversation?:Conversation,
    date?:Date

}