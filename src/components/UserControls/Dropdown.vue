<template>
    <component 
    :is="tag"
    class="dropdown"
    :class="{show:isOpen}"
    @click="toggleDropdown" 
    v-click-outside="closeDropdown"> 
        <a 
        class="dropdown-toggle btn-rotate"
        :class="titleClasses"
        data-toggle="dropdown" >
            <slot name="dropdown">
                <i :class="icon"></i>
                <span class="notification"> {{ title }} 
                    <b class="caret"></b>
                </span>
            </slot>
        </a>
    <ul class="dropdown-menu" :class="{show:isOpen}">
      <slot name="options"></slot>
    </ul>
    </component>
</template>

<script>
export default {
    data() {
        return {
            isOpen: false
        }
    },
    props: {
        tag: {
            type: String,
            default: 'li'
        },
        title: String,
        icon: String,
        titleClasses: [String, Object, Array],
    },
    methods: {
        toggleDropdown() {
            this.isOpen = !this.isOpen;
        },
        closeDropdown(){
            this.isOpen = false;
        }
    }
}
</script>