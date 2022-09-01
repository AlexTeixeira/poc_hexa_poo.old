Feature: any people can update a todo

  Background:
    Given todo exists
      | id  | title         | description                 |
      | abc | my first todo | Yeah, I have created a todo |

  Scenario Outline: update a todo with empty title
    Given the todo "abc"
    Given I change the todo with <title> and <description>
    When I update the todo
    Then I should be noticed with "Todo content should be valid"

    Examples:
      | title              | description              |
      |                    |                          |
      | "Some valid title" |                          |
      |                    | "Some valid description" |

  Scenario Outline: Update a todo that not exists
    Given the todo "zzz"
    Given I change the todo with <title> and <description>
    When I update the todo
    Then I should be noticed with "Selected todo does not exist"

    Examples:
      | title              | description              |
      | "Some valid title" | "Some valid description" |

  Scenario Outline: Update a todo with valid data
    Given the todo "abc"
    Given I change the todo with <title> and <description>
    When I update the todo
    Then the todo should be updated
    Examples:
      | title          | description                 |
      | my second todo | Yeah, I have updated a todo |
