
import {h,defineComponent,ref} from 'vue'
const vnode=h('div',{ id:'foo'},'Hello World!')
export default defineComponent({
  name: 'VNode',
  props:{
    msg:{
        type:String,
        required:true
    }
  },
  setup(props){
    const count=ref(1)
    return ()=>{
        return (
          <div>
            <h1>{props.msg}</h1>
            <p>{count.value}</p>
          </div>
        )
    }
  }
})

