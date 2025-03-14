import http from 'k6/http'
import {check} from 'k6'

export default function () {
    let res = http.get('https://test-api.k6.io/public/crocodiles/')
    res = http.get('https://test-api.k6.io/public/crocodiles/7/')
    console.log("res", res)
    let testName = res.json().name
    console.log("testName", testName)
    check(res, {
        'Get Status': (res) => res.status === 200,
        // 'Validate value' : (res) => res.body.includes("Sobek")
        'Validate value' : (res) => res.json().name == "Sobek"
    })
}