<template>
  <!-- <header>
    <h1 ref="triggerNode">Hello Vite!</h1>
    <h2 ref="overlayNode">Vite + Vue 3 + TypeScript</h2>
  </header> -->
  <header>
    <Tooltip content="this is a tooltip" placement="bottom" :trigger="trigger" :manual="true" ref="tooltipRef">
      <h1>rrrrrr</h1>
    </Tooltip>
  </header>
  <Icon icon="fa-solid fa-user-secret" ></Icon>
  <Icon icon="arrow-up" size="2xl" type="primary"></Icon>
  <Button ref="buttonRef" type="primary" plain disabled>Test</Button>
  <a href="">click me!!</a>
  <Button plain @click="open">plain button</Button>
  <Button round @click="close">round button</Button>
  <Button circle @click="Click">vk</Button>
  <Button type="success">success button</Button>
  <Button disabled>disabled button</Button>
  <Button type="warning">warning button</Button>
  <Button type="warning" plain>warning button</Button>
  <Button type="danger" plain>danger button</Button>
  <Button type="info" plain>info button</Button>
  <Button size="small">small</Button>
  <Button size="large">large</Button>
  <Button size="large" loading>loading</Button>
  <Button size="large" icon="arrow-up">arrow up</Button>
  <Collapse v-model="openedValue">
    <CollapseItem title="标题一" name="1">
      <template #header>
        <h1>nice title1</h1>
      </template>
      <div>this is content a aaa</div>
    </CollapseItem>
    <CollapseItem title="标题二" name="2">
      <template #header>
        <h1>nice title2</h1>
      </template>
      <div>this is content a aaa</div>
    </CollapseItem>
    <CollapseItem title="标题三" name="3">
    <template #header>
      <h1>nice title3</h1>
    </template>
    <div>this is content a aaa</div>
    </CollapseItem>
  </Collapse>
</template>
 
<script setup lang="ts">
import Button from './components/Button/Button.vue'
import Collapse from './components/Callapse/Callapse.vue'
import CollapseItem from './components/Callapse/CallapseItem.vue'
import Icon from './components/Icon/Icon.vue'
import Tooltip from './components/Tooltip/Tooltip.vue'
import {createPopper, hide, Instance} from '@popperjs/core'
import { ref,onMounted } from 'vue'
import type {ButtonInstance} from './components/Button/type'
import type { TooltipInstance } from './components/Tooltip/type'
const buttonRef=ref<ButtonInstance|null>(null)
const tooltipRef=ref<TooltipInstance|null>(null)
const overlayNode=ref<HTMLElement|null>(null)
const triggerNode=ref<HTMLElement|null>(null)
let popperInstance:Instance|null=null
let trigger=ref<any>('click')
const open=()=>{
  tooltipRef.value?.show()
}
const close=()=>{
  tooltipRef.value?.hide()
}
onMounted(()=>{
    if(buttonRef.value){
        console.log(buttonRef.value.ref);
        
    }
    if(overlayNode.value &&triggerNode.value){
      popperInstance=createPopper(triggerNode.value,overlayNode.value,{
        placement:'top'
      })
    }
    setTimeout(()=>{
      trigger.value='hover'
    },3000)
    

})
setTimeout(()=>{
  popperInstance?.setOptions({
    placement:'bottom'
  })
},2000)
const Click=()=>{
    console.log('click');
    
}
const openedValue=ref(['1'])
</script>

<style>

</style>