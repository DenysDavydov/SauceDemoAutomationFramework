@Login
Feature: Login page

  @Smoke
  Scenario: Log in with valid credentials
    Given I'm on the Login page
    When I login as a standard user
    Then I should see the Inventory page

  @Smoke
  Scenario: A locked out user cannot log in
    Given I'm on the Login page
    When I try to login as a lockedOut user
    Then I should stay at the Login page
    And I should see the login error message "Epic sadface: Sorry, this user has been locked out."
