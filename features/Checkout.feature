@Checkout
Feature: Checkout

  @Smoke
  Scenario: Complete checkout
    Given I have added the following products to cart
      | Sauce Labs Bolt T-Shirt |
      | Sauce Labs Onesie       |
    When I click the cart icon
    And I click Checkout
    And I submit my checkout info:
      | firstName | John   |
      | lastName  | Doe    |
      | zipCode   | 123456 |
    Then I should see the following products on the Checkout Step 2 page
      | Sauce Labs Bolt T-Shirt |
      | Sauce Labs Onesie       |
    When I click Finish on the Checkout page
    Then my checkout should get completed with the following message
      """
      "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
      """

  @Regression
  Scenario: Cancel checkout at step 1
    Given I have added the following products to cart
      | Sauce Labs Bolt T-Shirt |
    When I click the cart icon
    And I click Checkout
    And I cancel checking out
    Then I should get back to the Cart page
    And I should see the following products on the Cart page
      | Sauce Labs Bolt T-Shirt |

  @Bug @Regression
  Scenario: Cancel checkout at step 2
    Given I have added the following products to cart
      | Sauce Labs Onesie |
    When I click the cart icon
    And I click Checkout
    And I submit my checkout info:
      | firstName | John   |
      | lastName  | Doe    |
      | zipCode   | 123456 |
    And I cancel checking out
    Then I should get back to the Cart page
    And I should see the following products on the Cart page
      | Sauce Labs Onesie |

  @Bug @Regression
  Scenario: An empty cart cannot be checked out
    Given I'm on the Cart page as a standard user
    When I click Checkout
    Then I should stay at the Cart page
