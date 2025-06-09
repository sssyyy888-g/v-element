<template>
  <div 
  class="vk-collapse-item"
  :class="{
    'is-disabled': disabled,

  }"
  >
  <div 
  class="vk-collapse-item__header" 
  :class="{
   'is-active': isActive,
   'is-disabled': disabled,
  }"
  :id="`item-header-${name}`"
   @click="handleHeaderClick"
   
   >
    <slot name="header">{{ title ||'默认标题' }}</slot>
    <Icon icon="angle-right" class="header-angle"></Icon>
  </div>
  <Transition name="fade"
      @before-enter="transitionEvents.beforeEnter"
      @enter="transitionEvents.enter"
      @after-enter="transitionEvents.afterEnter"
      @before-leave="transitionEvents.beforeLeave"
      @leave="transitionEvents.leave"
      @after-leave="transitionEvents.afterLeave"
  >
  <div class="vk-collapse-item__wrapper"  v-show="isActive">
     <div class="vk-collapse-item__content" :id="`item-content-${name}`">
    <slot></slot>
  </div>
  </div>  
 
  </Transition>

  </div>
</template>

<script setup lang="ts">
import {inject,ref,computed} from 'vue'
import type {CollapseItemProps} from './types'
import Icon from '../Icon/Icon.vue'
const props=defineProps<CollapseItemProps>()
defineOptions({
    name:'VKCollapseItem'
})

const {activeNames,handleItemClick}=inject<any>('activeNames')
const isActive=computed(()=>activeNames.value.includes(props.name))
const handleHeaderClick=()=>{
    if(props.disabled) return
    handleItemClick(props.name)
}
const transitionEvents={
    beforeEnter(el:HTMLElement){
        el.style.height='0'
        el.style.overflow='hidden'
    },
    enter(el:HTMLElement){
        el.style.height=`${el.scrollHeight}px`
    },
    afterEnter(el:HTMLElement){
        el.style.height=''
        el.style.overflow=''
    },
    beforeLeave(el:HTMLElement){
        el.style.height=`${el.scrollHeight}px`
        el.style.overflow='hidden'
    },
    leave(el:HTMLElement){
        el.style.height='0'
    },
    afterLeave(el:HTMLElement){
        el.style.height=''
        el.style.overflow=''
    }

}
</script>

<style>

</style>