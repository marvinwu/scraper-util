## purpose

a simple cli wrapper for [website-scraper - npm](https://www.npmjs.com/package/website-scraper)

## how to install

```
npm install -g scraper-util
```

or local install

```json
# package.json 
  "scripts": {
    "scraper-util": "scraper-util",
  },

```

```bash
npm run scraper-util --silent -- scrape
```


### how to use

```
> scraper-util "scrape" "--help"

Usage: scraper-util scrape [options] <configFile>

Options:
  -url, --url [urlFile]  urls csv path
  -h, --help             output usage information
```


* gen sample config File 

```
npm run scraper-util --silent -- genConfig
```

