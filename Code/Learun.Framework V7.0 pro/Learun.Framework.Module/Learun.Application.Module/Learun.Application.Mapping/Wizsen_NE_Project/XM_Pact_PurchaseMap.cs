﻿using Wizsen_XM_EnergyProject.Wizsen_NE_Project;
using System.Data.Entity.ModelConfiguration;

namespace  Learun.Application.Mapping
{
    /// <summary>
    /// 版 本 Learun-ADMS V7.0.0 力软敏捷开发框架
    /// Copyright (c) 2013-2018 上海力软信息技术有限公司
    /// 创 建：超级管理员
    /// 日 期：2019-01-14 17:13
    /// 描 述：采购设备合同
    /// </summary>
    public class XM_Pact_PurchaseMap : EntityTypeConfiguration<XM_Pact_PurchaseEntity>
    {
        public XM_Pact_PurchaseMap()
        {
            #region 表、主键
            //表
            this.ToTable("XM_PACT_PURCHASE");
            //主键
            this.HasKey(t => t.Id);
            #endregion

            #region 配置关系
            #endregion
        }
    }
}

