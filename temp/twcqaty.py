def sum_two_numbers(a, b):
    return a + b

# Get user input
try:
    num1 = float(input("Enter the first number: "))
    num2 = float(input("Enter the second number: "))
except EOFError:
    print("Error: No input provided.")
    num1, num2 = 0, 0

# Calculate the sum
result = sum_two_numbers(num1, num2)

# Print the result
print(f"The sum of {num1} and {num2} is {result}")
