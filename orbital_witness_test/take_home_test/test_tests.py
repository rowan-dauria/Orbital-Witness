def test_calculate_message_cost_hyphens_and_apostrophes(self):
    message = "I'm a test-case with hyphens-and-apostrophes"
    expected_cost = 3.2
    self.assertEqual(calculate_message_cost(message), expected_cost)
    
