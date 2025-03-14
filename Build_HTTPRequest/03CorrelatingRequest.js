import http from 'k6/http'
import {check} from 'k6'

export default function () {
    let res = http.get('https://test-api.k6.io/public/crocodiles/')
    let croco = res.json()
    let crocoId = croco[0].id
    let crocName = croco[0].name

    res = http.get(`https://test-api.k6.io/public/crocodiles/${crocoId}/`)
    console.log("res", res)
    check(res, {
        'Validate Status': (res) => res.status === 200,
        // 'Validate value' : (res) => res.body.includes("Sobek")
        'Validate name' : (res) => res.json().name == crocName
    })
}