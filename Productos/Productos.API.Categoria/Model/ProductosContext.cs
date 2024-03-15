using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Productos.API.Model;

public partial class ProductosContext : DbContext
{
    public ProductosContext()
    {
    }

    public ProductosContext(DbContextOptions<ProductosContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<ProductCategory> ProductCategories { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.ProductId).HasName("PK_ProfilePermission");

            entity.ToTable("Product");

            entity.Property(e => e.ProductId).HasMaxLength(30);
            entity.Property(e => e.CategoryProductId).HasColumnType("numeric(5, 0)");
            entity.Property(e => e.HaveEcdiscount).HasColumnName("HaveECDiscount");
            entity.Property(e => e.Price).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.ProductDescription).HasMaxLength(200);
            entity.Property(e => e.Stock).HasColumnType("decimal(10, 0)");

            entity.HasOne(d => d.CategoryProduct).WithMany(p => p.Products)
                .HasForeignKey(d => d.CategoryProductId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Product_ProductCategory");
        });

        modelBuilder.Entity<ProductCategory>(entity =>
        {
            entity.HasKey(e => e.CategoryProductId).HasName("PK_Control");

            entity.ToTable("ProductCategory");

            entity.Property(e => e.CategoryProductId)
                .ValueGeneratedOnAdd()
                .HasColumnType("numeric(5, 0)");
            entity.Property(e => e.CategoryDescription).HasMaxLength(200);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
