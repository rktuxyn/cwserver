/// <reference types="node" />
/// <reference types="node" />
import { ISowServer } from './server';
import { ISession } from './app-static';
import { EventEmitter } from 'node:events';
import { Server } from 'node:http';
/** [socket.io blueprint] */
export interface IOSocket extends EventEmitter {
    nsp: object;
    server: object;
    adapter: object;
    id: string;
    request: {
        session: ISession;
        headers: any;
    };
    client: object;
    conn: object;
    rooms: {
        [id: string]: string;
    };
    connected: boolean;
    disconnected: boolean;
    handshake: any;
    json: IOSocket;
    volatile: IOSocket;
    broadcast: IOSocket;
    to(room: string): IOSocket;
    in(room: string): IOSocket;
    use(fn: (packet: any[], next: (err?: any) => void) => void): IOSocket;
    send(...args: any[]): IOSocket;
    write(...args: any[]): IOSocket;
    join(name: string | string[], fn?: (err?: any) => void): IOSocket;
    leave(name: string, fn?: () => void): IOSocket;
    leaveAll(): void;
    disconnect(close?: boolean): IOSocket;
    listeners(event: string): (() => void)[];
    compress(compress: boolean): IOSocket;
    error(err: any): void;
}
/** [/socket.io blueprint] */
export interface IWsClientInfo {
    on(ev: 'getClient', handler: IWsClient): void;
    on(ev: 'disConnected' | 'connected', handler: IEvtHandler): void;
    on(ev: 'beforeInitiateConnection', handler: IWsNext): void;
    emit(ev: 'disConnected' | 'connected' | 'beforeInitiateConnection', me: ISowSocketInfo, wsServer: ISowSocketServer): void;
    getServerEvent(): {
        [x: string]: any;
    } | void;
    beforeInitiateConnection: IWsNext;
    client: IWsClient;
}
export interface ISowSocketInfo {
    token: string;
    loginId?: string;
    hash?: string;
    socketId: string;
    isOwner: boolean;
    isAuthenticated: boolean;
    isReconnectd: boolean;
    group?: string;
    roleId: string;
    readonly socket: IOSocket;
    sendMsg(method: string, data: any): void;
}
export interface ISowSocketServer {
    readonly clients: ISowSocketInfo[];
    isActiveSocket(token: string): boolean;
    getOwners(group?: string): ISowSocketInfo[];
    exists(hash: string): boolean;
    findByHash(hash: string): ISowSocketInfo[];
    findByLogin(loginId: string): ISowSocketInfo[];
    findByRoleId(roleId: string): ISowSocketInfo[];
    findByToken(token: string): ISowSocketInfo[];
    toList(sockets: ISowSocketInfo[]): {
        [x: string]: any;
    }[];
    getClientByExceptHash(exceptHash: string, group?: string): ISowSocketInfo[];
    getClientByExceptLogin(exceptLoginId: string, group?: string): ISowSocketInfo[];
    getClientByExceptToken(token: string, group?: string): ISowSocketInfo[];
    getSocket(token: string): ISowSocketInfo | void;
    removeSocket(token: string): boolean;
    sendMsg(token: string, method: string, data?: any): boolean;
}
type IEvtHandler = (me: ISowSocketInfo, wsServer: ISowSocketServer) => void;
type IWsNext = (session: ISession, socket: IOSocket) => void | boolean;
type IWsClient = (me: ISowSocketInfo, session: ISession, sowSocket: ISowSocketServer, server: ISowServer) => {
    [x: string]: any;
};
export declare function wsClient(): IWsClientInfo;
/**
 * If you want to use it you've to install socket.io
 * const ws = socketInitilizer( server, SocketClient() );
 * ws.create( require( "socket.io" ), app.httpServer );
 */
export declare function socketInitilizer(server: ISowServer, wsClientInfo: IWsClientInfo): {
    readonly isConnectd: boolean;
    readonly wsEvent: {
        [x: string]: any;
    } | void;
    readonly create: (ioserver: any, httpServer: Server) => boolean;
    readonly wsServer: ISowSocketServer;
};
export {};
