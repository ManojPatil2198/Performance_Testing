import http from 'k6/http'
import { check } from 'k6'
import { sleep } from 'k6'
import exec from 'k6/execution'

export const options =
{
    vus : 10,
    duration : '10s',
    thresholds : {
        http_req_duration : [ 'p(95) < 700', 'avg < 400', 'p(99)<700'],
        http_req_failed : ['rate<0.01'],
        http_req_waiting : [ 'p(95) < 200'],
        http_reqs : ['count > 70', 'rate > 4'],
        vus : ['value>9'],
        checks : ['rate>=0.90']
    }
}
export default function(){
    console.log("iterationInTest", exec.scenario.iterationInTest in [1, 3, 5] ? 'foo' : exec.scenario.iterationInTest)
    // const res = http.get('https://test.k6.io/' + (exec.scenario.iterationInTest === 1 ? 'foo' : '')); 
    const res = http.get(`https://test.k6.io/${exec.scenario.iterationInTest in [1, 3, 5]  ? 'foo' : ''}`);
    sleep(1)
    check(res, {
        'true is true' : (res) => res.status === 200
    })
}