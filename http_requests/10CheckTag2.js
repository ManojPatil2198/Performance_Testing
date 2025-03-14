import http from 'k6/http'
import { check } from 'k6'

export const options = {
    thresholds:{
        'checks{page:"home"}':['rate>0.90']
    }
}
export default function(){
    let res = http.get('https://test.k6.io', {tags:{page:'home'}});
    let res1 = http.get('https://test.k6.io/news.php');
    
    // check(res, {
    //     'Status is correct' : (res) => res.status === 200,
    // }, {page:'home'})

    // check(res, {
    //     'Page contains expected text' : (res) => res.body.includes("Collection of simple web-pages suitable for load testing.") === true
    // })

    // check({"test":{"status":200}}, {
    //     'Status is correct' : (a) => a.status === 200,
    // }, {page:'home'})

}