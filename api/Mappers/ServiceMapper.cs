using api.DTOs;
using api.Models;

namespace api.Mappers
{
    public static class ServiceMapper
    {
        public static ServiceDto ToServiceDto(this Service service)
        {
            return new ServiceDto
            {
                Id = service.Id,
                Title = service.Title,
                Description = service.Description,
                Price = service.Price,
                Type = service.Type,
            };
        }

        public static Service ToServiceFromUpdateDto(this UpdateServiceDto updateServiceDto)
        {
            return new Service
            {
                Title = updateServiceDto.Title,
                Description = updateServiceDto.Description,
                Price = updateServiceDto.Price,
                Type = updateServiceDto.Type,
            };
        }
    }
}
