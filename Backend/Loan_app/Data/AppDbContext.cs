using Microsoft.EntityFrameworkCore;
using Loan_app.Models.Entities;
namespace Loan_app.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<borrower> borrowers { get; set; }
        public DbSet<Lender> Lenders { get; set; }
        public DbSet<Plans> Plans { get; set; }
        public DbSet<Request> Requests { get; set; }
    }
}
