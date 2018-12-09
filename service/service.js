//获取应用实例
const app = getApp();

const service = options => {
    // 在当前页面显示导航条
    wx.showNavigationBarLoading();

    options = {
        dataType: "json",
        ...options,
        method: options.method ? options.method.toUpperCase() : "GET",
        header: {
            "token": wx.getStorageSync('token') || ""
        }
    };

    const result = new Promise(function (resolve, reject) {
        //做一些异步操作
        const optionsData = {
            success: res => {
                console.log("optionsData,res:" + JSON.stringify(res));
                wx.hideNavigationBarLoading();
                if (res.data.status == 1005) {
                    wx.showModal({
                        title: '请登陆', //提示的标题,
                        content: '您还未登陆，请授权请登陆', //提示的内容,
                        showCancel: true, //是否显示取消按钮,
                        cancelText: '取消1', //取消按钮的文字，默认为取消，最多 4 个字符,
                        cancelColor: '#000000', //取消按钮的文字颜色,
                        confirmText: '确定1', //确定按钮的文字，默认为取消，最多 4 个字符,
                        confirmColor: '#3CC51F', //确定按钮的文字颜色,
                        success: res => {
                            app.reLogin();
                            wx.redirectTo({
                                url: '/pages/index'
                            });
                        }
                    });
                }
                resolve(res.data);
            },
            fail: error => {
                wx.hideNavigationBarLoading();
                reject(error);
            },
            ...options
        };

        let token = wx.getStorageSync('token') || "";
        console.log("token:" + token);
        console.log("optionsData:" + JSON.stringify(optionsData));
        if (!token) {
            if (optionsData.url.indexOf('api/login') == -1) {
                wx.showModal({
                    title: '请登陆', //提示的标题,
                    content: '您还未登录，登陆', //提示的内容,
                    showCancel: true, //是否显示取消按钮,
                    cancelText: '取消2', //取消按钮的文字，默认为取消，最多 4 个字符,
                    cancelColor: '#000000', //取消按钮的文字颜色,
                    confirmText: '确定2', //确定按钮的文字，默认为取消，最多 4 个字符,
                    confirmColor: '#3CC51F', //确定按钮的文字颜色,
                    success: res => {
                        app.reLogin();
                        wx.redirectTo({
                            url: '/index',
                        });
                    }
                });
                reject(error);
                return;
            }
        }
        wx.request(optionsData);
    });

    return result;
};

export default service;