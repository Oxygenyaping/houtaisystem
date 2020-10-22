<template>
  <div class="login_container">
    <div class="left">
      <div class="header">
        <img src="@/assets/login-logo.png" alt="" />
        <span class="t1">黑马面面</span>
        <span class="liner">|</span>
        <span class="t2">用户登录</span>
      </div>
      <div class="mian">
        <el-form :model="Login_form" ref="Login_form" :rules="rules">
          <el-form-item prop="phone">
            <el-input placeholder="请输入手机号" v-model="Login_form.phone"
             prefix-icon="el-icon-user">
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="请输入密码" v-model="Login_form.password"
              prefix-icon="el-icon-lock" show-password>
            </el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-row>
              <el-col :span="16"
                ><el-input placeholder="请输入验证码" v-model="Login_form.code"
                  prefix-icon="el-icon-key"></el-input
              ></el-col>
              <el-col :span="7" :offset='1'
                ><img :src="loginCode" alt="" class="code" @click="getCode"
              /></el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="isCheck">
            <el-checkbox v-model="Login_form.isCheck"></el-checkbox>
           <span> 我已经阅读且同意
            <el-link type="primary" :underline="false">用户协议</el-link>
            和
             <el-link type="primary" :underline="false">隐私条款</el-link></span>
          </el-form-item>
          <el-form-item>
           <el-button type="primary" style="width:100%" @click="login">登 录</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width:100%">注 册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <img src="@/assets/login-right.png" alt="" class="right" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginCode:`${process.env.VUE_APP_URL}/captcha?type=login`,
    
      Login_form: {
        phone: "18511111111",
        password: "12345678",
        code: "",
        isCheck:false,
      },
      rules: {
        phone: [
          {
            required: true,
            message: "请输入正确的手机号码",
            trigger: "change",
          },
          {validator:(rule,value,callback)=>{
            let _reg=/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
            if(!_reg.test(value)){
              return callback(new Error('手机号码格式错误'))
            }
            callback()
          },
          trigger:'change'
          }
        ],
        password: [
          { required: true, message: "请输入正确的密码", trigger: "change" },
          { min: 3, max: 10, message: "长度在3-10个字符", trigger: "change" },
        ],
        code: [
          { required: true, message: "请输入正确的验证码", trigger: "change" },
          { min:4, max:4, message: "长度为4个字符", trigger: "change" },
        ],
        isCheck:[{required: true, message: "请勾选xxxx", trigger: "change"}
          ,{validator:(rule,value,callback)=>{
            value?callback():callback(new Error('请勾选')) 
          },trigger:'change'}
        ]
      },
    };
  },
  methods: {
    login() {
      this.$refs.Login_form.validate( async result =>{
        if(!result) {
          return  this.$message.error('验证失败')
        }
          let res= await this.$http.post('/login',this.Login_form)
          console.log(res);
          if(res.data.code!=200){
           return  this.$message.error('登录失败')
          }
          this.$router.push('/Layout')
      })
    },
    getCode(){
      this.loginCode=`${process.env.VUE_APP_URL}/captcha?type=login&t=${new Date()}`
    },
  },
};
</script>

<style lang="less">
.login_container {
  height: 100%;
  background: linear-gradient(to right, #1493fa, #01c6fa);
  display: flex;
  align-items: center;
  justify-content: space-around;

  .left {
    padding: 40px;
    height: 483px;
    width: 400px;
    background-color: #f5f5f5;
  }
  .code{
    width: 100%;
    height: 40px;
  }
}
</style>