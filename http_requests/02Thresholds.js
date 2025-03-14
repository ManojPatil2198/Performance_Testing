import http from 'k6/http'
import { check } from 'k6'
import { sleep } from 'k6'

export const options =
{
    vus : 10,
    duration : '10s',
    thresholds : {
        http_req_duration : [ 'p(95) < 300'],
        http_req_failed : ['rate<0.01'],
        http_req_waiting : [ 'p(95) < 200']
    }
}
export default function(){
    const res = http.get('https://test.k6.io/');
    sleep(1)
    check(true, {
        'true is true' : (value) => value === true
    })
}