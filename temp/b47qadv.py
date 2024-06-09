# Recursive Approach
def countWaysRecursive(n):
    if n == 0 or n == 1:
        return 1
    return countWaysRecursive(n - 1) + countWaysRecursive(n - 2)

# Memoization Approach
def countWaysMemo(n, memo):
    if n == 0 or n == 1:
        return 1
    if memo[n] != -1:
        return memo[n]
    memo[n] = countWaysMemo(n - 1, memo) + countWaysMemo(n - 2, memo)
    return memo[n]

def countWaysWithMemo(n):
    memo = [-1] * (n + 1)
    return countWaysMemo(n, memo)

# Tabulation Approach
def countWaysTabulation(n):
    if n == 0 or n == 1:
        return 1
    dp = [0] * (n + 1)
    dp[0] = 1
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    return dp[n]

# Testing the functions
n = 5
print(f"Number of ways (Recursive): {countWaysRecursive(n)}")
print(f"Number of ways (Memoization): {countWaysWithMemo(n)}")
print(f"Number of ways (Tabulation): {countWaysTabulation(n)}")
