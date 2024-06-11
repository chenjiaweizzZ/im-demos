<template>
  <div id="app">
    <img src="./assets/logo.png" />
    <HelloWorld />
  </div>
</template>

<script src="./trtc.js"></script>
<script src="./tim-js.js"></script>
<script src="./tsignaling-js.js"></script>
<script src="./tuicall-engine-webrtc.js"></script>
<script>
import HelloWorld from "./components/HelloWorld";
export default {
  name: "App",
  components: {
    HelloWorld,
  },
  mounted() {
    const { TUICallEngine, TUICallEvent, TUICallType } =
      window["tuicall-engine-webrtc"];
    console.log(TUICallEngine, TUICallEvent, TUICallType);
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
