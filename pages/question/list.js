const app = getApp();

import service from "../../service/service";
import {
    ListQuestion
} from "../../service/api";

Page({
    data: {
        list: [],
        size: 10,
        page: 0
    },
    onLoad: function () {
        this.list();
    },
    onShow: function (e) {
        console.log("dddddddddddd");
        this.clearList();
        this.onLoad();
    },
    post: function () {
        // 跳转至提问页面
        wx.navigateTo({
            url: 'post'
        });
    },
    clearList: function () {
        this.setData({
            page: 0,
            list: []
        });
    },
    onReachBottom: function () {
        //当页面滑动到底部，加载下一页
        this.list();
    },
    onPullDownRefresh: function () {
        // 下拉刷新动作
        console.log("下拉刷新动作");
        this.clearList();
        this.list();
        wx.stopPullDownRefresh();
    },
    list: function () {
        const page = this.data.page;
        const size = this.data.size;
        wx.showLoading({
            title: '加载中', //提示的内容,
            mask: true, //显示透明蒙层，防止触摸穿透,
            success: res => {}
        });
        service({
            ...ListQuestion,
            data: {
                page: page,
                size: size
            }
        }).then(resp => {
            wx.hideLoading();
            var concat = this.data.list.concat(resp.data);
            concat.forEach((item, index) => {
                if (item.title && item.title.length > 16) {
                    item.title = item.title.substring(0, 16) + "...";
                }
            });

            this.setData({
                list: concat,
                page: page + 1
            });

            if (resp.data.length != 0) {
                wx.showToast({
                    title: '加载第' + (page + 1) + '页成功', //提示的内容,
                    icon: 'success', //图标,
                    duration: 3000, //延迟时间,
                    mask: true, //显示透明蒙层，防止触摸穿透,
                    success: res => {}
                });
            } else {
                wx.showToast({
                    title: '我是有底线的', //提示的内容,
                    icon: 'none', //图标,
                    duration: 3000, //延迟时间,
                    mask: true, //显示透明蒙层，防止触摸穿透,
                    success: res => {}
                });
            }
        }).catch(error => {
            console.log("请求列表失败", error);
        });
    }
})