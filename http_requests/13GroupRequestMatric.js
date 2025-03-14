import http from 'k6/http'
import { check, group } from 'k6'

export const options = {
    thresholds:{
        'checks':['rate>0.90'],
        'http_req_duration':['p(90)<1500'],
        'http_req_duration{expected_response:true}':['p(90)<500'],
    }
}
export default function(){
    // This code is to show difference in http_req_duration and expected_response:true
    // Below mocky enpoint returns 200 status
    group('home_page', function(){
        let res = http.get('https://run.mocky.io/v3/b56cc1e7-4c4c-4fad-bba7-b339d58b2f05?mocky-delay=1000ms')
        check(res, {
            'home_page_status': (a)=> a.status === 200
        })

        group('home_page_assets', function(){
            http.get('https://run.mocky.io/v3/b56cc1e7-4c4c-4fad-bba7-b339d58b2f05?mocky-delay=1000ms')
            http.get('https://run.mocky.io/v3/b56cc1e7-4c4c-4fad-bba7-b339d58b2f05?mocky-delay=1000ms')
        })
    })

    // Below mocky enpoint returns 500 status
    group('news_page', function(){
        http.get('https://run.mocky.io/v3/04050fc0-1ebd-4ae9-b9f1-d08d5736cc6d');
    })

}