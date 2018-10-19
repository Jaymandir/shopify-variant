var request = require('request').defaults({
    gzip: true,
    followAllRedirects: false,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
    }
})
var readline = require('readline')

const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

reader.question('What is the URL of the product? ', function(resp) {
    request(resp + '.json', function(err,res,body) {
        let variants = JSON.parse(body).product.variants
        reader.question('What is the size you are looking for? To view all variants, type all. ', function(sz) {
            for(let i = 0; i < variants.length; i++) {
                if(sz == 'all') {
                    console.log(resp.split('/').slice(0, 3).join('/') + '/cart/' + variants[i].id + ':1')
                } else {
                    if(sz.toLowerCase() == variants[i].title.toLowerCase()) {
                        console.log(resp.split('/').slice(0, 3).join('/') + '/cart/' + variants[i].id + ':1')
                    }
                }
            }
            reader.close()
        })
    })
})