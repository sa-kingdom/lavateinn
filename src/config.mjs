// Import modules
import {existsSync} from "node:fs";
import dotenv from "dotenv";

/**
 * Load configs from system environment variables.
 */
export function runLoader() {
    const dotenvPath = new URL("../.env", import.meta.url);

    const isDotEnvFileExists = existsSync(dotenvPath);
    const isCustomDefined = get("APP_CONFIGURED") === "1";

    if (!isDotEnvFileExists && !isCustomDefined) {
        console.error(
            "No '.env' file detected in app root.",
            "If you're not using dotenv file,",
            "set 'APP_CONFIGURED=1' into environment variables.",
            "\n",
        );
        throw new Error(".env not exists");
    }

    dotenv.config();
}

/**
 * Check is production mode.
 * @module config
 * @function
 * @return {boolean} true if production
 */
export function isProduction() {
    return getMust("NODE_ENV") === "production";
}

/**
 * Get overview of current environment.
 * @module config
 * @function
 * @return {object}
 */
export function getOverview() {
    return {
        node: getFallback("NODE_ENV", "development"),
        runtime: getFallback("RUNTIME_ENV", "native"),
    };
}

/**
 * Shortcut to get config value.
 * @module config
 * @function
 * @param {string} key the key
 * @return {string} the value
 */
export function get(key) {
    return process.env[key];
}

/**
 * Get the bool value from config, if yes, returns true.
 * @module config
 * @function
 * @param {string} key the key
 * @return {boolean} the bool value
 */
export function getEnabled(key) {
    return getMust(key) === "yes";
}

/**
 * Get the array value from config.
 * @module config
 * @function
 * @param {string} key the key
 * @param {string} [separator=,] the separator.
 * @return {string[]} the array value
 */
export function getSplited(key, separator=",") {
    return getMust(key).
        split(separator).
        filter((s) => s).
        map((s) => s.trim());
}

/**
 * Get the value from config with error thrown.
 * @module config
 * @function
 * @param {string} key the key
 * @return {string} the expected value
 * @throws {Error} if value is undefined, throw an error
 */
export function getMust(key) {
    const value = get(key);
    if (value === undefined) {
        throw new Error(`config key ${key} is undefined`);
    }
    return value;
}

/**
 * Get the value from config with fallback.
 * @module config
 * @function
 * @param {string} key the key
 * @param {string} fallback the fallback value
 * @return {string} the expected value
 */
export function getFallback(key, fallback) {
    return get(key) || fallback;
}
