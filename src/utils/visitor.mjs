// The simple toolbox for fetching visitor information from HTTP request.

import {isProduction} from "../config.mjs";

/**
 * Get IP Address.
 * @module visitor
 * @function
 * @param {object} req - The request.
 * @returns {string} The IP Address.
 */
export function getIPAddress(req) {
    if (!isProduction()) {
        return "127.0.0.1";
    }
    return req.ip;
}

/**
 * Get User-Agent.
 * @module visitor
 * @function
 * @param {object} req - The request.
 * @returns {string} The User-Agent.
 */
export function getUserAgent(req) {
    return req.header("user-agent") || "Unknown";
}
