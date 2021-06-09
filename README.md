## purpose

a simple cli wrapper for [website-scraper - npm](https://www.npmjs.com/package/website-scraper)

### how to use

* scape a single url


```
node cli.js scrape test.yaml --url test.csv
```

test.csv is urls to be scrape, one line each, or can specify in test.yaml


* genConfig

```
node cli.js genConfig

```


## default configs

```yaml
urls: #needed
  - 
directory: './' # mandary, output directory
# optional parameters
recursive:  
  depth: 0 # maxRecursiveDepth, default 0 
  domainFilter: # domainFilter and patternFilter can only pick one
    - # www.google.com
  patternFilter:
    - # web.store.google.com
request:
  userAgent: # default empty if empty then will use a random user agent
  concurrency: 10000 
  renderer: # default empty, no dynamic js site support
    # phantom:
# defaults
sources: [] # download html only
filenameGenerator: bySiteStructure
ignoreErrors: true

```