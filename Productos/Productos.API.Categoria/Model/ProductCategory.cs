using System;
using System.Collections.Generic;

namespace Productos.API.Model;

public partial class ProductCategory
{
    public decimal CategoryProductId { get; set; }

    public string CategoryDescription { get; set; } = null!;

    public bool IsActive { get; set; }

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
