// Idea : cache entity in tiles and others things
import { world } from './ecs.js'

const cache = {
    entitiesAtLocation: {},
}

/**
 * Add cached item
 * @param {String} name
 * @param {String} key
 * @param {any} value
 */
const addCacheSet = (name, key, value) => {
    if (cache[name][key]) {
        cache[name][key].add(value)
    } else {
        cache[name][key] = new Set()
        cache[name][key].add(value)
    }
}

/**
 * Remove cached item
 * @param {String} name
 * @param {String} key
 * @param {any} value
 */
const deleteCacheSet = (name, key, value) => {
    if (cache[name][key] && cache[name][key].has(value)) {
        cache[name][key].delete(value)
        if (cache[name][key].size === 0) {
            delete cache[name][key]
        }
    }
}

/**
 * Read cache
 * @param {String} name
 * @param {String} key
 * @param {any} value
 * @returns
 */
const readCacheSet = (name, key) => {
    if (cache[name][key]) {
        return cache[name][key]
    }
}

const readCacheArray = (name, key) => {
    if (cache[name][key]) {
        return Array.from(cache[name][key])
    }
    return []
}

const getEntitiesAt = (...args) => {
    switch (args.length) {
        case 1:
            return readCacheArray(
                'entitiesAtLocation',
                `${args[0].x},${args[0].y}`,
            )
        case 2:
            return readCacheArray('entitiesAtLocation', `${args[0]},${args[1]}`)
    }
}

window.cache = cache

export {
    addCacheSet,
    cache,
    deleteCacheSet,
    getEntityAt,
    getEntitiesAt,
    readCacheArray,
    readCacheSet,
}
