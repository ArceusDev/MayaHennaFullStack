using api.Data;
using api.DTOs;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class ServiceRepository : IServiceRepository
    {
        private readonly MS_DbContext _context;
        public ServiceRepository(MS_DbContext context)
        {
            _context = context;
        }

        public async Task<Service> CreateAsync(Service service)
        {
            await _context.Service.AddAsync(service);
            await _context.SaveChangesAsync();
            return service;
        }

        public async Task<Service?> DeleteAsync(int id)
        {
            var service = await _context.Service.FirstOrDefaultAsync(x => x.Id == id);
            if (service == null)
            {
                return null;
            }

            _context.Service.Remove(service);
            await _context.SaveChangesAsync(true);

            return service;
        }

        public async Task<List<Service>> GetAllAsync(QueryObject query)
        {
            var services = _context.Service.AsQueryable();

            if (!string.IsNullOrWhiteSpace(query.Type))
            {
                services = services.Where(s => s.Type.Contains(query.Type));
            }

            if (!string.IsNullOrWhiteSpace(query.Title))
            {
                services = services.Where(s => s.Title.Contains(query.Title));
            }

            if (!string.IsNullOrWhiteSpace(query.SortBy))
            {
                if (query.SortBy.Equals("Price", StringComparison.OrdinalIgnoreCase))
                {
                    services = query.IsDecsending ? services.OrderByDescending(s => s.Price) : services.OrderBy(s => s.Price);
                }
            }

            if (!string.IsNullOrWhiteSpace(query.SortBy))
            {
                if (query.SortBy.Equals("Title", StringComparison.OrdinalIgnoreCase))
                {
                    services = query.IsDecsending ? services.OrderByDescending(s => s.Title) : services.OrderBy(s => s.Title);
                }
            }

            var skipNumber = (query.PageNumber - 1) * query.PageSize;


            return await services.Skip(skipNumber).Take(query.PageSize).ToListAsync();
        }

        public async Task<Service?> GetByIdAsync(int id)
        {
            return await _context.Service.FirstOrDefaultAsync(s => s.Id == id);
        }

        public async Task<bool> ServiceExists(int id)
        {
            return await _context.Service.AnyAsync(s => s.Id == id);
        }

        public async Task<Service?> UpdateAsync(int id, UpdateServiceDto updateServiceDto)
        {
            var existingService = await _context.Service.FirstOrDefaultAsync(x => x.Id == id);

            if (existingService == null)
            {
                return null;
            }

            existingService.Title = updateServiceDto.Title;
            existingService.Description = updateServiceDto.Description;
            existingService.Price = updateServiceDto.Price;
            existingService.Type = updateServiceDto.Type;

            await _context.SaveChangesAsync();

            return existingService;
        }
    }
}
