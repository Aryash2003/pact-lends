using Loan_app.Data;
using Loan_app.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Loan_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BorrowersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BorrowersController(AppDbContext context)
        {
            _context = context;
        }
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromForm] string email, [FromForm] string password)
        {
            var borrower = await _context.borrowers
                .FirstOrDefaultAsync(b => b.Email == email && b.Password == password);

            if (borrower == null)
                return Unauthorized("Invalid credentials");

            // ✅ Save BorrowerId in session
            HttpContext.Session.SetInt32("BorrowerId", borrower.Id);

            return Ok(new { message = "Login successful", borrowerId = borrower.Id });
        }
        [HttpPost("Logout")]
        public IActionResult Logout()
        {
            HttpContext.Session.Remove("BorrowerId");
            return Ok(new { message = "Logout successful" });
        }
        // Add a new borrower (form-data or JSON)
        [HttpPost("AddBorrower")]
        public async Task<ActionResult<borrower>> AddBorrower([FromForm] borrower borrower)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var existingBorrower = await _context.borrowers.FirstOrDefaultAsync(b => b.Email == borrower.Email);

            if (existingBorrower != null)
            {
                return Conflict(new { message = "Email already exists. Please use a different email." });
            }

            _context.borrowers.Add(borrower);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBorrower), new { id = borrower.Id }, borrower);
        }

        // Get all borrowers
        [HttpGet("GetBorrowers")]
        public async Task<ActionResult<IEnumerable<borrower>>> GetBorrowers()
        {
            return await _context.borrowers.ToListAsync();
        }

        // Get borrower by id
        [HttpGet("{id}")]
        public async Task<ActionResult<borrower>> GetBorrower(int id)
        {
            var borrower = await _context.borrowers.FindAsync(id);

            if (borrower == null)
                return NotFound();

            return borrower;
        }
        // Update borrower by id (form-data or JSON)
        [HttpPut("UpdateBorrower/{id}")]
        public async Task<IActionResult> UpdateBorrower(int id, [FromForm] borrower updatedBorrower)
        {
            var borrower = await _context.borrowers.FindAsync(id);

            if (borrower == null)
                return NotFound();

            // Update fields
            borrower.FirstName = updatedBorrower.FirstName;
            borrower.LastName = updatedBorrower.LastName;
            borrower.Email = updatedBorrower.Email;
            borrower.PhoneNumber = updatedBorrower.PhoneNumber;

            await _context.SaveChangesAsync();
            return Ok(borrower);
        }
        [HttpPost("Loan_request")]
        public async Task<IActionResult> Loan_request( [FromForm] int amount, [FromForm] string FirstName, [FromForm] string LastName, [FromForm]
        DateTime dob,[FromForm] string Company, [FromForm] string employment_status, [FromForm] int income, [FromForm] string job_title)
        {
            var borrowerId = HttpContext.Session.GetInt32("BorrowerId");
            if (!borrowerId.HasValue)
                return Unauthorized("Please log in as a borrower to request a loan.");
            var request = new Request
            {
                firstName = FirstName,
                lastName = LastName,
                dob = dob,
                employment_status = employment_status,
                job_title = job_title, 
                company_name=Company,
                monthly_income = income,
                Borrower_id = borrowerId.Value,
                Amount = amount,
                Status = "Pending"
            };
            _context.Requests.Add(request);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Loan request submitted"});
        }

    }
}
