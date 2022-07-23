using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace AssignmentTest.Models.db
{
    public partial class ASSIGNMENTContext : DbContext
    {
        public ASSIGNMENTContext()
        {
        }

        public ASSIGNMENTContext(DbContextOptions<ASSIGNMENTContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TbFinalcailHighlight> TbFinalcailHighlights { get; set; }
        public virtual DbSet<TbMasStatus> TbMasStatuses { get; set; }  

        

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=MSI\\SQLEXPRESS02;Database=ASSIGNMENT;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<TbFinalcailHighlight>(entity =>
            {
                entity.ToTable("TB_FINALCAIL_HIGHLIGHTS");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.CreateDate)
                    .HasColumnType("datetime")
                    .HasColumnName("CREATE_DATE");

                entity.Property(e => e.StatusId).HasColumnName("STATUS_ID");

                entity.Property(e => e.TotalAsset).HasColumnName("TOTAL_ASSET");

                entity.Property(e => e.TotalEquities).HasColumnName("TOTAL_EQUITIES");

                entity.Property(e => e.TotalLiabilities).HasColumnName("TOTAL_LIABILITIES");

                entity.Property(e => e.UpdateDate)
                    .HasColumnType("datetime")
                    .HasColumnName("UPDATE_DATE");

                entity.Property(e => e.Years).HasColumnName("YEARS");
            });

            modelBuilder.Entity<TbMasStatus>(entity =>
            {
                entity.ToTable("TB_MAS_STATUS");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.StatusId).HasColumnName("STATUS_ID");

                entity.Property(e => e.StatusTitle)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("STATUS_TITLE");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
