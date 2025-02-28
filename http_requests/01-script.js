import http from 'k6/http'
import { check } from 'k6'

export default function () {
    const res = http.get('https://test.k6.io');
    check(true, {
        'true is true': (value) => value === true
    })

    console.log('Status is ${res.status}')

    check(res, {
        'Status is correct': (res) => res.status === 200,
        'Page contains expected text' : (res) => res.body.includes("Collection of simple web-pages suitable for load testing.") === true

    })

    check(res, {
        'Status check': (a) => a.status === 200
    })

    let name = 'VaibhaV'

    check(name, {
        "Name check": function (testName) {
            if (testName === 'VaibhaV') {
                return true
            }
        }
    })
}