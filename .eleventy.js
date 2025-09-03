import ejsPlugin from '@11ty/eleventy-plugin-ejs'

export default function(config){
  config.addPlugin(ejsPlugin,{
		_with: false,
    localsName: 'it'
	});


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