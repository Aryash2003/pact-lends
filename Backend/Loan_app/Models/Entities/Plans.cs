using System.ComponentModel.DataAnnotations;
namespace Loan_app.Models.Entities
{
    public class Plans
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string title { get; set; }
        [Required]
        public int Lender_id { get; set; }
        [Required]
        public int interestRate { get; set; }
        [Required]
        public int durationInMonths { get; set; }
        public int minLoanAmount { get; set; }
        [Required]
        public int maxLoanAmount { get; set; }
    }
}
