﻿using Wizsen_TNRD_EnergyProject.Wizsen_TNRD_Project;
using System.Data.Entity.ModelConfiguration;

namespace  Learun.Application.Mapping
{
    /// <summary>
    /// 版 本 Learun-ADMS V7.0.0 力软敏捷开发框架
    /// Copyright (c) 2013-2018 上海力软信息技术有限公司
    /// 创 建：超级管理员
    /// 日 期：2019-02-23 16:25
    /// 描 述：附件信息
    /// </summary>
    public class TNRD_Adjunct_DatailsMap : EntityTypeConfiguration<TNRD_Adjunct_DatailsEntity>
    {
        public TNRD_Adjunct_DatailsMap()
        {
            #region 表、主键
            //表
            this.ToTable("TNRD_ADJUNCT_DATAILS");
            //主键
            this.HasKey(t => t.Id);
            #endregion

            #region 配置关系
            #endregion
        }
    }
}

