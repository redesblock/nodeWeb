const OPTIMAL_CONNECTED_PEERS = 100;
const OPTIMAL_POPULATION = 1000;
const OPTIMAL_DEPTH = 4;
const GENERIC_ERROR = 'There may be issues with your Bee node or connection.';
const THRESHOLDS = {
    connected: [
        {
            minimumValue: OPTIMAL_CONNECTED_PEERS,
            explanation: `Perfect! ${OPTIMAL_CONNECTED_PEERS} or more connected peers indicate a healthy topology.`,
            score: 2,
        },
        {
            minimumValue: 1,
            explanation: `Your Bee node is connected to peers, but this number should ideally be above ${OPTIMAL_CONNECTED_PEERS}. If you have only started your Bee node, this number may increase quickly.`,
            score: 1,
        },
        {
            minimumValue: 0,
            explanation: 'Your Bee node has not connected to any peers. ' + GENERIC_ERROR,
            score: 0,
        },
    ],
    population: [
        {
            minimumValue: OPTIMAL_POPULATION,
            explanation: 'Perfect! Your Bee node seems to have a realistic value for the network size, which means everything is working well on your end.',
            score: 2,
        },
        {
            minimumValue: 1,
            explanation: `Population is usually above ${OPTIMAL_POPULATION.toLocaleString()}. If the number does not increase within a few hours, there may be issues with your Bee node.`,
            score: 1,
        },
        {
            minimumValue: 0,
            explanation: 'Your Bee node has no information on the network population. ' + GENERIC_ERROR,
            score: 0,
        },
    ],
    depth: [
        {
            minimumValue: OPTIMAL_DEPTH,
            explanation: 'Perfect! Your Bee node has the highest available depth.',
            score: 2,
        },
        {
            minimumValue: 1,
            explanation: `Your Bee node is supposed to reach a depth of ${OPTIMAL_DEPTH} eventually. Stagnation or decrease in this number may indicate problems with your Bee node.`,
            score: 1,
        },
        {
            minimumValue: 0,
            explanation: 'Your Bee node has not started building its topology yet. ' + GENERIC_ERROR,
            score: 0,
        },
    ],
};
export function pickThreshold(key, value) {
    const thresholds = THRESHOLDS[key];
    const maximumScore = thresholds[0].score;
    for (const item of thresholds) {
        if (value >= item.minimumValue) {
            return {
                score: item.score,
                maximumScore,
                explanation: item.explanation,
            };
        }
    }
    const last = thresholds[thresholds.length - 1];
    return {
        score: last.score,
        maximumScore,
        explanation: last.explanation,
    };
}

export const META_FILE_NAME = '.swarmgatewaymeta.json'
export const PREVIEW_FILE_NAME = '.swarmgatewaypreview.jpeg'
export const PREVIEW_DIMENSIONS = { maxWidth: 250, maxHeight: 175 }
export const BZZ_LINK_DOMAIN = import.meta.env.VITE_BASE_BZZ_LINK_DOMAIN || 'bzz.link'


export const config = {
    BEE_API_HOST: sessionStorage.getItem('api') ?? import.meta.env.VITE_BASE_API ?? 'http://localhost:1633',
    SENTRY_KEY: import.meta.env.REACT_APP_SENTRY_KEY,
    BEE_DEBUG_API_HOST: sessionStorage.getItem('debug_api') ?? import.meta.env.VITE_BASE_DEBUG_API ?? 'http://localhost:1635',
    BLOCKCHAIN_EXPLORER_URL: import.meta.env.REACT_APP_BLOCKCHAIN_EXPLORER_URL ?? 'https://blockscout.com/xdai/mainnet',
    BEE_DOCS_HOST: import.meta.env.REACT_APP_BEE_DOCS_HOST ?? 'https://docs.ethswarm.org/docs/',
    BEE_DISCORD_HOST: import.meta.env.REACT_APP_BEE_DISCORD_HOST ?? 'https://discord.gg/eKr9XPv7',
    GITHUB_REPO_URL: import.meta.env.REACT_APP_BEE_GITHUB_REPO_URL ?? 'https://api.github.com/repos/ethersphere/bee',
    BEE_DESKTOP_URL: import.meta.env.REACT_APP_BEE_DESKTOP_URL ?? window.location.origin,
}
