using api.DTOs;
using api.Models;

namespace api.Mappers
{
    public static class ProductMapper
    {
        public static ProductDto ToProductDto(this Product product)
        {
            return new ProductDto
            {
                Id = product.Id,
                Title = product.Title,
                Description = product.Description,
                Price = product.Price,
                Picturelink = product.Picturelink,
            };
        }

        public static Product ToProductFromUpdateDto(this UpdateProductDto updateProductDto)
        {
            return new Product
            {
                Title = updateProductDto.Title,
                Description = updateProductDto.Description,
                Price = updateProductDto.Price,
                Picturelink = updateProductDto.Picturelink,
            };
        }
    }
}
