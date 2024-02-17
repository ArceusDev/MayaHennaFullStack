using api.Data;
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
        public ServiceController(MS_DbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Service>>> GetAllServices()
        {
            var service = await _context.Service.ToListAsync();

            if (service == null)
            {
                return NotFound();
            }

            return Ok(service);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Service>>> GetService(int id)
        {
            var service = await _context.Service.FindAsync(id);

            if (service == null)
            {
                return NotFound();
            }

            return Ok(service);
        }

        [HttpPost, Authorize]
        public async Task<ActionResult<Service>> AddService([FromBody] Service service)
        {
            _context.Service.Add(service);

            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetService), new { id = service.Id }, service);
        }

        [HttpPut("{id}"), Authorize]
        public async Task<IActionResult> UpdateService(int id, Service service)
        {
            if (id != service.Id)
            {
                return BadRequest();
            }

            _context.Entry(service).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                var ser = await _context.Service.FindAsync(id);
                if (ser == null)
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}"), Authorize]
        public async Task<IActionResult> DeleteTodoItem(int id)
        {
            var service = await _context.Service.FindAsync(id);
            if (service == null)
            {
                return NotFound();
            }

            _context.Service.Remove(service);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        /*
        // GET: api/<ServiceController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<ServiceController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<ServiceController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<ServiceController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ServiceController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        */
    }
}
