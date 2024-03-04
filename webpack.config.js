

const psrParserConfig = require('./NavyRecordReview/navy_psr/config/psrParser.config.js');
const htmlConfig= require('./NavyRecordReview/navy_psr/config/html.config.js');


module.exports = {
    devtool: 'source-map',
    module:{
        rules:[
            ...psrParserConfig.rules(),
            ...htmlConfig.rules()
        ]
    },
    node:{
        global: true
    },
    resolve: {
        fallback: {
            ...psrParserConfig.fallbacks(),
            "url": require.resolve("url/"),
            "fs/promises": require.resolve("fs/promises")
        }
    },
    plugins: [
        ...psrParserConfig.plugins(),
    ]
}