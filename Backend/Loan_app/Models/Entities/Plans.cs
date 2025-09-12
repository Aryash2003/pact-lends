using System.ComponentModel.DataAnnotations;
namespace Loan_app.Models.Entities
{
    public class Plans
    {
        [Key]
        public int Lender_id { get; set; }
        public int interestRate { get; set; }
        public int durationInMonths { get; set; }
        public int maxLoanAmount { get; set; }
    }
}
