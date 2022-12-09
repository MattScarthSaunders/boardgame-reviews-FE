# Boardgame Reviews - React FrontEnd project

Deployed site link: https://bg-reviews.netlify.app/

## About

This app is a project created to provide a front end for my northcoders back end project found here: https://github.com/MattScarthSaunders/boardgame-reviews.

The app seeks to provide users the ability to leave reviews for boardgames they have played and interact with other users by commenting and voting on their reviews.

## Run locally

Requires node v19.0.0 to run locally.

Choose a directory, then run:

    git clone https://github.com/MattScarthSaunders/boardgame-reviews-FE

Then navigate into the new repo:

    cd boardgame-reviews-FE

Install dependencies (may take a moment):

    npm install

Run locally:

    npm start

## How to use

### General Navigation

You can navigate the site using the home and categories selectors at the top of the screen, and see the visitor profile page by clicking on their profile selector. You can also get back to the home page by clicking on the 'Boardgame Reviews' title. There is a darkmode selector which works site-wide in the top-right, which toggles between two modes. On the pages, the buttons are descriptive so that it's straightforward to navigate. The site is responsive, so is usable on both mobile and desktop and has slightly different layouts depending on which you are using.

### Review List

The home page is a general list of all boardgame reviews currently present in the backend database, which can be filtered by various categores and sorted ascending/descending. It is also paginated, so you can select the number of reviews seen on the page and navigate between the pages.

This list is populated by review 'cards' which have some basic information about the poster and the review. You can see more information about the posting user by clicking on their name, which will take you to their profile page, or navigate to the review by clicking on the 'see review' button.

You can further filter this set of reviews by using the categories dropdown menu in the header of the app, which will redirect to a new shareable url with the name of the category. This new page will only present reviews of that category, which you can sort and order as before. To get back to the full list, use the home button.

### Individual Review

To see an individual review, click on the 'see review' button on a review card on the main list. This will redirect you to a review page. Here you can see various information about the boardgame and the username of the reviewer (which is also a link to their profile).

You can vote up or down on the review, which uses 'reddit-style' voting: you can vote up or down, you can deselect your vote by reclicking it, or you can switch your vote by clicking on the other vote button.

You can leave comments on the review and see other user comments. These comments can be voted on in the same way as the review, and you can click on the username of the commenter. As a visitor, you can delete visitor-user comments as it is a shared public profile.

### Adding a review

From the main page, you can click 'share your review' to be redirected to a submission form. Fill this out to add a review to the site! Once it has successfully submitted, you will be shown a preview of the review. These reviews will then be visible on the main page, and on the visitor profile page.

You can delete these reviews in the same way as the comments if you change your mind. The form does not reset so if you aren't happy with your review, you can delete it and make a new one.

### Visitor profile

The profile pages for the users display their username, avatar and any reviews they have left in the same manner that they're displayed on the same page. You can navigate to those reviews from their profile page, too.

## Endpoints

The current endpoints on the site are:

Home/reviews

    '/'

Categories (parametric)

    '/:category'

Individual reviews (parametric)

    '/reviews/:review_id

Add a review

    '/reviews/add-review'

User profile (parametric)

    '/users/:username

## Error handling

There is currently error handling for both 500 server errors (i.e the server has an issue) and 400 errors (where the database cannot find what you're trying to get, for example a non-existent category). There is also form validation so that you can't submit an empty comment or review.

## Future functionality

In future I intend to add a basic user login so that visitors can log in as themselves, although this would not include authentication or passwords as I will not be maintaining security for the site - only reseeding the database or deleting individual items if any malicious comments/reviews occur.

I would also like to add an edit feature so that users can edit their own reviews/comments after they are posted and not have to delete/repost to fix their mistakes.
