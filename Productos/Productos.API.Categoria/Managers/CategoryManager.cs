using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Productos.API.Model;
using Productos.Utils;

namespace Productos.API.Managers
{
    public class CategoryManager
    {
        private ProductosContext _dbContext;

        public CategoryManager(ProductosContext productosContext)
        {
            _dbContext = productosContext;
        }


        public async Task<Response> CreateCategoria(string CategoryDescription, bool IsActive)
        {
            var NewCategory = new ProductCategory();

            if (string.IsNullOrEmpty(CategoryDescription))
            {
                return new Response((int)SystemEnums.ResponseCode.ERROR, "Categoria Descripcion es nulo");
            }

            NewCategory.CategoryDescription = CategoryDescription;
            NewCategory.IsActive = IsActive;

            await this._dbContext.ProductCategories.AddAsync(NewCategory);


            return new Response((int)SystemEnums.ResponseCode.OK, "Categoria Creada");
        }

        public async Task<Response> EditCategoria(int idCategoria, string CategoryDescription, bool IsActive) 
        {
            var Category = await this._dbContext.ProductCategories.Where(i => i.CategoryProductId == idCategoria).FirstOrDefaultAsync();

            if (Category == null)
            {
                return new Response((int)SystemEnums.ResponseCode.ERROR, "Categoria no existe");
            }

            Category.IsActive = IsActive;
            Category.CategoryDescription = CategoryDescription;

            return new Response((int)SystemEnums.ResponseCode.OK, "Categoria Editada", Category);
        }

        public async Task<Response> GetCategoria()
        {
            var Categoria = await this._dbContext.ProductCategories.Select(i => new
            {
                id = i.CategoryProductId,
                Description = i.CategoryDescription, 
                IsActive = i.IsActive
            }).ToListAsync();

            if (Categoria.Count == 0)
            {
                return new Response((int)SystemEnums.ResponseCode.ERROR, "No Hay Categorias");
            }

            return new Response((int)SystemEnums.ResponseCode.OK, "Categoria Lista" , Categoria);

        }

        public async Task<Response> GetCategoriaById(int idCategoria)
        {
            var Categoria = await this._dbContext.ProductCategories.Where(i=>i.CategoryProductId == idCategoria)
                .Select(i => new
            {
                id = i.CategoryProductId,
                Description = i.CategoryDescription,
                IsActive = i.IsActive
            }).FirstOrDefaultAsync();

            if (Categoria == null)
            {
                return new Response((int)SystemEnums.ResponseCode.ERROR, "No Existe la Categoria");
            }

            return new Response((int)SystemEnums.ResponseCode.OK, "Categoria", Categoria);
        }

        public async Task<Response> DeleteCategoria(int idCategoria)
        {
            var Category = await this._dbContext.ProductCategories.Where(i => i.CategoryProductId == idCategoria).FirstOrDefaultAsync();

            if (Category == null)
            {
                return new Response((int)SystemEnums.ResponseCode.ERROR, "Categoria no existe");
            }

            var Products = await this._dbContext.Products.Where(i=>i.CategoryProductId == Category.CategoryProductId).ToListAsync();

            _dbContext.Products.RemoveRange(Products);

            _dbContext.ProductCategories.Remove(Category);

            return new Response((int)SystemEnums.ResponseCode.OK, "Categoria Eliminada");
        }
    }
}
