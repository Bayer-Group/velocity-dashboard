# Developers Notes

## Local Development

For auto-reloading and running locally, run `npm run dev`.  This hosts the project from express using webpack middleware to live-update the source upon change.  Open a browser to http://localhost:3000 to see the example project.  

## Publishing to NPM

## Publishing Docs to gh_pages

The [homepage](/pages/ui-components/dashboard/) is maintained using the automatic page generator:

* from [project settings](/ui-components/dashboard/settings), click on 'Launch automatic page generator'
* edit the text, and select the theme (using Architect now)
* this publishes the homepage, but does not overwrite the demos

The [demos](/pages/ui-components/dashboard/dist/example.html) are maintained by merging master into the gh_pages branch and running `npm run package`.  This webpacks the examples into the dist directory in a format that can be statically loaded.