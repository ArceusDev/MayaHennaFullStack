using api.DTOs;
using api.Helpers;
using api.Models;

namespace api.Interfaces
{
    public interface IServiceRepository
    {
        Task<List<Service>> GetAllAsync(QueryObject query);
        Task<Service?> GetByIdAsync(int id);
        Task<Service> CreateAsync(Service service);
        Task<Service?> UpdateAsync(int id, UpdateServiceDto updateServiceDto);
        Task<Service?> DeleteAsync(int id);
        Task<bool> ServiceExists(int id);
    }
}
