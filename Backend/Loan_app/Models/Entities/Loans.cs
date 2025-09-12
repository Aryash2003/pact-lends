using System.ComponentModel.DataAnnotations;

namespace Loan_app.Models.Entities
{
    public class Loans
    {
        [Key]
        public int Borrower_id { get; set; }
        public int Amount { get; set; }
        public string Status { get; set; }
    }
}
