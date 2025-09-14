using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Loan_app.Migrations
{
    /// <inheritdoc />
    public partial class @new : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "minLoanAmount",
                table: "Plans",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "title",
                table: "Plans",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "company_name",
                table: "Loans",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "dob",
                table: "Loans",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "employment_status",
                table: "Loans",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "firstName",
                table: "Loans",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "job_title",
                table: "Loans",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "lastName",
                table: "Loans",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "monthly_income",
                table: "Loans",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "minLoanAmount",
                table: "Plans");

            migrationBuilder.DropColumn(
                name: "title",
                table: "Plans");

            migrationBuilder.DropColumn(
                name: "company_name",
                table: "Loans");

            migrationBuilder.DropColumn(
                name: "dob",
                table: "Loans");

            migrationBuilder.DropColumn(
                name: "employment_status",
                table: "Loans");

            migrationBuilder.DropColumn(
                name: "firstName",
                table: "Loans");

            migrationBuilder.DropColumn(
                name: "job_title",
                table: "Loans");

            migrationBuilder.DropColumn(
                name: "lastName",
                table: "Loans");

            migrationBuilder.DropColumn(
                name: "monthly_income",
                table: "Loans");
        }
    }
}
