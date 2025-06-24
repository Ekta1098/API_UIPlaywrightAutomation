<<<<<<< HEAD
# API_UIPlaywrightAutomation
=======
# API_UIPlaywrightAutomation
>>>>>>> ff75c4640465bcf2ad0aeb9a099d6b84304c39e4
##  API Test Scenarios – Favorites

1 **Create favorite with valid data**  
→ Send a `POST` request with valid `airport_id` and `note`  
→ **Expected:** `201 Created`, response contains `id` and matches schema

2️ **Get created favorite by ID**  
→ Send a `GET` request to `/favorites/{id}`  
→ **Expected:** `200 OK`, returned data matches the created favorite and schema

3️ **Update favorite note by ID**  
→ Send a `PATCH` request to `/favorites/{id}` with new `note`  
→ **Expected:** `200 OK`, note is updated correctly

4️ **Delete favorite by ID**  
→ Send a `DELETE` request to `/favorites/{id}`  
→ **Expected:** `204 No Content`, item is deleted

5️ **Negative: Create favorite with invalid airport ID**  
→ Send a `POST` request with an invalid `airport_id`  
→ **Expected:** `422 Unprocessable Entity`, validation error returned

6️ **Negative: Create favorite with invalid token**  
→ Send a `POST` request with a valid payload but invalid token  
→ **Expected:** `401 Unauthorized`, authentication failure

7️ **Negative: Access invalid endpoint**  
→ Send a `GET` request to an invalid URL (e.g. `/invalid-path`)  
→ **Expected:** `404 Not Found`, endpoint does not exist



## UI Test Scenarios

| #️ | Scenario Description                                                                    |
|---|---------------------------------------------------------------------------------------- |
| 1️ | **Invalid login** → Enter wrong username/password → Verify error message is shown       |
| 2 | **Valid login** → Verify dashboard loads → Products visible → Logout successfully       |
| 3️ | **Product listing** → All products have image, price, and “Add to Cart” button          |
| 4️ | **Add single item** → Add 1 product → Checkout → Validate pricing and thank you message |
| 5️ | **Add multiple items** → Add 2–3 products → Checkout → Validate total price and message |








