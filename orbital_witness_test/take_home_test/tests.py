from django.test import TestCase

# Create your tests here.

from .utils import calculate_message_cost

class TestCalculateUsage(TestCase):
    # I am aware that these tests are not exhaustive and don't all pass, but I am running out of time
    # I use a new function for every test case because the it is easier to see which test failed
    # A good suite of tests is essential for ensuring the usage data is accurate
    def test_calculate_message_cost_empty_message(self):
        message = ""
        expected_cost = 1
        self.assertEqual(calculate_message_cost(message), expected_cost)

    def test_calculate_message_cost_short_message(self):
        message = "Hello world"
        expected_cost = 1
        self.assertEqual(calculate_message_cost(message), expected_cost)

    def test_calculate_message_cost_long_message(self):
        message = "This is a long message with PUNCTUATION! And UPPERCASE characters."
        expected_cost = 6.95
        self.assertEqual(calculate_message_cost(message), expected_cost)

    def test_calculate_message_cost_unique_words(self):
        message = "The quick brown fox jumps over the lazy dog"
        expected_cost = 1.5
        self.assertEqual(calculate_message_cost(message), expected_cost)

    def test_calculate_message_cost_palindrome_words(self):
        message = "level kayak level"
        expected_cost = 3.6
        self.assertEqual(calculate_message_cost(message), expected_cost)

    def test_calculate_message_cost_exceeding_length_threshold(self):
        message = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
        expected_cost = 18.2
        self.assertEqual(calculate_message_cost(message), expected_cost)

    def test_calculate_message_cost_vowels_every_third_character(self):
        message = "aeiouaeiouaeiouaeiou"
        expected_cost = 4.9
        self.assertEqual(calculate_message_cost(message), expected_cost)

    def test_calculate_message_cost_hyphens_and_apostrophes(self):
        message = "I'm a test-case with hyphens-and-apostrophes"
        expected_cost = 3.2
        self.assertEqual(calculate_message_cost(message), expected_cost)

