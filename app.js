//app.js
App({
    globalData: {},
    onLaunch: function (e) {
        this.login();
    },
    login: function () {
        let token = wx.getStorageSync("token") || "";
        console.log("app-token:" + token);
        this.globalData.token = token;
        // 登录接口，获取到 code 存到 data 里面，用于获取到code传递给服务器端
        if (!token) {
            wx.login({
                success: codeInfo => {
                    console.log("app->login:" + codeInfo);
                    this.globalData.code = codeInfo.code;
                }
            });
        } else {
            // 如果已经登录了，直接跳转到主页
            wx.switchTab({
                url: 'pages/question/list'
            });
        }
    },
    reLogin: function () {
        try {
            wx.removeStorageSync("token");
            this.login();
        } catch (e) {
            console.log("app->reLogin:", e);
        }
    }
});