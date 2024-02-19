namespace api.Helpers
{
    public class QueryObject
    {
        public string? Title { get; set; }
        public string? SortBy { get; set; } = null;
        public decimal Price { get; set; }
        public bool IsDecsending { get; set; } = false;
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 20;
        public string? Type { get; set; }
    }
}
