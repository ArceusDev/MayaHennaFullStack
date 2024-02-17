using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class MS_DbContext : IdentityDbContext
    {
        public MS_DbContext(DbContextOptions<MS_DbContext> options) : base(options) 
        { 

        }
    }
}
