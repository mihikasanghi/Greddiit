# DASS Assignment 1 - Greddiit

## Description
Greddiit is a social media platform similar to Reddit. It allows users to create and interact with various sub-communities called Sub Greddiits. The assignment focuses on building a web portal using the MERN stack (MongoDB, Express.js, React.js, Node.js) to implement the functionalities of Greddiit.

## Features
The web portal has the following features:

1. User Registration and Login
   - Users can register with their basic details and login to the portal.
   - Authentication and authorization are implemented using hashed passwords and JSON Web Tokens (JWT).
   - Option to login using Google/Facebook API or CAS Login.

2. User Dashboard
   - Profile Page: Users can view and edit their basic details and see their followers/following count.
   - My Sub Greddiits Page: Users can create new Sub Greddiits and view/manage their existing ones.
   - Sub Greddiits Page: Users can view and join/leave Sub Greddiits created by other users.
   - Saved Posts Page: Users can view their saved posts across all joined Sub Greddiits.

3. Sub Greddiit Functionality
   - Moderators can manage the Sub Greddiit's details, banned keywords, and user joining requests.
   - Users can create and interact with posts within a Sub Greddiit.
   - Posts can be upvoted, downvoted, commented on, and saved by users.
   - Moderators can view reports and take actions on reported posts and users.

4. Search and Filtering
   - Users can search for Sub Greddiits based on name using a search bar.
   - Sub Greddiits can be filtered based on tags and sorted based on various criteria.

5. Banned Keywords
   - Sub Greddiits can have banned keywords that are not allowed in posts.
   - Posts containing banned keywords are flagged and replaced with asterisks.

## Bonuses
The assignment includes several bonus features:

1. Chat Functionality: Users can chat with the people they follow if both users follow each other.
2. Confirming to Go Back: Users are prompted for confirmation when navigating away from an edited profile page.
3. Infinite Loading: Posts are loaded in a paginated manner as the user scrolls.
4. Multi-level Comments/Replies: Posts can have multiple levels of comments and replies.
5. Keyboard Shortcuts: Users can navigate between different pages/sections using keyboard shortcuts.

## Deliverables
The submission should be in the following format:
<roll_no>/
|--backend/
|  |--package.json
|  ... other files
|--frontend/
|  |--package.json
|  ... other files
|--README.md

## Deadlines
The assignment is divided into three parts with the following deadlines:
- Part 1 (Login/Registration and Profile Page): 25th January 11:59 PM
- Part 2 (Remaining Features): 8th February 11:59 PM
- Part 3 (Dockerization and Final Submission): 13th February 11:59 PM
- Bonus Features: 15th February 11:59 PM

## Additional Instructions
- Use of npm packages is allowed unless it's off-the-shelf (confirm with TAs).
- Styling or component libraries can be used (e.g., Bootstrap, Tailwind, Material UI).
- Final submissions should have correct `package.json` files.
- Plagiarism checks will be performed within the batch and with senior batches.
- Thorough testing is important, and errors during evaluations will be penalized.
- Consider edge cases and start early!

For more detailed information about the assignment requirements and specifications, please refer to the provided assignment document.
