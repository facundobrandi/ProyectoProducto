using Microsoft.AspNetCore.Mvc;
using Productos.API.Model;
using Productos.API.Managers;
using Productos.Utils;

namespace Productos.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductoController : Controller
    {
        private ProductosContext _dbContext;
        private ProductoManager _manager;
        public ProductoController(ProductosContext dbContext)
        {
            _dbContext = dbContext;
            _manager = new ProductoManager(dbContext);
        }

        public class CreateProdcutDTO 
        {
            public string ProductId { get; set; }
            public decimal CategoryId { get; set; }
            public string Description { get; set; }
            public decimal stock { get; set; }
            public decimal price { get; set; }
            public bool Discount { get; set; }
            public bool isActive { get; set; }
        }


        [HttpPost("CreateProduct")]
        public async Task<IActionResult> CreateProduct(CreateProdcutDTO createProdcut) 
        {
            try
            {
                var Responce = await _manager.CreateProduct(createProdcut.ProductId, createProdcut.CategoryId, createProdcut.Description
                    , createProdcut.stock, createProdcut.price, createProdcut.Discount, createProdcut.isActive);

                if (Responce.code.Equals((int)SystemEnums.ResponseCode.ERROR))
                {
                    return NotFound(Responce.message);
                }

                await this._dbContext.SaveChangesAsync();

                return Ok(Responce);
            }
            catch (Exception)
            {
                var Responce = new Utils.Response((int)SystemEnums.ResponseCode.ERROR, "Exception Error");
                return NotFound(Responce);
            }
        }

        [HttpPost("EditProduct")]
        public async Task<IActionResult> EditProduct(CreateProdcutDTO createProdcut)
        {
            try
            {
                var Responce = await _manager.EditProduct(createProdcut.ProductId, createProdcut.CategoryId, createProdcut.Description
                    , createProdcut.stock, createProdcut.price, createProdcut.Discount, createProdcut.isActive);

                if (Responce.code.Equals((int)SystemEnums.ResponseCode.ERROR))
                {
                    return NotFound(Responce);
                }

                await this._dbContext.SaveChangesAsync();

                return Ok(Responce);
            }
            catch (Exception)
            {
                var Responce = new Utils.Response((int)SystemEnums.ResponseCode.ERROR, "Exception Error");
                return NotFound(Responce);
            }
        }

        [HttpGet("DeleteProduct")]
        public async Task<IActionResult> DeleteProduct(string ProductId)
        {
            try
            {
                var Responce = await _manager.DeleteProduct(ProductId);

                if (Responce.code.Equals((int)SystemEnums.ResponseCode.ERROR))
                {
                    return NotFound(Responce.message);
                }

                await this._dbContext.SaveChangesAsync();

                return Ok(Responce);
            }
            catch (Exception)
            {
                var Responce = new Utils.Response((int)SystemEnums.ResponseCode.ERROR, "Exception Error");
                return NotFound(Responce);
            }
        }


        [HttpGet("GetProductById")]
        public async Task<IActionResult> GetProductById(string ProductId)
        {
            try
            {
                var Responce = await _manager.GetProductById(ProductId);

                if (Responce.code.Equals((int)SystemEnums.ResponseCode.ERROR))
                {
                    return NotFound(Responce.message);
                }

                return Ok(Responce);
            }
            catch (Exception)
            {
                var Responce = new Utils.Response((int)SystemEnums.ResponseCode.ERROR, "Exception Error");
                return NotFound(Responce);
            }
        }


        [HttpGet("GetProduct")]
        public async Task<IActionResult> GetProduct()
        {
            try
            {
                var Responce = await _manager.GetProduct();

                if (Responce.code.Equals((int)SystemEnums.ResponseCode.ERROR))
                {
                    return NotFound(Responce);
                }

                return Ok(Responce);
            }
            catch (Exception)
            {
                var Responce = new Utils.Response((int)SystemEnums.ResponseCode.ERROR, "Exception Error");
                return NotFound(Responce);
            }
        }




    }
}
