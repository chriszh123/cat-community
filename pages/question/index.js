//index.js
//获取应用实例
import config from "../../config"

Page({
    // 保存当前页面的数据，用于存储和传递数据到 view 层
    data: {},
    onLoad: function (query) {
        // 登录接口，获取到 code 存到 data 里面，用于获取到code传递给服务器端
        wx.login({
            success: codeInfo => {
                console.log("codeInfo.code = " + codeInfo.code);
                this.setData({
                    code: codeInfo.code
                });
            },
            fail: () => {},
            complete: () => {}
        });
    },
    // 绑定wxml的button，用户获取用户信息
    getUserInfo: function (userInfo) {
        // 展示登录中加载提示
        wx.showLoading({
            title: '登录中...', //提示的内容,
            mask: true, //显示透明蒙层，防止触摸穿透,
            success: res => {}
        });
        console.log(userInfo);
        // 调用服务端 API
        wx.request({
            url: config.serverHost + '/api/login', //开发者服务器接口地址",
            data: JSON.stringify({
                code: this.data.code,
                rawData: userInfo.detail.rawData,
                signature: userInfo.detail.signature
            }), //请求的参数",
            method: 'post',
            dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
            success: res => {
                wx.hideLoading();
                console.log(res);
                if (res.data.status == 200) {
                    // 展示 登录成功 提示框
                    wx.showToast({
                        title: '登录成功', //提示的内容,
                        icon: 'success', //图标,
                        duration: 2000, //延迟时间,
                        mask: true, //显示透明蒙层，防止触摸穿透,
                        success: res => {}
                    });
                    // 把自定义登录状态 token 缓存到小程序端
                    wx.setStorage({
                        key: 'token',
                        value: res.data.data.token
                    });
                } else {
                    // 展示 错误信息
                    wx.showToast({
                        title: res.data.message, //提示的内容,
                        icon: 'none', //图标,
                        duration: 2000, //延迟时间,
                        mask: true, //显示透明蒙层，防止触摸穿透,
                        success: res => {}
                    });
                }
            },
            fail: res => {
                console.log(res);
                wx.showToast({
                    title: '登录失败，请重试', //提示的内容,
                    duration: 2000, //延迟时间,
                    mask: true, //显示透明蒙层，防止触摸穿透,
                    success: res => {}
                });
            },
            complete: () => {}
        });
    }
});