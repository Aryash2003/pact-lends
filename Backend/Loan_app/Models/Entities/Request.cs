using System.ComponentModel.DataAnnotations;

namespace Loan_app.Models.Entities
{
    public class Request
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int plan_id { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public DateTime dob { get; set; }
        public string employment_status { get; set; }
        public string company_name { get; set; }
        public int monthly_income { get; set; }
        public string job_title { get; set; }
        public int Borrower_id { get; set; }
        public int Amount { get; set; }
        public string Status { get; set; }
    }
}
