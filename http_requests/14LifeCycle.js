import http from 'k6/http'
import { check } from 'k6'
import { sleep } from 'k6'

export const options = {
    vus:2,
    duration:'2s',
    thresholds: {
        'checks':['rate>0.90'],
    }
}

// let test = () => console.log("Test")
// test()
console.log(' -- init stage -- ')

export function setup(){
    console.log(' -- Setup stage -- ')
    sleep(5)
    let test = () => console.log("Test")
    test()
    const name = {fname:'VaibhaV', lname:"Arde"}
    return name;
}

export default function(data){
    console.log(' -- Default stage -- ')
    console.log(`My name is ${data.fname} ${data.lname}`)
    sleep(0.5)
}

export function teardown(){
    console.log(' -- Teardown stage -- ')
}