Feature: any user can update a status of a todo

  Background:
    Given todo exists
      | id  | title         | description                 |
      | abc | my first todo | Yeah, I have created a todo |

  Scenario: update todo state that not exist
    Given the todo "eee"
    When I update the status to "Done"
    Then I should be noticed with "Selected todo does not exist"

  Scenario Outline: update a todo status
    Given the todo "<id>"
    When I update the status to "<status>"
    Then the todo should have the correct status

    Examples:
      | description        | id  |  | status |
      | New to InProgress  | abc |  | done   |
      | Done to InProgress | abc |  | done   |
      | InProgress to Done | abc |  | done   |
