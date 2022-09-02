Feature: any people can load todos

  Background:
    Given todo exists
      | id  | title          | description                        |
      | abc | my first todo  | Yeah, I have created a todo        |
      | cde | my second todo | Yeah, I have created a second todo |

    Scenario: load todos
        When I load todos
        Then I should see todos
            | id  | title          | description                        |
            | abc | my first todo  | Yeah, I have created a todo        |
            | cde | my second todo | Yeah, I have created a second todo |