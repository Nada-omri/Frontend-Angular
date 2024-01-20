import { Account } from "./Account";
import { Message } from "./Message";

export interface Conversation{
    id?:number,
    lastModified?:Date,
    buyer?:Account,
    seller?:Account,
    messages?:Message[]
}