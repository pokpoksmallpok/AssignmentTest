using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AssignmentTest
{
    public class model_data
    {
        public string resultMsg { get; set; }
        public string resultCode { get; set; } 
        public List<string> labelTopic { get; set; }
        public List<dataChart> dataSet { get; set; }    
    }

    public class dataChart
    {
        public string label { get; set; }
        public List<int> data { get; set; }
        public string stack { get; set; } 
    }

    public class dataTableChart
    {
        public int? Id { get; set; }
        public int? Years { get; set; }
        public decimal? TotalAsset { get; set; }
        public decimal? TotalLiabilities { get; set; }
        public decimal? TotalEquities { get; set; }
        public int? StatusId { get; set; }
        public string StatusName { get; set; }

    }

    public class dataTableStaus
    {
        public int? statusId { get; set; }
        public string statusName { get; set; } 
    }
}
