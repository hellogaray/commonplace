module.exports = function(eleventyConfig) {
    // Copy some files and folders as-is to the output folder
    eleventyConfig.addPassthroughCopy('./src/style.css');
    eleventyConfig.addPassthroughCopy('./src/assets');
    eleventyConfig.addPassthroughCopy('./src/admin');
    eleventyConfig.addPassthroughCopy("README.md");
    
    // Configure input and output directories
    return {
        dir: {
            input: "src",
            output: "_site"
        }
    };
}

