export interface WebSocketMessage<T> {
    event: string;
    data: T
}
