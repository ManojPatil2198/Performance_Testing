import http from 'k6/http'
import { check, group } from 'k6'

export const options = {
    thresholds:{
        'checks':['rate>0.90']
    }
}
export default function(){

    group('home_page', function(){
        let res = http.get('https://test.k6.io')
        check(res, {
            'home_page_status': (a)=> a.status === 200
        })

        group('home_page_assets', function(){
            http.get('https://test.k6.io/static/css/site.css')
            http.get('https://test.k6.io/static/js/prisms.js')
        })
    })

    group('news_page', function(){
        http.get('https://test.k6.io/news.php');
    })

}