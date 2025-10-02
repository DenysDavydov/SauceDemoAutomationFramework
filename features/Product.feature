@Product
Feature: Product page

  @Smoke
  Scenario: View a product
    Given I'm on the Inventory page as a standard user
    When I click "Sauce Labs Fleece Jacket" product
    Then I should see the following product info on the Product page
      | itemTitle   | Sauce Labs Fleece Jacket                                                                                                                                               |
      | description | It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office. |
      | price       | $49.99                                                                                                                                                                 |

  @Smoke
  Scenario: Add to cart
    Given I'm on the Inventory page as a standard user
    When I click "Sauce Labs Bolt T-Shirt" product
    And I click add the product to cart
    And I click the cart icon
    Then I should see the following products on the Cart page
      | Sauce Labs Bolt T-Shirt |
