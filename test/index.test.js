const { urlTypeFilter, configMaker } = require('./util')
global.previousUrls = new Set([])

test('basic', () => {
  global.previousUrls = new Set([])
  const url = ['google.com', 'bbu.hk']
  const output = urlTypeFilter(
    'https://bbu.hk/wp-content/themes/generatepress/fonts/generatepress.eot',
    url
  )

  expect(output).toEqual(true)
})

test('basic', () => {
  global.previousUrls = new Set([])
  const url = ['https://www.succulentsandsunshine.com']
  const output = urlTypeFilter(['succulentsandsunshine.com'])

  expect(output).toEqual(true)
})

test('basic', () => {
  global.previousUrls = new Set([])
  const url = [null, 'bbu.hk']
  const output = urlTypeFilter(
    'https://bbu.hk/wp-content/themes/generatepress/fonts/generatepress.eot',
    url
  )

  expect(output).toEqual(true)
})

test('basic failed', () => {
  const url = [null]
  const output = urlTypeFilter('https://bbu.hk', url)
  expect(output).toEqual(true)
})

test('basic pattern', () => {
  const url = []
  const output = urlTypeFilter(
    'https://bbu.hk/wp-content/themes/generatepress/fonts/generatepress.eot',
    url,
    ['bbu.hk/test']
  )

  expect(output).toEqual(false)
})

test('config-maker basic 2', () => {
  const input = {
    urls: [null],
    directory: './',
    recursive: {
      depth: 1,
      domainFilter: [null],
      patternFilter: [null]
    },
    request: {
      userAgent: 'test',
      concurrency: 1,
      renderer: {
        phantom: null
      }
    }
  }

  const output = configMaker(input)
  console.log(output)

  expect(output.request.headers).toEqual({ 'User-Agent': 'test' })
  expect(output.requestConcurrency).toEqual(1)
  expect(output.recursive).toEqual(1)
  expect(output.ignoreErrors).toEqual(true)
})

test('config-maker basic 2', () => {
  const input = {
    urls: [null],
    directory: './',
    recursive: {
      depth: 1,
      domainFilter: [null],
      patternFilter: [null]
    },
    request: {
      userAgent: null,
      concurrency: 1,
      renderer: {
        phantom: null
      }
    }
  }

  const output = configMaker(input)
  expect(output.request.headers['User-Agent']).not.toBeNull()
})

test('miniconfig', () => {
  const input = {
    urls: [null],
    directory: './'
  }

  const output = configMaker(input)
  console.log(output)

  expect(output.request.headers['User-Agent']).not.toBeNull()
  expect(output.recursive).toEqual(0)
})

// test('config-maker puppetter', () => {
//   const input = {
//     urls: [null],
//     recursive: true,
//     domainFilter: [null],
//     directory: './',
//     requestConcurrency: 1,
//     maxRecursiveDepth: 2,
//     userAgent: 'test',
//     renderer: {
//       puppeteer: {
//         launchOptions: {
//           headless: false
//         },
//         scrollToBottom: {
//           timeout: 10000,
//           viewportN: 10
//         },
//         blockNavigation: true
//       }
//     },
//     sources: [],
//     filenameGenerator: 'bySiteStructure',
//     ignoreErrors: true
//   }
//   const output = configMaker(input)
//   console.log(output)
//   expect(output.request.headers).toEqual({ 'User-Agent': 'test' })
// })

// test('config-maker merge urls', () => {
//   const input = {
//     urls: ['1'],
//     recursive: true,
//     domainFilter: [null],
//     directory: './',
//     requestConcurrency: 1,
//     maxRecursiveDepth: 2,
//     userAgent: 'test',
//     renderer: {
//       puppeteer: {
//         launchOptions: {
//           headless: false
//         },
//         scrollToBottom: {
//           timeout: 10000,
//           viewportN: 10
//         },
//         blockNavigation: true
//       }
//     },
//     sources: [],
//     filenameGenerator: 'bySiteStructure',
//     ignoreErrors: true
//   }
//   const output = configMaker(input, ['test1', 'test2'])
//   expect(output.urls).toEqual(['1', 'test1', 'test2'])
// })
