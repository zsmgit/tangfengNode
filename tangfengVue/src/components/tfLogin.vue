<template>
	<div id="loginBtn">
		<button v-on:click="login">{{msg}}</button>
	</div>
</template>

<script>
	export default{
		data () {
		    return {
		      msg: '请登录'
		    }
  		},
		methods: {
			login:function(event) {
				window.location.href ="https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect";
//				window.location.href ="https://baidu.com";	
			}
		}
	}
</script>

<style>

</style>