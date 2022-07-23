using System;
using System.Collections.Generic;

#nullable disable

namespace AssignmentTest.Models.db
{
    public partial class TbMasStatus
    {
        public int Id { get; set; }
        public int? StatusId { get; set; }
        public string StatusTitle { get; set; }
    }
}
