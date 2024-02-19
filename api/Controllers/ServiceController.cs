using api.Data;
using api.DTOs;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceController : ControllerBase
    {
        private readonly MS_DbContext _context;
        private readonly IServiceRepository _serviceRepo;
        public ServiceController(MS_DbContext context, IServiceRepository serviceRepo)
        {
            _serviceRepo = serviceRepo;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllServices([FromQuery] QueryObject query)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var services = await _serviceRepo.GetAllAsync(query);

            var serviceDto = services.Select(s => s.ToServiceDto()).ToList();

            return Ok(serviceDto);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult> GetService([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var service = await _serviceRepo.GetByIdAsync(id);

            if (service == null)
            {
                return NotFound();
            }

            return Ok(service.ToServiceDto());
        }

        [HttpPost, Authorize]
        public async Task<ActionResult> AddService([FromBody] UpdateServiceDto serviceDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var service = serviceDto.ToServiceFromUpdateDto();

            await _serviceRepo.CreateAsync(service);

            return CreatedAtAction(nameof(GetService), new { id = service.Id }, service.ToServiceDto());
        }

        [HttpPut("{id:int}"), Authorize]
        public async Task<IActionResult> UpdateService([FromRoute] int id, [FromBody] UpdateServiceDto updateServiceDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var service = await _serviceRepo.UpdateAsync(id, updateServiceDto);

            if (service == null)
            {
                return NotFound();
            }

            return Ok(service.ToServiceDto());
        }

        [HttpDelete("{id:int}"), Authorize]
        public async Task<IActionResult> DeleteTodoItem([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var service = await _serviceRepo.DeleteAsync(id);

            if (service == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
