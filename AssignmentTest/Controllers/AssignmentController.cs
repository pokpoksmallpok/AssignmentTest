using AssignmentTest.Models.db;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq; 
using System.Threading.Tasks;

namespace AssignmentTest.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class AssignmentController : Controller
    {
        private readonly ASSIGNMENTContext _context = new ASSIGNMENTContext();

        [Route("load")]
        [HttpGet]
        public model_data load()
        {
            var ChartSet = new model_data();
            var labelSet = new List<string> { };
            var dataChart = new List<dataChart> { };
            var totalAsset = new List<int> { };
            var totalLibilties = new List<int> { };
            var totalEquities = new List<int> { };
            //------------------------------------//

            var cnn = _context.Database.GetDbConnection();
            var cmm = cnn.CreateCommand();
            cmm.CommandType = System.Data.CommandType.StoredProcedure;
            cmm.CommandText = "[dbo].[SP_GET_LIST_FINALCAIL_HIGHLIGHTS_CHART]";
            cmm.Connection = cnn;
            cnn.Open();
            var reader =  cmm.ExecuteReader();  
            
            if (reader.HasRows)
            {
                //Loop value from store
                while (reader.Read())
                { 
                    labelSet.Add(Convert.ToString(reader["YEARS"]));
                    totalAsset.Add(Convert.ToInt32(reader["TOTAL_ASSET"]));
                    totalLibilties.Add(Convert.ToInt32(reader["TOTAL_LIABILITIES"]));
                    totalEquities.Add(Convert.ToInt32(reader["TOTAL_EQUITIES"]));
                }
                 
                for (int i = 1; i <= reader.FieldCount-1; i++) 
                {
                    var dataSubSet = new dataChart();
                    var total = new List<int> { }; 
                    dataSubSet.label = reader.GetName(i);
                    switch (dataSubSet.label)
                    {
                        case "TOTAL_ASSET" :
                            dataSubSet.data = totalAsset; 
                            break;
                        case "TOTAL_LIABILITIES":
                            dataSubSet.data = totalLibilties;
                            break;
                        case "TOTAL_EQUITIES":
                            dataSubSet.data = totalEquities;
                            break;
                    }
                    dataSubSet.label = dataSubSet.label.Replace("_", " ");
                    dataChart.Add(dataSubSet);
                }
            }
             
            ChartSet.labelTopic = labelSet;
            ChartSet.dataSet = dataChart;
            return ChartSet;
        }
         

        [Route("list")]
        [HttpPost] 
        public List<dataTableChart> list(TbFinalcailHighlight tbFinalcailHighlight)
        {
            var dataTableChartSet = new List<dataTableChart>();
            var cnn = _context.Database.GetDbConnection(); 
            var cmm = cnn.CreateCommand();
            var pStatus = cmm.CreateParameter();
            var pYear = cmm.CreateParameter(); 

            pStatus.ParameterName = "@Status"; 
            pStatus.Value = tbFinalcailHighlight.StatusId; 
            pYear.ParameterName = "@year";
            pYear.Value =  tbFinalcailHighlight.Years; 

            cmm.CommandType = System.Data.CommandType.StoredProcedure;
            cmm.CommandText = "[dbo].[SP_GET_LIST_FINALCAIL_HIGHLIGHTS]";
            cmm.Parameters.Add(pStatus);
            cmm.Parameters.Add(pYear); 
            cmm.Connection = cnn;
            cnn.Open();

            var reader = cmm.ExecuteReader();
            if (reader.HasRows)
            {
                //Loop value from store
                while (reader.Read())
                {
                    var dataTableChart = new dataTableChart();
                    dataTableChart.Id = Convert.ToInt32(reader["ID"]);
                    dataTableChart.Years = Convert.ToInt32(reader["YEARS"]) ;
                    dataTableChart.TotalAsset = Convert.ToInt32(reader["TOTAL_ASSET"]);
                    dataTableChart.TotalLiabilities = Convert.ToDecimal(reader["TOTAL_LIABILITIES"]);
                    dataTableChart.TotalEquities = Convert.ToDecimal(reader["TOTAL_EQUITIES"]);
                    dataTableChart.StatusId = Convert.ToInt32(reader["STATUS_ID"]);
                    dataTableChart.StatusName = Convert.ToString(reader["STATUS_TITLE"]);
                    dataTableChartSet.Add(dataTableChart);
                }
                 
            } 

            return dataTableChartSet; 
        }

        [Route("listStatus")]
        [HttpGet]
        public List<dataTableStaus> listStatus()
        {
            var dataTableStausSet = new List<dataTableStaus>();
            var cnn = _context.Database.GetDbConnection();
            var cmm = cnn.CreateCommand();
            cmm.CommandType = System.Data.CommandType.StoredProcedure;
            cmm.CommandText = "[dbo].[SP_GET_LIST_MAS_STATUS]";
            cmm.Connection = cnn;
            cnn.Open();
            var reader = cmm.ExecuteReader();
            if (reader.HasRows)
            {
                //Loop value from store
                while (reader.Read())
                {
                    var dataTableStaus = new dataTableStaus();
                    dataTableStaus.statusId = Convert.ToInt32(reader["STATUS_ID"]);
                    dataTableStaus.statusName = Convert.ToString(reader["STATUS_TITLE"]);
                    dataTableStausSet.Add(dataTableStaus);
                } 
            } 
            return dataTableStausSet;
        }
         
        [Route("add")]
        [HttpPost]
        public model_data add(TbFinalcailHighlight tbFinalcailHighlight)
        {
            var model_set = new model_data(); 
            try
            {
                if (tbFinalcailHighlight.Id != 0)
                { 
                    tbFinalcailHighlight.UpdateDate = DateTime.Now;
                    _context.Update(tbFinalcailHighlight);
                    _context.SaveChanges(); 
                }
                else
                {
                    tbFinalcailHighlight.CreateDate = DateTime.Now;
                    tbFinalcailHighlight.UpdateDate = DateTime.Now;
                    _context.Add(tbFinalcailHighlight);
                    _context.SaveChanges(); 
                }

                model_set.resultCode = "SUCCESS";
                model_set.resultMsg = "Submit";
            }
            catch (InvalidCastException e)
            {
                model_set.resultCode = "FAILL";
                model_set.resultMsg = e.Message; 
            } 
            return model_set;
        }

        [Route("delete")]
        [HttpPost]
        public model_data delete(TbFinalcailHighlight tbFinalcailHighlight)
        {
            var model_set = new model_data();
            try
            {
                _context.TbFinalcailHighlights.Attach(tbFinalcailHighlight);
                _context.TbFinalcailHighlights.Remove(tbFinalcailHighlight);
                _context.SaveChanges();

                model_set.resultCode = "SUCCESS";
                model_set.resultMsg = "";
            }
            catch (InvalidCastException e)
            {
                model_set.resultCode = "FAILL";
                model_set.resultMsg = e.Message;
            } 

            return model_set;
        }

        [Route("search")]
        [HttpPost]
        public List<dataTableChart> searchData(TbFinalcailHighlight tbFinalcailHighlight)
        {
            var dataTableChartSet = new List<dataTableChart>();
            var cnn = _context.Database.GetDbConnection();
            var cmm = cnn.CreateCommand();
            cmm.CommandType = System.Data.CommandType.StoredProcedure;
            cmm.CommandText = "[dbo].[SP_GET_LIST_FINALCAIL_HIGHLIGHTS] @Status=" + tbFinalcailHighlight.StatusId  + "@year=" + tbFinalcailHighlight.Years;
            cmm.Connection = cnn;
            cnn.Open();
            var reader = cmm.ExecuteReader();
            if (reader.HasRows)
            {
                //Loop value from store
                while (reader.Read())
                {
                    var dataTableChart = new dataTableChart();
                    dataTableChart.Id = Convert.ToInt32(reader["ID"]);
                    dataTableChart.Years = Convert.ToInt32(reader["YEARS"]);
                    dataTableChart.TotalAsset = Convert.ToInt32(reader["TOTAL_ASSET"]);
                    dataTableChart.TotalLiabilities = Convert.ToDecimal(reader["TOTAL_LIABILITIES"]);
                    dataTableChart.TotalEquities = Convert.ToDecimal(reader["TOTAL_EQUITIES"]);
                    dataTableChart.StatusId = Convert.ToInt32(reader["STATUS_ID"]);
                    dataTableChart.StatusName = Convert.ToString(reader["STATUS_TITLE"]);
                    dataTableChartSet.Add(dataTableChart);
                }

            }

            return dataTableChartSet;
        }

    }
     
}
