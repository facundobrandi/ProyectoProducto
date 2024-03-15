using Microsoft.AspNetCore.Mvc;
using Productos.API.Model;
using Microsoft.EntityFrameworkCore;
using Productos.Utils;
using Productos.API.Managers;
using Azure;

namespace Productos.API.Categoria.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoriaController : ControllerBase
    {
        private ProductosContext _dbContext;
        private CategoryManager CategoryManager;
        public CategoriaController(ProductosContext dbContext)
        {
            _dbContext = dbContext;
            CategoryManager = new CategoryManager(dbContext);

        }
        public class CategoryDTO 
        {
            public string CategoryDescription { get; set; }  
            public bool IsActive { get; set; }
        }


        [HttpPost("CreateCategoria")]
        public async Task<IActionResult> CreateCategoria(CategoryDTO categoryDTO)
        {
            try
            {
                var Responce = await CategoryManager.CreateCategoria(categoryDTO.CategoryDescription, categoryDTO.IsActive);

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

        public class EditCategoryDTO
        {
            public string CategoryDescription { get; set; }
            public bool IsActive { get; set; }
            public int idCategoria { get; set; }
        }

        [HttpPost("EditCategoria")]
        public async Task<IActionResult> EditCategoria(EditCategoryDTO editCategory)
        {
            try
            {
                var Responce = await CategoryManager.EditCategoria(editCategory.idCategoria, editCategory.CategoryDescription, editCategory.IsActive);

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

        [HttpGet("DeleteCategoria")]
        public async Task<IActionResult> DeleteCategoria(int idCategoria)
        {
            try
            {
                var Responce = await CategoryManager.DeleteCategoria(idCategoria);

                if (Responce.code.Equals((int)SystemEnums.ResponseCode.ERROR))
                {
                    return NotFound(Responce);
                }

                await this._dbContext.SaveChangesAsync();

                return Ok(Responce);
            }
            catch (Exception)
            {
                var Responce = new Utils.Response((int)SystemEnums.ResponseCode.ERROR,"Exception Error");
                return NotFound(Responce);
            }
        }

        [HttpGet("GetCategoria")]
        public async Task<IActionResult> GetCategoria()
        {
            try
            {
                var Responce = await CategoryManager.GetCategoria();
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

        [HttpGet("GetCategoriaById")]
        public async Task<IActionResult> GetCategoriaById(int idCategoria)
        {
            try
            {
                var Responce = await CategoryManager.GetCategoriaById(idCategoria);
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