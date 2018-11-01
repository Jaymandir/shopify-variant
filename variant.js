var request = require('request').defaults({
    gzip: true,
    followAllRedirects: false,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
    }
})

function getVariants(url) {
    return new Promise((resolve, reject) => {
        request(url + '.json', (err, res, body) => {
            let variants = JSON.parse(body).product.variants
            let allVariants = []
            variants.forEach(function(variant) {
                allVariants.push({
                    id: variant.id,
                    title: variant.title
                })
            })
            resolve(allVariants)
        })
    })
}

module.exports = getVariants