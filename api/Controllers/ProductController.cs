using api.Data;
using api.DTOs;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly MS_DbContext _context;
        private readonly IProductRepository _productRepo;
        public ProductController(MS_DbContext context, IProductRepository productRepo)
        {
            _productRepo = productRepo;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllProducts([FromQuery] QueryObject query)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var products = await _productRepo.GetAllAsync(query);

            var productDto = products.Select(s => s.ToProductDto()).ToList();

            return Ok(productDto);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult> GetProduct([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var product = await _productRepo.GetByIdAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product.ToProductDto());
        }

        [HttpPost, Authorize]
        public async Task<ActionResult> AddProduct([FromBody] UpdateProductDto productDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var product = productDto.ToProductFromUpdateDto();

            await _productRepo.CreateAsync(product);

            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product.ToProductDto());
        }

        [HttpPut("{id:int}"), Authorize]
        public async Task<IActionResult> UpdateProduct([FromRoute] int id,[FromBody] UpdateProductDto updateProductDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var product = await _productRepo.UpdateAsync(id, updateProductDto);

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product.ToProductDto());
        }

        [HttpDelete("{id:int}"), Authorize]
        public async Task<IActionResult> DeleteTodoItem([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var product = await _productRepo.DeleteAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
