﻿/*
 * 版 本 Learun-ADMS V7.0.0 力软敏捷开发框架(http://www.learun.cn)
 * Copyright (c) 2013-2018 上海力软信息技术有限公司
 * 创建人：力软-前端开发组
 * 日 期：2017.04.18
 * 描 述：新增表单	
 */

var keyValue = request('keyValue');
var Code = request('Code');
var Name = request('Name');

var bootstrap = function ($, learun) {
    "use strict";
    // 保存数据
    var acceptClick = function (type) {// 0保存并新增 1保存
        if (!$('.lr-layout-wrap').lrValidform()) {
            return false;
        }
        var formData = $('.lr-layout-wrap').lrGetFormData(keyValue);
        var productData = [];
        var productDataTmp = $('#productgird').jfGridGet('rowdatas');

        for (var i = 0, l = productDataTmp.length; i < l; i++) {
            if (!!productDataTmp[i]['F_ProductName']) {
                productData.push(productDataTmp[i]);
            }
        }

        var postData = {
            crmOrderJson: JSON.stringify(formData),
            crmOrderProductJson: JSON.stringify(productData)
        };

        learun.layerConfirm('注：您确认要保存此操作吗？', function (res, index) {
            if (res) {
                $.lrSaveForm(top.$.rootUrl + '/LR_CRMModule/CrmOrder/SaveForm?keyValue=' + keyValue, postData, function (res) {
                    if (res.code == 200) {
                        if (type == 0) {
                            window.location.href = top.$.rootUrl + '/LR_CRMModule/CrmOrder/Form';
                        }
                        else {
                            learun.frameTab.close('order_add');
                        }
                    }
                });
                top.layer.close(index); //再执行关闭  
            }
        });
    };

    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            // 优化滚动条
            $('.lr-layout-wrap').lrscroll();

            // 合同附件
            //$('#F_ContractFile').lrUploader();


            // 订单产品信息
            $('#productgird').jfGrid({
                url: top.$.rootUrl + '/Wizsen_TNRD_Project/AdjunctDatails/GetList',
                headData: [
                    //{ label: 'Id', name: 'Id', width: 200, align: "left" },
                    //{ label: 'BindId', name: 'BindId', width: 200, align: "left" },
                    { label: '附件流程节点', name: 'Process', width: 200, align: "left" },
                    //{ label: '关联编号', name: 'OrderNo', width: 200, align: "left" },
                    {
                        label: '附件名称', name: 'AdjunctName', width: 200, align: "left",
                        formatter: function (value, row, index) {
                            if (row.AdjunctName != "" && row.AdjunctName != null) {
                                return '<a id="FJ" style="color:blue;"  target="_blank" href="' + row.Url + '">' + row.AdjunctName + '</a>';
                            } else {
                                return "";
                            }
                        }
                    },
                    { label: '附件名称', name: 'AdjunctType', width: 200, align: "left" },
                    { label: '附件路径', name: 'Url', width: 200, align: "left" },
                    { label: '上传时间', name: 'UploadTime', width: 200, align: "left" },
                    //{ label: '上传时间', name: 'FileType', width: 200, align: "left" },
                    //{ label: '创建日期', name: 'CreateDate', width: 200, align: "left" },
                    //{ label: '创建人Id', name: 'CreateUserId', width: 200, align: "left" },
                    //{ label: '创建人', name: 'CreateUserName', width: 200, align: "left" },
                    //{ label: '修改日期', name: 'UpdateDate', width: 200, align: "left" },
                    //{ label: '修改人Id', name: 'UpdateUserId', width: 200, align: "left" },
                    //{ label: '修改人', name: 'UpdateUserName', width: 200, align: "left" },
                ],
                //isEdit: true,
                height: 280
                //isPage: true
                //isMultiselect:true
            });
            var param = { keyword: keyValue } || {};
            $('#productgird').jfGridSet('reload', { queryJson: JSON.stringify(param) });


            // 订单产品信息
            $('#productgird2').jfGrid({
                url: top.$.rootUrl + '/Wizsen_TNRD_Project/Wizsen_TNRD_Pact/GetPageList',
                width: $(window).height() - 800,
                headData: [
                    { label: "合同状态", name: "contractStatus", width: 100, align: "left" },
                    { label: "合同类型", name: "contractType", width: 100, align: "left" },
                    { label: "合同编码", name: "Code", width: 100, align: "left" },
                    { label: "合同名称", name: "Name", width: 300, align: "left" },
                    { label: "乙方公司", name: "supplier", width: 200, align: "left" },
                    //{ label: "部门", name: "department", width: 100, align: "left" },
                    //{ label: "人员", name: "employee", width: 100, align: "left" },
                    //{ label: "币种", name: "currency", width: 100, align: "left" },
                    { label: "合同金额(元)", name: "Amount", width: 100, align: "left" },
                    { label: "已付款金额(元)", name: "paySumAmount", width: 100, align: "left" },
                    { label: "未付款金额(元)", name: "overAmount", width: 100, align: "left" },
                    {
                        label: "付款比例（%）", name: "Ratio", width: 120, align: "left",
                        formatter: function (value, row, index) {
                            return (row.paySumAmount / row.Amount * 100).toFixed(2) + "%";
                        }
                    },
                    {
                        label: "签订日期", name: "SignDate", width: 100, align: "left", formatter: function (value, row, index) {
                            return $(this).formatterDate(value);
                        }
                    },
                    //{ label: "计划终止日期", name: "abortDate", width: 100, align: "left" },
                ],
                height: 280,
                isPage: true
            });

            var param2 = { ProjectNo: Code } || {};
            $('#productgird2').jfGridSet('reload', { queryJson: JSON.stringify(param2) });

            // 订单产品信息
            //$('#productgird3').jfGrid({
            //    url: top.$.rootUrl + '/Wizsen_TNRD_Project/ProjectCapital/GetPageList',
            //    headData: [
            //        //{ label: '项目编码', name: 'Code', width: 200, align: "left" },
            //        //{ label: '项目名称', name: 'Name', width: 200, align: "left" },
            //        { label: '下达年份', name: 'IssuedYear', width: 200, align: "left" },
            //        { label: '局下达日期', name: 'BureauDate', width: 200, align: "left" },
            //        { label: '局下达文号', name: 'BureauTitanict', width: 200, align: "left" },
            //        { label: '局已下达资金计划', name: 'BureauFunds', width: 200, align: "left" },
            //        { label: '财政下达日期', name: 'FiscalDate', width: 200, align: "left" },
            //        { label: '财政下达文号', name: 'FiscalTitanict', width: 200, align: "left" },
            //        { label: '财政已下达资金', name: 'FiscalFunds', width: 200, align: "left" },
            //        { label: '是否完工', name: 'IsComplete', width: 200, align: "left" },
            //    ],
            //    height: 280,
            //    isPage: true
            //});

            //var param3 = { Code: Code } || {};
            //$('#productgird3').jfGridSet('reload', { queryJson: JSON.stringify(param3) });

            // 订单产品信息
            //$('#productgird4').jfGrid({
            //    url: top.$.rootUrl + '/Wizsen_NE_Project/ProjectDatails/GetAssSum',
            //    headData: [
            //        { label: '项目名称', name: 'ProjectName', width: 200, align: "left" },
            //        { label: '已付金额', name: 'paidAmount', width: 200, align: "left" },
            //        { label: '未付金额', name: 'unpaidAmount', width: 200, align: "left" },
            //        { label: '合同总金额', name: 'Amount', width: 200, align: "left" },
            //    ],
            //    height: 290
            //});
            //var param4 = { keyword: Code } || {};
            //$('#productgird4').jfGridSet('reload', { keyValue: JSON.stringify(param4) });

            // 关闭
            $('#lr_close').on('click', function () {
                //acceptClick(1);
                learun.frameTab.close(learun.frameTab.iframeId);
            });
        },
        initData: function () {
            if (!!keyValue) {
                $.lrSetForm(top.$.rootUrl + '/Wizsen_TNRD_Project/ProjectDatails/GetFormData?keyValue=' + keyValue, function (data) {//
                    //$('.lr-layout-wrap').formInitialize(data);
                    //$('#productgird').jfGridSet('refreshdata', data.orderProductData);
                    $('#form').lrSetFormData(data)
                    $("#Date").val(learun.formatDate(data.Date, 'yyyy-MM'));
                    $("#ApprovalTime").val(learun.formatDate(data.Date, 'yyyy-MM'));
                });
            }
        }
    };
    
    page.init();
}