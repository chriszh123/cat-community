const app = getApp();
import service from "../../service/service";
import {
    Question
} from "../../service/api"

Page({
    data: {
        userInfo: {},
        subjectList: [],
        pageSize: 10,
        pageOffset: 0
    },
    onLoad: function () {},
    post: function (e) {
        console.log("question->submit");
        console.log("question->post:" + JSON.stringify(e.detail.value));
        if (!e.detail.value.title) {
            wx.showToast({
                title: '请输入标题', //提示的内容,
                icon: 'success', //图标,
                duration: 2000, //延迟时间,
                mask: true, //显示透明蒙层，防止触摸穿透,
                success: res => {}
            });
            return;
        }
        if (!e.detail.value.content) {
            wx.showToast({
                title: '请输入内容',
            });
            return;
        }
        // 调用服务端 API
        wx.showLoading({
            title: '提交中', //提示的内容,
            mask: true, //显示透明蒙层，防止触摸穿透,
            success: res => {}
        });

        service({
            ...Question,
            data: {
                title: e.detail.value.title,
                content: e.detail.value.content
            }
        }).then(response => {
            wx.hideLoading();
            console.log("Question:" + JSON.stringify(response));
            if (response.status == 200) {
                // 展示 发布成功 提示框
                wx.showToast({
                    title: '发布成功', //提示的内容,
                    icon: 'success', //图标,
                    duration: 5000, //延迟时间,
                    mask: true, //显示透明蒙层，防止触摸穿透,
                    success: res => {
                        // 跳转到列表页
                        wx.switchTab({
                            url: 'list'
                        });
                    }
                });
            } else {
                // 展示 错误信息
                wx.showToast({
                    title: response.message, //提示的内容,
                    icon: 'none', //图标,
                    duration: 2000, //延迟时间,
                    mask: true, //显示透明蒙层，防止触摸穿透,
                    success: res => {}
                });
            }
        }).catch(error => {
            console.log(error);
            wx.showToast({
                title: '提交失败', //提示的内容,
                icon: 'none', //图标,
                duration: 2000, //延迟时间,
                mask: true, //显示透明蒙层，防止触摸穿透,
                success: res => {}
            });
        });
    }
});