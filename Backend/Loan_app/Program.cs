using Loan_app.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// 🔹 Configure CORS for React
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // 👈 Use HTTPS for React dev server
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials(); // 👈 Required for cookies/session
    });
});

// 🔹 Add services
builder.Services.AddControllers();

// 🔹 EF Core with SQL Server
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString));

// 🔹 Session setup
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
    options.Cookie.SameSite = SameSiteMode.None;              // ✅ allow cross-site cookies
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;  // ✅ cookie only works over HTTPS
});

var app = builder.Build();

// 🔹 Middleware order matters!
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors("AllowFrontend"); // ✅ must be before Session/Auth
app.UseSession();             // ✅ enables session

app.UseAuthorization();

app.MapControllers();

app.Run();
