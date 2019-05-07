select firstname, email, user_id, balance from users
join balances on balances.balance_id = users.user_id
where user_id = ${id};