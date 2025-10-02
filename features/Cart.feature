@Cart
Feature: Cart

  @Smoke
  Scenario: Add items to the cart
    Given I'm on the Inventory page as a standard user
    When I add the following products to cart
      | Sauce Labs Bolt T-Shirt |
      | Sauce Labs Onesie       |
    And I click the cart icon
    Then I should see the following products on the Cart page
      | Sauce Labs Bolt T-Shirt |
      | Sauce Labs Onesie       |

  @Smoke
  Scenario: Remove items from the cart
    Given I have added the following products to cart
      | Sauce Labs Bolt T-Shirt |
      | Sauce Labs Onesie       |
    When I click the cart icon
    And I delete the following products from cart
      | Sauce Labs Bolt T-Shirt |
      | Sauce Labs Onesie       |
    Then the added products counter should not be displayed

  @Smoke
  Scenario: The cart badge should display the number of items added
    Given I decided to purchase some stuff
    When I add the following products to cart
      | Sauce Labs Bolt T-Shirt |
      | Sauce Labs Onesie       |
    Then the cart badge should display 2

  @Regression
  Scenario: Remove items from the cart on the Inventory page
    Given I have added the following products to cart
      | Sauce Labs Bolt T-Shirt |
      | Sauce Labs Onesie       |
    When I delete the following products from cart on the Inventory page
      | Sauce Labs Bolt T-Shirt |
      | Sauce Labs Onesie       |
    Then the added products counter should not be displayed
