module.exports = function(eleventyConfig) {
    // Copy some files and folders as-is to the output folder
    eleventyConfig.addPassthroughCopy('./src/style.css');
    eleventyConfig.addPassthroughCopy('./src/assets');
    eleventyConfig.addPassthroughCopy('./src/admin');
    eleventyConfig.addPassthroughCopy("README.md");
    
    // Add fiveStarBooks collection
    eleventyConfig.addCollection("fiveStarBooks", function(collectionApi) {
        return collectionApi.getFilteredByTag("books").filter(book => book.data.rating === 5);
    });

    // Add Want-to-Read collection
    [5, 4, 3, 2, 1].forEach(rating => {
        eleventyConfig.addCollection(`${rating}StarBooks`, collectionApi => {
            return collectionApi.getFilteredByTag("books")
                .filter(book => book.data.rating === rating);
        });
    });

    // This will let Eleventy generate one page per rating
eleventyConfig.addCollection("ratingsList", function() {
  return [5, 4, 3, 2, 1];
});


    // Configure input and output directories
    return {
        dir: {
            input: "src",
            output: "_site"
        }
    };
}
