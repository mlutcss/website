import ejsPlugin from '@11ty/eleventy-plugin-ejs';

export default function(config){
  config.addPlugin(ejsPlugin, {
		_with: false,
		localsName: 'it'
	});

	config.addCollection('art-api', (collectionApi) => {
		const arts = collectionApi.getFilteredByGlob('src/arts/**/*.ejs')
		arts.forEach(art => {
			art.outputPath = `./dist/art-api/${art.fileSlug}/index.html`
		})
		return collectionApi.getFilteredByGlob('src/arts/**/*.ejs')
	})

  config.addPassthroughCopy('src/assets')

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      layouts: "layouts",
      data: "_data"
    }
  }
}