const styleConfig=require('./NavyRecordReview/navy_psr/config/style.config.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path=require('path');

module.exports={
    devtool: 'source-map',
    entry: {
        style: path.resolve(__dirname, './NavyRecordReview/style.scss')
    },
    output : {
        path: path.resolve(__dirname, 'NavyRecordReview')
    },
    module:{
        rules:[
            ...styleConfig.rules()
    ]},
    plugins: [
        new MiniCssExtractPlugin({
            filename: './style.min.css',
        })
    ]
}