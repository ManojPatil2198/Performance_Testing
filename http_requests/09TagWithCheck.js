import http from 'k6/http'
import { check } from 'k6'

export const options = {
    thresholds: {
        'checks{page:"home"}': ['rate>0.90']
    }
}
export default function () {
    const res = http.get('https://test.k6.io', { tags: { page: 'home' } });
    check(true, {
        'true is true': (value) => value === true
    })
    // const res1 = http.get(https://test.k6.io/news.php);
    // check(res1, {'Status is correct' : (res1) => res1.status === 200,})

    console.log(`Status is ${ res.status }`)
    // console.log("Status is " + (res.status)  )

    check(res, {
        'Status is correct': (res) => res.status === 200,
        'Page contains expected text': (res) => res.body.includes("Collection of simple web-pages suitable for load testing.") === true
    }, { page: 'home' })

    check(res, {
        'Status check': (a) => a.status === 200
    }, { page: 'home' })

    let name = 'VaibhaV'

    check(name, {
        "Name check": function (testName) {
            if (testName === 'VaibhaV') {
                return true
            }
        }
    })
}