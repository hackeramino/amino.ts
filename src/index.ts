import { request } from './request'

import IAminoCache from "./components/cache"
import IAminoStorage from "./components/storage"

import EventHandler, { event_type } from "./events/events"

import { AminoCommunity, IAminoCommunityStorage } from "./components/community/community"
import { AminoMember, IAminoMemberStorage } from "./components/member/member"
import { AminoThread, IAminoThreadStorage, thread_type } from "./components/thread/thread"
import { AminoMessage, IAminoMessageStorage, message_type } from "./components/message/message"
import { AminoBlog, IAminoBlogStorage } from "./components/blog/blog"
import { AminoComment, IAminoCommentStorage } from "./components/comment/comment"

export {
    request,
    IAminoCache,
    IAminoStorage,
    AminoCommunity,
    IAminoCommunityStorage,
    AminoMember,
    IAminoMemberStorage,
    AminoThread,
    thread_type,
    IAminoThreadStorage,
    AminoMessage,
    message_type,
    IAminoMessageStorage,
    AminoBlog,
    IAminoBlogStorage,
    AminoComment,
    IAminoCommentStorage
}

export default class AminoClient {

    public communities: IAminoCommunityStorage;

    public session: string;
    public device: string;

    private event_handler: EventHandler;

    /**
     * Initialization of the main client
     * @param {string} [login] user login
     * @param {string} [password] user password
     * @param {string} [device] user device id
     */
    constructor(login: string, password: string, device: string) {
        this.device = device;
        this.session = request("POST", `https://service.narvii.com/api/v1/g/s/auth/login`, {
            "json": {
                "email": login,
                "secret": "0 " + password,
                "deviceID": this.device,
                "clientType": 100,
                "action": "normal",
                "timestamp": new Date().getTime()
            }
        }).sid;
        this.communities = new IAminoCommunityStorage(this);
    }

    /**
     * Set callback to event
     * @param {string} [event] event name
     * @param {any} [callback] event callback
     */
    public on(event: event_type, callback: any) {
        if (this.event_handler === undefined) {
            this.event_handler = new EventHandler(this);
        } this.event_handler.on(event, callback);
    }
};
