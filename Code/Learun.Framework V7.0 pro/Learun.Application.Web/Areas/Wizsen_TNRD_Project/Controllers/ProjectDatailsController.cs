﻿using Wizsen_TNRD_EnergyProject.Wizsen_TNRD_Project;
using Learun.Util;
using System.Data;
using System.Web.Mvc;

namespace Learun.Application.Web.Areas.Wizsen_TNRD_Project.Controllers
{
    /// <summary> 
    /// 版 本 Learun-ADMS V7.0.0 力软敏捷开发框架 
    /// Copyright (c) 2013-2018 上海力软信息技术有限公司 
    /// 创 建：超级管理员 
    /// 日 期：2019-02-26 17:56 
    /// 描 述：项目管理 
    /// </summary> 
    public class ProjectDatailsController : MvcControllerBase
    {
        private ProjectDatailsIBLL projectDatailsIBLL = new ProjectDatailsBLL();

        #region 视图功能 

        /// <summary> 
        /// 主页面 
        /// <summary> 
        /// <returns></returns> 
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }
        /// <summary> 
        /// 表单页 
        /// <summary> 
        /// <returns></returns> 
        [HttpGet]
        public ActionResult Form()
        {
            return View("Form");
        }
        /// <summary> 
        /// 表单页 
        /// <summary> 
        /// <returns></returns> 
        [HttpGet]
        public ActionResult Form2()
        {
            return View("Form2");
        }

        /// <summary>
        /// 查看
        /// <summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult Detail()
        {
            return View();
        }

        /// <summary>
        /// 项目收款
        /// <summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult IncomeDetails()
        {
            return View();
        }

        /// <summary>
        /// 添加附件
        /// <summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult Adjunct()
        {
            return View();
        }

        /// <summary>
        /// 添加附件
        /// <summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult AdjunctIndex()
        {
            return View();
        }
        #endregion

        #region 获取数据 

        /// <summary> 
        /// 获取列表数据 
        /// <summary> 
        /// <returns></returns> 
        [HttpGet]
        [AjaxOnly]
        public ActionResult GetList(string queryJson)
        {
            var data = projectDatailsIBLL.GetList(queryJson);
            return Success(data);
        }
        /// <summary> 
        /// 获取列表分页数据 
        /// <param name="pagination">分页参数</param> 
        /// <summary> 
        /// <returns></returns> 
        [HttpGet]
        [AjaxOnly]
        public ActionResult GetPageList(string pagination, string queryJson)
        {
            Pagination paginationobj = pagination.ToObject<Pagination>();
            var data = projectDatailsIBLL.GetPageList(paginationobj, queryJson);
            var jsonData = new
            {
                rows = data,
                total = paginationobj.total,
                page = paginationobj.page,
                records = paginationobj.records
            };
            return Success(jsonData);
        }
        /// <summary>
        /// 获取项目相关信息列表(树结构)
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [AjaxOnly]
        public ActionResult GetProjectTree()
        {
            var data = projectDatailsIBLL.GetProjectTree();
            return this.Success(data);
        }

        /// <summary> 
        /// 获取表单数据 
        /// <param name="keyValue">主键</param> 
        /// <summary> 
        /// <returns></returns> 
        [HttpGet]
        [AjaxOnly]
        public ActionResult GetFormData(string keyValue)
        {
            var data = projectDatailsIBLL.GetEntity(keyValue);
            return Success(data);
        }
        #endregion

        #region 提交数据 

        /// <summary> 
        /// 删除实体数据 
        /// <param name="keyValue">主键</param> 
        /// <summary> 
        /// <returns></returns> 
        [HttpPost]
        [AjaxOnly]
        public ActionResult DeleteForm(string keyValue)
        {
            projectDatailsIBLL.DeleteEntity(keyValue);
            return Success("删除成功！");
        }
        /// <summary> 
        /// 保存实体数据（新增、修改） 
        /// <param name="keyValue">主键</param> 
        /// <summary> 
        /// <returns></returns> 
        [HttpPost]
        [ValidateAntiForgeryToken]
        [AjaxOnly]
        public ActionResult SaveForm(string keyValue, TNRD_Project_DatailsEntity entity)
        {
            projectDatailsIBLL.SaveEntity(keyValue, entity);
            return Success("保存成功！");
        }
        #endregion

    }
}