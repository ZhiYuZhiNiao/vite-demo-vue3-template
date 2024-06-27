<template>
  <div class="my-dialog-container">
    <el-button plain @click="dialogVisible = true">
      Click to open the Dialog
    </el-button>

    <el-dialog
      v-model="dialogVisible"
      title="Tips"
      width="500"
      :close-on-click-modal="false"
    >
      <span>This is a message</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, toRefs } from 'vue'
const dialog = reactive({
  dialogVisible: false
})

const { dialogVisible } = toRefs(dialog)
</script>

<style scoped>
.my-dialog-container {
  font-size: 18px;
}
</style>
