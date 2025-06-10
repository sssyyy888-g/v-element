<template>
    <div class="vk-tooltip" v-on="outerEvent" ref="popperContainerNode">
        <div class="vk-tooltip__trigger" ref="triggerNode" v-on="events">
            <slot></slot>
        </div>
        <div v-if="isOpen" class="vk-tooltip__popper" ref="popperNode">
            <slot name="content">{{ content }}</slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { TooltipProps, TooltipEmits, TooltipInstance } from './type'
import { ref, watch, onMounted, nextTick ,computed} from 'vue'
import type { Instance } from '@popperjs/core'
import { createPopper, placements } from '@popperjs/core'
import useClickOutside from '../../hooks/useClickOutside'

const props = withDefaults(defineProps<TooltipProps>(), {
    placement: 'top',
    content: '',
    trigger: 'hover'
})

const emit = defineEmits<TooltipEmits>()

const isOpen = ref(false)
const popperNode = ref<HTMLElement | null>(null)
const triggerNode = ref<HTMLElement | null>(null)
const popperContainerNode = ref<HTMLElement | null>(null)
let popperInstance: Instance | null = null

// 使用响应式引用包装事件对象
const events = ref<Record<string, Function>>({})
const outerEvent = ref<Record<string, Function>>({})

const popperOptions=computed(()=>{
    return {
        placements: placements,
        ...props.popperOptions
    }
})
function toggleIsOpen() {
    isOpen.value = !isOpen.value
    emit('visible-change', isOpen.value)
}

function open() {
    if (!props.manual) {
        isOpen.value = true
        emit('visible-change', isOpen.value)
    }
}

function close() {
    if (!props.manual) {
        isOpen.value = false
        emit('visible-change', isOpen.value)
    }
}

useClickOutside(popperContainerNode, () => {
    if (props.trigger === 'click' && isOpen.value && !props.manual) {
        close()
    }
})

function updateEvents() {
    // 完全重置事件
    events.value = {}
    outerEvent.value = {}

    if (props.manual) return

    if (props.trigger === 'hover') {
        events.value = { mouseenter: open }
        outerEvent.value = { mouseleave: close }
    } else if (props.trigger === 'click') {
        events.value = { click: toggleIsOpen }
    }
}

// 初始化事件
onMounted(() => {
    updateEvents()
})

// 监听 manual 变化
watch(() => props.manual, () => {
    updateEvents()
    // 如果是手动模式，强制关闭 tooltip
    if (props.manual && isOpen.value) {
        isOpen.value = false
    }
})

// 监听 trigger 变化
watch(() => props.trigger, (newVal, oldVal) => {
    if (newVal !== oldVal) {
        updateEvents()
    }
})

watch(isOpen, (newValue) => {
    if (newValue) {
        if (popperNode.value && triggerNode.value) {
            popperInstance = createPopper(triggerNode.value, popperNode.value, popperOptions.value)
        }
    } else {
        popperInstance?.destroy()
        popperInstance = null
    }
}, { flush: 'post', immediate: true })

defineExpose<TooltipInstance>({
    show: () => {
        isOpen.value = true
        emit('visible-change', true)
    },
    hide: () => {
        isOpen.value = false
        emit('visible-change', false)
    }
})
</script>