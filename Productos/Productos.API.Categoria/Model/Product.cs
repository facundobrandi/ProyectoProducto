using System;
using System.Collections.Generic;

namespace Productos.API.Model;

public partial class Product
{
    public string ProductId { get; set; } = null!;

    public decimal CategoryProductId { get; set; }

    public string ProductDescription { get; set; } = null!;

    public decimal Stock { get; set; }

    public decimal Price { get; set; }

    public bool HaveEcdiscount { get; set; }

    public bool IsActive { get; set; }

    public virtual ProductCategory CategoryProduct { get; set; } = null!;
}
