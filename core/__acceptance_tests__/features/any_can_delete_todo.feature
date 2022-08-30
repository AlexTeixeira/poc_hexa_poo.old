Feature: any people can delete a todo

  Background:
    Given todo exists
      | id  | title         | description                 |
      | abc | my first todo | Yeah, I have created a todo |

  Scenario: delete a todo that not exists
    Given the todo "cde"
    When I delete the todo
    Then I should be noticed with "Selected todo does not exist"

  Scenario: delete a todo
    Given the todo "abc"
    When I delete the todo
    Then the todo should be deleted
