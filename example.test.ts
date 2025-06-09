import {expect,test,describe,vi,Mocked} from 'vitest'
import { testFn , request} from './utils'
import axios from 'axios'
vi.mock('axios')
const mockedAxios=axios as Mocked<typeof axios>
// test('test common matcher',()=>{
//     const name='viking'
//     expect(name).toBe('viking')
//     expect(2+2).toBe(4)
//     expect([1,2,3]).toContain(2)
// })
// test('test to be true or false',()=>{
//     expect(1).toBeTruthy()
//     expect(0).toBeFalsy()
//     expect('').toBeFalsy()
//     expect(' ').toBeTruthy()
// })
// test('test number',()=>{
//     expect(10).toBeGreaterThan(5)
//     expect(5).toBeLessThan(10)
//     expect(5).toBeLessThanOrEqual(5)
// })
// test('test object',()=>{
//     expect({name:'viking',age:18}).toEqual({name:'viking',age:18})
// })
describe('functions',()=>{
    test('create a mock function',()=>{
        const callback=vi.fn()
        testFn(11,callback)
        expect(callback).toHaveBeenCalled()
        expect(callback).toHaveBeenCalledWith(11)
    })
    test('spy on method',()=>{
        const obj={
            getname:()=>{
                return 'viking'
            }
        }
        const spy=vi.spyOn(obj,'getname')
        obj.getname()
        expect(spy).toHaveBeenCalled()
        obj.getname()
        expect(spy).toHaveBeenCalledTimes(2)

    })
    test('mock third party module',async ()=>{
        mockedAxios.get.mockImplementation(()=>{
            return Promise.resolve({
              
                    data:'12222'
                
            })
        })
        mockedAxios.get.mockResolvedValue({data:'12222'})
        const res=await request()
        expect(res).toBe('12222')
    })
})