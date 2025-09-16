using Loan_app.Data;
using Loan_app.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Loan_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LenderController : ControllerBase
    {
        private readonly AppDbContext _context;
        public LenderController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("AddLender")]
        public async Task<ActionResult<Lender>> AddLender([FromForm] Lender lender)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var existingLender = await _context.Lenders.FirstOrDefaultAsync(l => l.Email == lender.Email);

            if (existingLender != null)
            {
                return Conflict(new { message = "Email already exists. Please use a different email." });
            }

            _context.Lenders.Add(lender);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetLender), new { id = lender.Id }, lender);
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromForm] string email, [FromForm] string password)
        {
            var lender = await _context.Lenders
                .FirstOrDefaultAsync(l => l.Email == email && l.Password == password);
            if (lender == null)
                return Unauthorized("Invalid credentials");
            // ✅ Save LenderId in session
            HttpContext.Session.SetInt32("LenderId", lender.Id);
            return Ok(new { message = "Login successful", lenderId = lender.Id });
        }
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            HttpContext.Session.Remove("LenderId");
            return Ok(new { message = "Logout successful" });   
        }
        [HttpGet("GetLenders")]
        public async Task<ActionResult<IEnumerable<Lender>>> GetLender()
        {
            return await _context.Lenders.ToListAsync();
        }
        [HttpPost("Add_plan")]
        public async Task<ActionResult<Plans>> Add_plan([FromForm] string title,[FromForm] int interestRate, [FromForm] int duration, [FromForm] int amount)
        {
            var lenderId = HttpContext.Session.GetInt32("LenderId");
            if (!lenderId.HasValue)
                return Unauthorized("Please log in as a lender to add a plan.");
            var plan = new Plans
            {
                title = title,
                Lender_id = lenderId.HasValue ? lenderId.Value : 0,
                interestRate = interestRate,
                durationInMonths = duration,
                maxLoanAmount = amount
            };
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            _context.Plans.Add(plan);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetPlans), new { id = plan.Id }, plan);
        }
        [HttpGet("GetPlans")]
        public async Task<ActionResult<IEnumerable<Plans>>> GetPlans()
        {
            return await _context.Plans.ToListAsync();
        }
        [HttpPost("StatusUpdate")]
        public async Task<IActionResult> StatusUpdate([FromForm] int requestId, [FromForm] string status)
        {
            var lenderId = HttpContext.Session.GetInt32("LenderId");
            if (!lenderId.HasValue)
                return Unauthorized("Please log in as a lender to update request status.");
            var request = await _context.Requests.FindAsync(requestId);
            if (request == null)
                return NotFound("Request not found.");
            request.Status = status;
            await _context.SaveChangesAsync();
            return Ok(new { message = "Request status updated successfully." });
        }
        [HttpGet("GetRequests")]
        public async Task<ActionResult<IEnumerable<Request>>> GetRequests()
        {
            var lenderId = HttpContext.Session.GetInt32("LenderId");
            if (!lenderId.HasValue)
                return Unauthorized("Please log in as a lender to view requests.");
            var requests = await _context.Requests
                .Where(r => r.plan_id != 0 && _context.Plans.Any(p => p.Id == r.plan_id && p.Lender_id == lenderId.Value))
                .ToListAsync();
            return requests;
        }
        [HttpPut("EditPlan")]
        public async Task<IActionResult> EditPlan([FromForm] int id,[FromForm] string Title,[FromForm] int amount,[FromForm] int interest,[FromForm] int Duration)
        {
            var plan = await _context.Plans.FindAsync(id);
            if (plan == null)
                return NotFound("Plan not found");

            plan.title = Title;
            plan.maxLoanAmount = amount;
            plan.interestRate = interest;
            plan.durationInMonths = Duration;

            await _context.SaveChangesAsync();
            return Ok(new { message = "Plan updated successfully", plan });
        }
    }
}
