<template>
    <div class="vk-tooltip">
        <div class="vk-tooltip__trigger" ref="triggerNode" v-on="events">
            <slot ></slot>
        </div>
        <div v-if="isOpen" class="vk-tooltip__popper" ref="popperNode">
            <slot name=content>{{content}}</slot>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type {TooltipProps, TooltipEmits} from './type'
import {ref,watch,reactive} from 'vue'
import type {Instance} from '@popperjs/core'
import {createPopper} from '@popperjs/core'
const props=withDefaults(defineProps<TooltipProps>(), {
    placement: 'top',
    content: '',
    trigger:'hover'
})
const emit=defineEmits<TooltipEmits>()
const isOpen=ref(false)
const popperNode=ref<HTMLElement|null>(null)
const triggerNode=ref<HTMLElement|null>(null)
let popperInstance: Instance|null = null
let events=reactive([])
function toggleIsOpen(){
    isOpen.value = !isOpen.value
    emit('visible-change', isOpen.value)
}
function open(){
    isOpen.value = true
    emit('visible-change', isOpen.value)
}
function close(){
    isOpen.value = false
    emit('visible-change', isOpen.value)
}
function attachEvents(){
    if(props.trigger=='hover'){
        events['mouseenter'] = open
        events['mouseleave'] = close
    }else if(props.trigger=='click'){
        events['click']=toggleIsOpen
    }
        
}
attachEvents()
watch(isOpen, (newValue) => {
   if(newValue){
    if(popperNode.value && triggerNode.value){
        popperInstance = createPopper(triggerNode.value, popperNode.value, {
            placement: props.placement
        })
    }else{
        popperInstance?.destroy()
    }
   }
},{flush:'post', immediate:true})
</script>
