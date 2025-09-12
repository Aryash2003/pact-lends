using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Loan_app.Migrations
{
    /// <inheritdoc />
    public partial class Third_Final_Migration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "Lenders",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "borrowers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Password",
                table: "Lenders");

            migrationBuilder.DropColumn(
                name: "Password",
                table: "borrowers");
        }
    }
}
