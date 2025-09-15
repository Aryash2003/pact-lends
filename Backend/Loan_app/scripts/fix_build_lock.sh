#!/bin/bash
# Script to terminate the Loan_app process and then build the project

# Terminate the process with PID 3412
kill -9 3412

# Wait a moment to make sure the process has terminated
sleep 1

# Run the build
dotnet build