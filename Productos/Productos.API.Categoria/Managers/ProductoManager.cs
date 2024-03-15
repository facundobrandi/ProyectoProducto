using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Productos.API.Model;
using Productos.Utils;

namespace Productos.API.Managers
{
    public class ProductoManager
    {
        private ProductosContext _dbContext;

        public ProductoManager(ProductosContext productosContext)
        {
            _dbContext = productosContext;
        }

        public async Task<Response> DeleteProduct(string ProductId) 
        {
            var Product = await this._dbContext.Products.Where(i => i.ProductId == ProductId).FirstOrDefaultAsync();

            if (Product == null)
            {
                return new Response((int)SystemEnums.ResponseCode.ERROR, "Product does not Exist");
            }

            this._dbContext.Products.Remove(Product);

            return new Response((int)SystemEnums.ResponseCode.OK, "Producto Eliminado");
        }

        public async Task<Response> EditProduct(string ProductId, decimal CategoryId, string Description, decimal stock, decimal price
            , bool Discount, bool isActive)
        {
            var Category = await this._dbContext.ProductCategories.Where(i => i.CategoryProductId == CategoryId).FirstOrDefaultAsync();

            if (Category == null)
            {
                return new Response((int)SystemEnums.ResponseCode.ERROR, "Categoria No Existe");
            }

            var Validation = ValidateProduct(Description, stock, price, ProductId);

            if (Validation.code.Equals((int)SystemEnums.ResponseCode.ERROR))
            {
                return Validation;
            }

            var Product = await this._dbContext.Products.Where(i => i.ProductId == ProductId).FirstOrDefaultAsync();

            if (Product == null)
            {
                return new Response((int)SystemEnums.ResponseCode.ERROR, "Product does not Exist");
            }

            Product.ProductId = ProductId;
            Product.CategoryProductId = CategoryId;
            Product.Price = price;
            Product.Stock = stock;
            Product.IsActive = isActive;
            Product.HaveEcdiscount = Discount;
            Product.ProductDescription = Description;


            return new Response((int)SystemEnums.ResponseCode.OK, "Producto Editado");
        }

        public async Task<Utils.Response> CreateProduct(string ProductId, decimal CategoryId, string Description, decimal stock, decimal price
            , bool Discount, bool isActive)
        {

            var Category = await this._dbContext.ProductCategories.Where(i=>i.CategoryProductId == CategoryId).FirstOrDefaultAsync();

            if (Category == null)
            {
                return new Response((int)SystemEnums.ResponseCode.ERROR, "Categoria No Existe");
            }

            var Product = await this._dbContext.Products.Where(i=>i.ProductId == ProductId).FirstOrDefaultAsync();

            if (Product != null)
            {
                return new Response((int)SystemEnums.ResponseCode.ERROR, "Product already Exist");
            }

            var Validation = ValidateProduct(Description, stock, price,ProductId);

            if (Validation.code.Equals((int)SystemEnums.ResponseCode.ERROR))
            {
                return Validation;
            }

            var NewProduct = new Product();

            NewProduct.ProductId = ProductId;
            NewProduct.CategoryProductId = CategoryId;
            NewProduct.Price = price;
            NewProduct.Stock = stock;
            NewProduct.IsActive = isActive;
            NewProduct.HaveEcdiscount = Discount;
            NewProduct.ProductDescription = Description;


            await this._dbContext.Products.AddAsync(NewProduct);

            return new Response((int)SystemEnums.ResponseCode.OK, "Producto Creado");
        }

        public async Task<Response> GetProductById(string ProductId)
        {
            var Product = await this._dbContext.Products.Where(i => i.ProductId == ProductId).FirstOrDefaultAsync();

            if (Product == null)
            {
                return new Response((int)SystemEnums.ResponseCode.ERROR, "Product does not Exist");
            }

            return new Response((int)SystemEnums.ResponseCode.OK, "Product",Product);
        }

        public async Task<Response> GetProduct()
        {

            var Products = await this._dbContext.Products.Include(i=>i.CategoryProduct).Select(i => new
            {
                Id = i.ProductId,
                description = i.ProductDescription,
                stock = i.Stock,
                price = i.Price,
                Discount = i.HaveEcdiscount,
                isActive = i.IsActive,
                Category = i.CategoryProduct.CategoryDescription
            }).ToListAsync();

            if (Products.Count == 0)
            {
                return new Response((int)SystemEnums.ResponseCode.ERROR, "Products is empty");
            }


            return new Response((int)SystemEnums.ResponseCode.OK, "Product list", Products);
        }

        public Response ValidateProduct(string Description, decimal stock, decimal price , string ProductId) 
        {
            if (string.IsNullOrEmpty(Description))
            {
                return new Response((int)SystemEnums.ResponseCode.ERROR, "Description es nulo");
            }

            if (ProductId.Length >= 30 )
            {
                return new Response((int)SystemEnums.ResponseCode.ERROR, "ProductoId Es muy largo");
            }

            if (stock <= 0)
            {
                return new Response((int)SystemEnums.ResponseCode.ERROR, "Stock no puede ser igual o menor a 0");
            }

            if (price <= 0)
            {
                return new Response((int)SystemEnums.ResponseCode.ERROR, "Price no puede ser igual o menor a 0");
            }

            return new Response((int)SystemEnums.ResponseCode.OK, "");
        }

    }
}
