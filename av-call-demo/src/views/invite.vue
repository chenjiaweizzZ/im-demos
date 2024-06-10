<template>
  <div class="invite">
    <div class="btnGroup">
      <!-- <img src="@/assets/left.png" alt=""> -->
      <comp-device-select
        deviceType="camera"
        @change="handleValueChange($event, 'cameraId')"
      ></comp-device-select>
      <img src="@/assets/call.png" alt="" @click="call" />
      <!-- <img src="@/assets/right.png" alt=""> -->
      <comp-device-select
        deviceType="microphone"
        @change="handleValueChange($event, 'microphoneId')"
      ></comp-device-select>
    </div>
    <comp-room
      type="invite"
      :sdkAppId="Number(sdkAppId)"
      :inviteUserSig="userSig"
      :userId="userId"
      :roomId="Number(roomId)"
      ref="compR00m"
    ></comp-room>
  </div>
</template>

<script>
import CompRoom from "@/components/comp-room.vue";
import { getUrlParam, clearUrlParam } from "@/utils/utils.js";
import compDeviceSelect from "@/components/comp-device-select.vue";
export default {
  name: "inviteApp",
  components: {
    CompRoom,
    compDeviceSelect,
  },
  data() {
    return {
      sdkAppId: 0,
      userSig: "",
      userId: "",
      roomId: 0,
      cameraId: "",
      microphoneId: "",
    };
  },
  mounted() {
    this.sdkAppId = Number(getUrlParam("sdkAppId"));
    this.userSig = getUrlParam("userSig");
    this.userId = getUrlParam("userId");
    this.roomId = Number(getUrlParam("roomId"));
    // clearUrlParam();
  },
  methods: {
    handleValueChange(value, key) {
      this[key] = value;
    },
    call() {
      this.$refs.compR00m.handleJoinRoom();
    },
  },
};
</script>

<style scoped lang="scss">
.invite {
  .btnGroup {
    position: fixed;
    bottom: 1vw;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-around;
    img {
      height: 20vw;
      width: 20vw;
    }
  }
}
</style>