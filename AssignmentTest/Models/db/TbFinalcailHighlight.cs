using System;
using System.Collections.Generic;

#nullable disable

namespace AssignmentTest.Models.db
{
    public partial class TbFinalcailHighlight
    {
        public int Id { get; set; }
        public short? Years { get; set; }
        public decimal? TotalAsset { get; set; }
        public decimal? TotalLiabilities { get; set; }
        public decimal? TotalEquities { get; set; }
        public int? StatusId { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }
    }
}
