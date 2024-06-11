<template>
  <div id="app">
    <TUIKit :SDKAppID="0" userID="xxx" userSig="xxx" />
    <TUICallKit
      class="callkit-container"
      :allowedMinimized="true"
      :allowedFullScreen="false"
    />
  </div>
</template>
<script lang="ts" setup>
import { TUIKit } from "./TUIKit";
import { TUICallKit } from "@tencentcloud/call-uikit-vue2.6";
</script>
<style lang="scss">
</style>
