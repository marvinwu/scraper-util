const url = require('url')
const _ = require('lodash')
const randomUseragent = require('random-useragent')
// const PuppeteerPlugin = require('website-scraper-puppeteer')
const PhantomPlugin = require('website-scraper-phantom')
const SaveToExistingDirectoryPlugin = require('website-scraper-existing-directory')

const defaultConfig = {
  urls: [],
  directory: './',
  recursive: {
    depth: 0,
    domainFilter: [],
    patternFilter: []
  },
  request: {
    userAgent: null,
    concurrency: 10000,
    renderer: null
  },
  sources: [],
  filenameGenerator: 'bySiteStructure',
  ignoreErrors: true
}

function urlTypeFilter(inputUrl, domainWhiteList = [], patternWhiteList = []) {
  const domains = _.compact(domainWhiteList)
  const patterns = _.compact(patternWhiteList)
  if (!inputUrl) return false
  let flag = false
  domains.forEach(domain => {
    if (url.parse(inputUrl).hostname === domain) {
      flag = true
    }
  })

  patterns.forEach(pattern => {
    if (inputUrl.includes(pattern)) {
      flag = true
    }
  })

  if (!domains.length && !patterns.length) {
    flag = true
  }
  // eslint-disable-next-line no-undef
  if (previousUrls.has(inputUrl)) {
    flag = false
  }
  if (flag) {
    // eslint-disable-next-line no-undef
    previousUrls.add(inputUrl)
    console.log(inputUrl)
  }
  // eslint-disable-next-line no-undef
  if (previousUrls.size > 15000) {
    console.error('url list exceed maximum length, ending scraping')
    process.exit(0)
  }
  return flag
}

function configMaker(inputConfig, urls = []) {
  let outputConfig = Object.assign(defaultConfig, inputConfig)
  delete outputConfig.request
  delete outputConfig.recursive
  outputConfig = {
    ...outputConfig,
    urlFilter: inputUrl =>
      urlTypeFilter(
        inputUrl,
        _.get(inputConfig, 'recursive.domainFilter'),
        _.get(inputConfig, 'recursive.patternFilter')
      ),
    urls: _.compact([...outputConfig.urls, ...urls]),
    plugins: [new SaveToExistingDirectoryPlugin()]
  }

  _.set(
    outputConfig,
    'request.headers[User-Agent]',
    randomUseragent.getRandom()
  )
  if (_.get(inputConfig, 'request.userAgent')) {
    _.set(
      outputConfig,
      'request.headers[User-Agent]',
      _.get(inputConfig, 'request.userAgent')
    )
  }

  _.set(
    outputConfig,
    'requestConcurrency',
    _.get(inputConfig, 'request.concurrency', 10000)
  )

  _.set(outputConfig, 'recursive', _.get(inputConfig, 'recursive.depth', 0))

  if (_.get(inputConfig, 'request.renderer')) {
    const renderer = Object.keys(_.get(inputConfig, 'request.renderer'))[0]
    // const options = _.get(inputConfig, 'request.renderer')[renderer]
    // if (renderer === 'puppeteer') {
    //   outputConfig.plugins.push(new PuppeteerPlugin(options))
    // }

    if (renderer === 'phantom') {
      outputConfig.plugins.push(new PhantomPlugin())
    }
  }

  return outputConfig
}
module.exports = {
  urlTypeFilter,
  configMaker
}
