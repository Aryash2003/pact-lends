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

        // Add a new borrower (form-data or JSON)
        [HttpPost("AddBorrower")]
        public async Task<ActionResult<borrower>> AddBorrower([FromForm] borrower borrower)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

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

    }
}
