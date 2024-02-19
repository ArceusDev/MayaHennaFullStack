using api.Data;
using api.DTOs;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly MS_DbContext _context;
        public ProductRepository(MS_DbContext context)
        {
            _context = context;
        }

        public async Task<Product> CreateAsync(Product product)
        {
            await _context.Product.AddAsync(product);
            await _context.SaveChangesAsync();
            return product;
        }

        public async Task<Product?> DeleteAsync(int id)
        {
            var product = await _context.Product.FirstOrDefaultAsync(x => x.Id == id);
            if (product == null)
            {
                return null;
            }

            _context.Product.Remove(product);
            await _context.SaveChangesAsync(true);

            return product;
        }

        public async Task<List<Product>> GetAllAsync(QueryObject query)
        {
            var products = _context.Product.AsQueryable();

            if (!string.IsNullOrWhiteSpace(query.Title))
            {
                products = products.Where(s => s.Title.Contains(query.Title));
            }

            if (!string.IsNullOrWhiteSpace(query.SortBy))
            {
                if (query.SortBy.Equals("Price", StringComparison.OrdinalIgnoreCase))
                {
                    products = query.IsDecsending ? products.OrderByDescending(s => s.Price) : products.OrderBy(s => s.Price);
                }
            }

            if (!string.IsNullOrWhiteSpace(query.SortBy))
            {
                if (query.SortBy.Equals("Title", StringComparison.OrdinalIgnoreCase))
                {
                    products = query.IsDecsending ? products.OrderByDescending(s => s.Title) : products.OrderBy(s => s.Title);
                }
            }

            var skipNumber = (query.PageNumber - 1) * query.PageSize;


            return await products.Skip(skipNumber).Take(query.PageSize).ToListAsync();
        }

        public async Task<Product?> GetByIdAsync(int id)
        {
            return await _context.Product.FirstOrDefaultAsync(s => s.Id == id);
        }

        public async Task<bool> ProductExists(int id)
        {
            return await _context.Product.AnyAsync(s => s.Id == id);
        }

        public async Task<Product?> UpdateAsync(int id, UpdateProductDto updateProductDto)
        {
            var existingProduct = await _context.Product.FirstOrDefaultAsync(x => x.Id == id);

            if (existingProduct == null)
            {
                return null;
            }

            existingProduct.Title = updateProductDto.Title;
            existingProduct.Description = updateProductDto.Description;
            existingProduct.Price = updateProductDto.Price;
            existingProduct.Picturelink = updateProductDto.Picturelink;

            await _context.SaveChangesAsync();

            return existingProduct;
        }
    }
}
