using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace api.DTOs
{
    public class UpdateProductDto
    {
        [Required]
        [MaxLength(50, ErrorMessage = "Title cannot be over 50 characters")]
        public string Title { get; set; } = string.Empty;
        [Required]
        [MaxLength(1000, ErrorMessage = "Description cannot be over 1000 characters")]
        public string? Description { get; set; }
        [Required]
        [Precision(18, 2)]
        public decimal Price { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "Picture link is required")]
        public string Picturelink { get; set; } = string.Empty;
    }
}
