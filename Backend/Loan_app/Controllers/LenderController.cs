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
            _context.Lenders.Add(lender);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetLender), new { id = lender.Id }, lender);
        }

        [HttpGet("GetLenders")]
        public async Task<ActionResult<IEnumerable<Lender>>> GetLender()
        {
            return await _context.Lenders.ToListAsync();
        }
    }
}
