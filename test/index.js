var greetingTpl = require('./greeting.html');

console.log(greetingTpl({
    name: 'leungwensen',
    man: {
        game: 'LOL',
    },
    invisibleType: 'H',
    animates: [
        {
            name: '少年的妄想星球',
            type: 'H',
        },
        {
            name: '海賊王',
        },
        {
            name: '蟲師',
        },
    ]
}));
