<!-- <template>
  <div @click="ondelete"></div>
</template> -->
<script setup>
//props можна викликати без .. виклику у import { defineProps } from "vue"
defineProps({
  listInfo: {
    type: Object,
    required: () => ({})
  }
})

// виклик emit
const emit = defineEmits(['onDelete'])
function deleteOn(params) {
  emit('onDelete', params)
}
</script>
