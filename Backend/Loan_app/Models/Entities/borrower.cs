using System.ComponentModel.DataAnnotations;

namespace Loan_app.Models.Entities
{
    public class borrower
    {
        public int Id { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public String Password { get; set; }    

    }
}
