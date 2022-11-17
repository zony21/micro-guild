
const BundleAnalyzerPlugin =
    require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
module.exports = {
    images: {
        domains: ["images.microcms-assets.io"],
    },
    plugins: [new BundleAnalyzerPlugin()],
}