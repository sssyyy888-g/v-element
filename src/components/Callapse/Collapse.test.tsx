import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Callapse from './Callapse.vue'
import CallapseItem from './CallapseItem.vue'

describe('Callapse.vue', () => {
  test('basic collapse', async () => {
    const wrapper = mount(Callapse, {
      props: {
        modelValue: ['item1']
      },
      slots: {
        default: (
          <>
            <CallapseItem title="标题1" name="item1">
              内容1
            </CallapseItem>
            <CallapseItem title="标题2" name="item2">
              内容2
            </CallapseItem>
          </>
        ),
      },
      global: {
        stubs: {
          Icon: true,
          Transition: { template: '<div v-if="!$attrs.leave"><slot /></div>' } // 禁用动画
        }
      },
      attachTo: document.body
    })

    await wrapper.vm.$nextTick() // 等待渲染

    const headers = wrapper.findAll('.vk-collapse-item__header')
    const contents = wrapper.findAll('.vk-collapse-item__content') // 现在可以直接查询

    console.log('Headers:', headers.length)
    console.log('Contents:', contents.length)

    expect(headers.length).toBe(2)
    expect(contents.length).toBe(2)

    //文本
    const headerText = headers[0]
    expect(headerText.text()).toBe('标题1')

    //内容
    const contentText = contents[0]
    expect(contentText.isVisible()).toBe(true)
    expect(contentText.text()).toBe('内容1')
    //点击
    await headers[0].trigger('click')
    console.log(headerText.html());
    expect(wrapper.emitted()).toHaveProperty('change')
    const changeEvent = wrapper.emitted('change') as any[]
     expect(changeEvent[0]).toEqual([[]])
    
    expect(contentText.isVisible()).toBe(false)

  })
})