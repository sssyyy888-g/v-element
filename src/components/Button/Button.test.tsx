import { describe,test,expect } from 'vitest'
import {mount} from '@vue/test-utils'
import Button from './Button.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


describe('Button.vue',()=>{
    test('basic button',()=>{
        const wrapper = mount(Button,{
            props:{
                type:'primary',

            },
            slots:{
                default:'test'
            }
        })
        console.log(wrapper.html());
        expect(wrapper.classes()).toContain('vk-button--primary')
        expect(wrapper.get('button').text()).toBe('test')
        //events
        wrapper.get('button').trigger('click')
        console.log(wrapper.emitted());
        expect(wrapper.emitted()).toHaveProperty('click')
    })
    test('disable',()=>{
        const wrapper=mount(Button,{
            props:{
                disabled:true,
                type:'primary'
            },slots:{
                default:'disable'
            }
        })
        expect(wrapper.attributes('disabled')).toBeDefined()
        wrapper.get('button').trigger('click')
        expect(wrapper.emitted()).not.toHaveProperty('click')
    })
    test('size',()=>{
        const wrapper=mount(Button,{
            props:{
                size:'large',
                type:'primary'
            },slots:{
                default:'large'
            }
        })
        expect(wrapper.classes()).toContain('vk-button--large')
        wrapper.get('button').trigger('click')
        expect(wrapper.emitted()).toHaveProperty('click')

    })
    test('icon',()=>{
        const wrapper=mount(Button,{
            props:{
                icon:'arrow-up',
                type:'info'
            },
            slots:{
                default:'icon'
            },
            global:{
                stubs:[
                    'FontAwesomeIcon',
                ]
            }
        })
        console.log(wrapper.html());
        const iconElement=wrapper.findComponent(FontAwesomeIcon)
        expect(iconElement.exists()).toBeTruthy()
        expect(iconElement.attributes('icon')).toBe('arrow-up')
    })
    test('loading',()=>{
        const wrapper=mount(Button,{
            props:{
                loading:true
            },
            slots:{
                default:'loading'
            }
        })
    })
})