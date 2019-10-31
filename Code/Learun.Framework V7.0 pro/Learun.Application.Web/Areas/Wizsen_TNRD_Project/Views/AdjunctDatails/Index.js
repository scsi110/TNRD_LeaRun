﻿/* * 版 本 Learun-ADMS V7.0.0 力软敏捷开发框架(http://www.learun.cn)
 * Copyright (c) 2013-2018 上海力软信息技术有限公司
 * 创建人：超级管理员
 * 日  期：2019-02-23 16:25
 * 描  述：附件信息
 */
var selectedRow;
var refreshGirdData;
var bootstrap = function ($, learun) {
    "use strict";
    var startTime;
    var endTime;
    var ProjectName;
    var page = {
        init: function () {
            page.initTree();
            page.initGird();
            page.bind();
        },
        bind: function () {
            // 时间搜索框 
            $('#datesearch').lrdate({
                dfdata: [
                    //{ name: '今天', begin: function () { return learun.getDate('yyyy-MM-dd 00:00:00') }, end: function () { return learun.getDate('yyyy-MM-dd 23:59:59') } },
                    { name: '近1年', begin: function () { return learun.getDate('yyyy-MM-dd 00:00:00', 'y', -1) }, end: function () { return learun.getDate('yyyy-MM-dd 23:59:59') } },
                    { name: '近3年', begin: function () { return learun.getDate('yyyy-MM-dd 00:00:00', 'y', -3) }, end: function () { return learun.getDate('yyyy-MM-dd 23:59:59') } },
                    { name: '近10年', begin: function () { return learun.getDate('yyyy-MM-dd 00:00:00', 'y', -10) }, end: function () { return learun.getDate('yyyy-MM-dd 23:59:59') } }
                ],
                // 月 
                mShow: false,
                premShow: false,
                // 季度 
                jShow: false,
                prejShow: false,
                // 年 
                ysShow: false,
                yxShow: false,
                preyShow: true,
                yShow: true,
                // 默认 
                dfvalue: '0',
                selectfn: function (begin, end) {
                    startTime = begin;
                    endTime = end;
                    //page.search();
                }
            });

            // 查询
            $('#btn_Search').on('click', function () {
                ProjectName = $('#ProjectName').val();
                page.search();
            });
            // 刷新
            $('#lr_refresh').on('click', function () {
                location.reload();
            });
            // 新增
            $('#lr_add').on('click', function () {
                selectedRow = null;
                learun.layerForm({
                    id: 'Adjunct',
                    title: '新增',
                    url: top.$.rootUrl + '/Wizsen_TNRD_Project/AdjunctDatails/Form',
                    width: 700,
                    height: 400,
                    btn: ['确认', '关闭'],
                    callBack: function (id) {
                        return top[id].acceptClick(refreshGirdData);
                    }
                });
            });
            // 编辑
            $('#lr_edit').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('Id');
                selectedRow = $('#gridtable').jfGridGet('rowdata');
                if (learun.checkrow(keyValue)) {
                    learun.layerForm({
                        id: 'form',
                        title: '编辑',
                        url: top.$.rootUrl + '/Wizsen_TNRD_Project/AdjunctDatails/Form?keyValue=' + keyValue,
                        width: 700,
                        height: 400,
                        callBack: function (id) {
                            return top[id].acceptClick(refreshGirdData);
                        }
                    });
                }
            });
            // 删除
            $('#lr_delete').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('Id');
                if (learun.checkrow(keyValue)) {
                    learun.layerConfirm('是否确认删除该项！', function (res) {
                        if (res) {
                            learun.deleteForm(top.$.rootUrl + '/Wizsen_TNRD_Project/AdjunctDatails/DeleteForm', { keyValue: keyValue }, function () {
                                refreshGirdData();
                            });
                        }
                    });
                }
            });
        },
        //树形图
        initTree: function () {
            $('#tree').lrtree({
                url: top.$.rootUrl + '/Wizsen_TNRD_Project/ProjectDatails/GetProjectTree',
                nodeClick: function (item) {
                    if (!item.hasChildren) {
                        ProjectName = item.text;
                    } 
                    page.search();
                }
            });
        },
        initGird: function () {
            $('#gridtable').jfGrid({
                url: top.$.rootUrl + '/Wizsen_TNRD_Project/AdjunctDatails/GetProjectList',
                headData: [
                        { label: '项目名称', name: 'Name', width: 300, align: "left" },
                        { label: '附件流程节点', name: 'Process', width: 200, align: "left" },
                        {
                            label: '时间节点', name: 'Time', width: 200, align: "left", formatter: function (value, row, index) {
                                return $(this).formatterDate(value);
                            }
                        },
                        { label: '附件名称', name: 'AdjunctName', width: 200, align: "left" ,
                        formatter: function (value, row, index) {
                                if (row.AdjunctName != "" && row.AdjunctName != null) {
                                    return '<a id="FJ" style="color:blue;"  target="_blank" href="' + row.Url + '">' + row.AdjunctName + '</a>';
                                } else {
                                    return "";
                                }
                            }
                        },
                        { label: '附件类型', name: 'AdjunctType', width: 200, align: "left" },
                        //{ label: '附件路径', name: 'Url', width: 200, align: "left" },
                        {
                            label: '上传时间', name: 'UploadTime', width: 200, align: "left", formatter: function (value, row, index) {
                                return $(this).formatterDate(value);
                            }
                        },
                        //{ label: '文件类型', name: 'FileType', width: 200, align: "left" },
                        //{ label: '创建日期', name: 'CreateDate', width: 200, align: "left" },
                        //{ label: '创建人Id', name: 'CreateUserId', width: 200, align: "left" },
                        //{ label: '创建人', name: 'CreateUserName', width: 200, align: "left" },
                        //{ label: '修改日期', name: 'UpdateDate', width: 200, align: "left" },
                        //{ label: '修改人ID', name: 'UpdateUserId', width: 200, align: "left" },
                        //{ label: '修改人', name: 'UpdateUserName', width: 200, align: "left" },
                ],
                mainId:'Id',
                isPage: true
            });
            page.search();
        },
        search: function (param) {
            param = param || {};
            param.StartTime = startTime;
            param.EndTime = endTime;
            param.ProjectName = ProjectName;
            $('#gridtable').jfGridSet('reload', { queryJson: JSON.stringify(param) });
        }
    };
    refreshGirdData = function () {
        page.search();
    };
    page.init();
}
