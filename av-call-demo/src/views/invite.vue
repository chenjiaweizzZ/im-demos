<template>
    <div class="invite">
        <comp-room
        type="invite"
        :sdkAppId="Number(sdkAppId)"
        :inviteUserSig="userSig"
        :userId="userId"
        :roomId="Number(roomId)"></comp-room>
    </div>
</template>

<script>
import CompRoom from '@/components/comp-room.vue';
import { getUrlParam, clearUrlParam } from '@/utils/utils.js';
export default {
    name: "inviteApp",
    components: {
    CompRoom,
  },
    data() {
        return {
            sdkAppId: 0,
            userSig: '',
            userId: '',
            roomId: 0,
        }
    },
    mounted() {
        this.sdkAppId = Number(getUrlParam('sdkAppId'));
        this.userSig = getUrlParam('userSig');
        this.userId = getUrlParam('userId');
        this.roomId = Number(getUrlParam('roomId'));
        // clearUrlParam();
  },
}

</script>