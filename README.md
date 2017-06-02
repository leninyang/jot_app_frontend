# JoT
![](public/images/readme/intro.png)
/jät/ *verb:* to jot means to write (something) quickly. JoT is a simple note taking application that helps capture what's on your mind.


## Technologies
```
- Rails backend
- Postgresql DB
- Authentication with Javascript Web Tokens
- AngularJS | Node.js | Express.js Front-End
```

## ERD
```
User
- Has many notes

Note
- Belongs to user
```

## SCHEMA
```
User
  t.string "username"
  t.string "password"
  t.string "name"
```
```
Notes
  t.string "title"
  t.text "content"
  t.boolean "starred"
  t.boolean "archived"
```
## User Stories
**User should be able to:**

- Create an account.
- Create, update, delete a note.
- See a list of all the notes.
- Search through his/her notes.
- Star/Favorite a note
- See a list of all the starred/favorited notes.
- Archive a note
- See a list of all archived notes.

**Stretch:**

- Ability to add photos in your notes
- Ability to format notes (i.e. bold, italic, bullet list)
- Share notes with other users (Collaboration)
