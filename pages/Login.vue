
<template>
  <div class="login">
    <div class="ivu-row-flex ivu-row-flex-middle ivu-row-flex-center">
      <div class="ivu-col ivu-col-span-24">
        <div>
          <div class="dev-sign-main ivu-card ivu-card-dis-hover ivu-card-shadow">
            <!---->
            <!---->
            <div class="ivu-card-body">
              <form autocomplete="off" class="ivu-form ivu-form-label-top">
                <div class="ivu-form-item ivu-form-item-required">
                  <label class="ivu-form-item-label">电子邮箱</label>
                  <div class="ivu-form-item-content">
                    <div class="ivu-input-wrapper ivu-input-wrapper-large ivu-input-type">
                      <!---->
                      <!---->
                      <i
                        class="ivu-icon ivu-icon-ios-loading ivu-load-loop ivu-input-icon ivu-input-icon-validate"
                      ></i>
                      <input
                        autocomplete="off"
                        spellcheck="false"
                        type="text"
                        placeholder
                        class="ivu-input ivu-input-large ivu-input-with-prefix"
                        v-model="mailval"
                      />
                      <span class="ivu-input-prefix">
                        <i class="ivu-icon ivu-icon-ios-mail-outline"></i>
                      </span>
                    </div>
                    <div class="ivu-form-item-error-tip" v-show="!mailval">请填写邮箱</div>
                  </div>
                </div>
                <div class="ivu-form-item ivu-form-item-required">
                  <label class="ivu-form-item-label">密码</label>
                  <div class="ivu-form-item-content">
                    <div class="ivu-input-wrapper ivu-input-wrapper-large ivu-input-type">
                      <!---->
                      <i class="ivu-icon ivu-icon-ios-eye ivu-input-icon ivu-input-icon-normal" @click="lookpsw"></i>
                      <!---->
                      <input
                        autocomplete="off"
                        spellcheck="false"
                        :type="istype"
                        placeholder
                        class="ivu-input ivu-input-large ivu-input-with-prefix"
                        v-model="pswval"
                      />
                      <span class="ivu-input-prefix" >
                        <i class="ivu-icon ivu-icon-ios-lock-outline" ></i>
                      </span>
                    </div>
                    <div class="ivu-form-item-error-tip" v-show="!pswval">请填写密码</div>
                  </div>
                </div>
              </form>
              <div id="vaptcha_container">
                <div
                  class="vp-basic-btn vp-dark-btn vp-default-btn vp-waves"
                  style="background-color: rgb(45, 140, 240);"
                >
                  <div class="vp-btn-bg"></div>
                  <div class="vp-basic-cont">
                    <div class="vp-shield vp-vertical">
                      <span class="vp-vertical-cont">
                        <i class="vp-circle-i"></i>
                        <!--hover 圆缩放-->
                        <span class="vp-circle-h"></span>
                      </span>
                      <div class="vp-prompt vp-match">
                        <span class="vp-btn-hover-message"></span>
                        <span class="vp-prompt-triangle"></span>
                      </div>
                      <div class="vp-prompt vp-safety">
                        <span class="vp-safety-fator"></span>
                        <span class="vp-prompt-triangle"></span>
                      </div>
                    </div>
                    <a
                      class="vp-about vp-vertical"
                      href="https://www.vaptcha.com/"
                      title="了解VAPTCHA"
                      target="_blank"
                    >
                      <span class="vp-vertical-cont">
                        <i></i>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
              <div class="dev-sign-main-aside">
                <button
                  type="button"
                  class="ivu-btn ivu-btn-success ivu-btn-long ivu-btn-large"
                  @click="loginclick"
                >
                  <!---->
                  <i class="ivu-icon ivu-icon-md-log-in"></i>
                  <span>授权登录</span>
                </button>
                <div class="dev-sign-main-aside-tip">
                  <p>
                    <a href="/recover" class>忘记密码？</a>
                  </p>
                  <p>
                    尚未拥有账户？
                    <a href="/signup" class>注册</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      mailval: "",
      pswval: "",
      istype:"password"
    };
  },
  methods: {
    loginclick() {
      let accountdata = {};
      if (
        /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.mailval)
      ) {
        accountdata.mailval = this.mailval;
      } else {
        this.$Message.warning({
          top: 50,
          duration: 3,
          content: "请输入有效邮箱"
        });
        return;
      }
      if (!(this.pswval.length > 8)) {
        this.$Message.warning({
          top: 50,
          duration: 3,
          content: "请输入八位或以上密码"
        });
        return;
      }
      accountdata.pswval = this.pswval;
      if (accountdata.pswval.length > 8 && accountdata.mailval) {
        this.$axios.post("/users", accountdata).then(res => {
          if (res) {
              window.localStorage.setItem('usertoken',res);
              this.$Message.success({
                top: 50,
                duration: 3,
                content:"登录成功!!"
            });
            this.$router.replace("/list");
            
          }
        });
      }
      //   this.$Message.success({
      //     top: 50,
      //     duration: 3,
      //     content:"这是一条消息"
      //   });
    },
    lookpsw(){
        this.istype = "text";
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  width: 500px;
  height: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>