import constants from 'next/constants.js';

export default (phase, { defaultConfig }) => {
    /** @type {import('next').NextConfig} */
    const devNextConfig = {
    };

    /** @type {import('next').NextConfig} */
    const prodNextConfig = {
        basePath: "/pentola"
    };

    if (phase === constants.PHASE_DEVELOPMENT_SERVER) {
        return devNextConfig;
    }
    return prodNextConfig;
}