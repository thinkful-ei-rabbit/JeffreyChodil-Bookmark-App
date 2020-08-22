Bookmarking App to track favorite sites.

COMPLETED USER STORIES
2. I can see a list of my bookmarks when I first open the app
5. I receive appropriate feedback when I cannot submit a bookmark

USER STORIES TO COMPLETE
1. I can add bookmarks to my bookmark list. Bookmarks contain:
title
url link
description
rating (1-5)
All bookmarks in the list default to a condensed view showing only title and rating
3. I can click on a bookmark to display the detailed view, wich expands to additionally display description and a Visit Site link
4. I can remove bookmarks from my bookmark list
6. I can select from a dropdown a "minimum rating" to filter the list by all bookmarks rated at or above the chosen selection

This project was going well. I was developing a mirror "local" version to help troubleshoot along the way. I noticed some differences in functionality in the "local" version and this current version utilizing API, despite the code being virtually identical. One of the main issues which derailed my progress was event listeners. It seems that when the HTML code is rendered and re-rendered to the DOM, the event listeners do not "reset" to "listen" again. If the event listeners target elements on the index.html, the event listeners are able to be repeatedly called. I have been unable to locate the problem in the rendering process which is preventing the event listeners from functioning properly.