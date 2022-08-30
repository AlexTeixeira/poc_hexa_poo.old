Feature: any people can create a todo

  Scenario Outline: any can't create a todo because title is empty
    Given I have a todo with <title> and <description>
    When I create the todo
    Then I should be noticed with "Todo content should be valid"
    Examples:
      | title              | description              |
      |                    |                          |
      | "Some valid title" |                          |
      |                    | "Some valid description" |

  Scenario Outline: any can create a todo
    Given I have a todo with <title> and <description>
    When I create the todo
    Then Todo should be created
    Examples:
      | title              | description              |
      | "Some valid title" | "Some valid description" |