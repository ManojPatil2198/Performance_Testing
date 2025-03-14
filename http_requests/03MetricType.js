import http from 'k6/http'
import { check } from 'k6'
import { sleep } from 'k6'

export const options =
{
    vus : 10,
    duration : '10s',
    thresholds : {
        http_req_duration : ['p(95) < 300','avg < 300'],
        http_reqs : [ 'count >70','rate > 4'],
        http_req_failed : ['rate <0.01'],
        http_req_waiting : [ 'p(95) < 200'],
        vus : ['value > 10'] 

    }
}
export default function(){
    const res = http.get('https://test.k6.io/');
    sleep(1)
    check(true, {
        'true is true' : (value) => value === true
    })
}