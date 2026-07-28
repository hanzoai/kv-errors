/** Root of every error this client raises. Catch it to catch them all. */
export declare class KVError extends Error {
  get name(): string;
}
/** The server answered, and its answer was an error reply. */
export declare class ReplyError extends KVError {
  constructor(message?: string);
}
/** A frame arrived that does not decode. `buffer` and `offset` locate it. */
export declare class ParserError extends KVError {
  constructor(message: string, buffer: Buffer, offset: number);
  buffer: Buffer;
  offset: number;
}
/** The command was abandoned before it reached the wire. */
export declare class AbortError extends KVError {}
/** A command in flight was cut off by a connection loss. */
export declare class InterruptError extends AbortError {}
