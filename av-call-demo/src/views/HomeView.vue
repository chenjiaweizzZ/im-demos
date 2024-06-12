<template>
  <div class="home">
    <!-- <div>
      <div>sdkAppId: {{ sdkAppId }}</div>
      <div>secretKey: {{ secretKey }}</div>
      <div>userId: {{ userId }}</div>
      <div>roomId: {{ roomId }}</div>
      <div>cameraId: {{ cameraId }}</div>
      <div>microphoneId: {{ microphoneId }}</div>
      <div>inviteLink: {{ inviteLink }}</div>
    </div> -->
    <!-- <div>
      <el-button type="primary" @click="start">开启视频</el-button>
      <el-button @click="test()">invite</el-button>
    </div> -->
    <!-- 本地流区域 -->
    <!-- <div v-if="localStream" class="local-stream-container">
        <div id="localStream" class="local-stream-content"></div>
        <div v-if="isPlayingLocalStream" class="local-stream-control">
          <div class="video-control control">
            <span v-if="!isMutedVideo" @click="muteVideo">
              <svg-icon icon-name="video" class="icon-class"></svg-icon>
            </span>
            <span v-if="isMutedVideo"  @click="unmuteVideo">
              <svg-icon icon-name="video-muted" class="icon-class"></svg-icon>
            </span>
          </div>
          <div class="audio-control control">
            <span v-if="!isMutedAudio" @click="muteAudio">
              <svg-icon icon-name="audio" class="icon-class"></svg-icon>
            </span>
            <span v-if="isMutedAudio" @click="unmuteAudio">
              <svg-icon icon-name="audio-muted" class="icon-class"></svg-icon>
            </span>
          </div>
        </div>
      </div> -->
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
    <!-- <div class="param-container" :class="$isMobile && 'param-container-mobile'"></div> -->
    <comp-room
      :sdkAppId="Number(sdkAppId)"
      :secretKey="secretKey"
      :userId="userId"
      :roomId="Number(roomId)"
      :cameraId="cameraId"
      :microphoneId="microphoneId"
      ref="compR00m"
    >
    </comp-room>
  </div>
</template>

<script>
import LibGenerateTestUserSig from "@/utils/lib-generate-test-usersig.min.js";
import rtc from "@/components/mixins/rtc.js";
import shareRtc from "@/components/mixins/share-rtc.js";
import compRoom from "@/components/comp-room.vue";
import compDeviceSelect from "@/components/comp-device-select.vue";
import { TUICallKit, TUICallKitServer, STATUS, TUIGlobal } from "@tencentcloud/call-uikit-vue2.6";
export default {
  name: "HomeView",
  mixins: [rtc, shareRtc],
  components: {
    compRoom,
    compDeviceSelect,
  },
  data() {
    return {
      sdkAppId: 1600019404,
      secretKey:
        "1cb3c908d79f57996af69f7315544f7864decd8d9c383e283eb5127d3c6ca6f1",
      userId: "user1",
      roomId: 12138,
      userSig: "",
      inviteLink: "",
      cameraId: "",
      microphoneId: "",
    };
  },
  methods: {
    handleValueChange(value, key) {
      this[key] = value;
    },
    async start() {
      const userSigGenerator = new LibGenerateTestUserSig(
        this.sdkAppId,
        this.secretKey,
        604800
      );
      this.userSig = userSigGenerator.genTestUserSig(this.userId);
      await this.initClient();
      await this.join();
      await this.initLocalStream();
      await this.playLocalStream();
      await this.publish();
      this.generateInviteLink();
    },
    addSuccessLog(log) {
      // if (!this.isHostMode) {
      //   return;
      // }
      // this.logList.push({
      //   type: 'success',
      //   log,
      // });
      // const { scrollHeight } = this.$refs.logContainer;
      // this.$refs.logContainer.scrollTop = scrollHeight;
      console.log("addSuccessLog", log);
    },
    addFailedLog(log) {
      // if (!this.isHostMode) {
      //   return;
      // }
      // this.logList.push({
      //   type: 'failed',
      //   log,
      // });
      // const { scrollHeight } = this.$refs.logContainer;
      // this.$refs.logContainer.scrollTop = scrollHeight;
      console.log("addFailLog", log);
    },
    reportSuccessEvent(name) {
      this.$aegis.reportEvent({
        name,
        ext1: `${name}-success`,
        ext2: "webrtcQuickDemoVue2",
        ext3: this.sdkAppId,
      });
    },
    generateInviteLink() {
      const { sdkAppId, secretKey, roomId } = this;
      const inviteUserId = `user_${parseInt(Math.random() * 100000000, 10)}`;
      const userSigGenerator = new LibGenerateTestUserSig(
        sdkAppId,
        secretKey,
        604800
      );
      const inviteUserSig = userSigGenerator.genTestUserSig(inviteUserId);
      this.inviteLink = encodeURI(
        `${location.origin}${location.pathname}invite?sdkAppId=${sdkAppId}&userSig=${inviteUserSig}&roomId=${roomId}&userId=${inviteUserId}`
      );
    },
    call() {
      this.$refs.compR00m.handleJoinRoom();
    },
    test() {
      this.$router.push("/invite");
    },
  },
};
</script>

<style scoped lang="scss">
.home {
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
