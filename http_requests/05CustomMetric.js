import http from 'k6/http'
import { check } from 'k6'
import { sleep } from 'k6'
import { Counter, Trend } from 'k6/metrics'

export const options =
{
    vus : 10,
    duration : '10s',
    thresholds : {
        test_counter : ['count >= 70'],
        news_trend : ['p(90)<400'],
        home_trend : ['p(90)<400']
    }
}

let testCounter = new Counter('test_counter')
let newsTrend =  new Trend('news_trend')
let homeTrend =  new Trend('home_trend')
export default function(){
    const res = http.get('https://test.k6.io/');
    const res1 = http.get('https://test.k6.io/news.php');
    testCounter.add(1)
    homeTrend.add(res.timings.duration)
    newsTrend.add(res1.timings.duration)
    sleep(1)
    check(res, {
        'true is true' : (res) => res.status === 200
    })
}