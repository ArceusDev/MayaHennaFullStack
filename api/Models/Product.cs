using Microsoft.EntityFrameworkCore;

namespace api.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? link { get; set; }
        [Precision(18, 2)]
        public decimal Price { get; set; }
        public ProductImage? PrImage { get; set; }
    }
}
