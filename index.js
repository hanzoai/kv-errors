"use strict";

/**
 * Error values for the Hanzo KV wire protocol.
 *
 * KVError is the root: catch it to catch anything this client raises. The rest
 * name where the failure came from — the server replied with an error, the
 * parser could not decode a frame, or the command never reached the wire.
 */

class KVError extends Error {
  get name() {
    return this.constructor.name;
  }
}

/** The server answered, and its answer was an error reply. */
class ReplyError extends KVError {
  constructor(message) {
    super(message);
    Error.captureStackTrace?.(this, ReplyError);
  }
}

/** A frame arrived that does not decode. `buffer` and `offset` locate it. */
class ParserError extends KVError {
  constructor(message, buffer, offset) {
    super(message);
    this.buffer = buffer;
    this.offset = offset;
    Error.captureStackTrace?.(this, ParserError);
  }
}

/** The command was abandoned before it was written. */
class AbortError extends KVError {}

/** A command in flight was cut off by a connection loss. */
class InterruptError extends AbortError {}

module.exports = { KVError, ReplyError, ParserError, AbortError, InterruptError };
