# QUOTED

Quoted is a platform where people can share and upload their favorite quotes with others!

## Introduction

Developing this project has been an incredibly enjoyable experience, and it provided the perfect opportunity for me to step slightly outside of my comfort zone and grow as a developer. As my first full-stack project, I encountered a few challenges, particularly with user authentication and managing data in the database. Fortunately, leveraging Firebase made these tasks relatively straightforward to resolve and implement. This project has given me a better understanding of how the front-end interacts with the back-end, and I am excited to delve into more full-stack projects in the future.

## Project Overview

At its core, this project allows non-registered users to view existing posts but restricts them from interacting with or creating their own posts. Users must sign up to create and interact with posts. Additionally, users have the ability to modify their basic information, such as their username and profile picture.

### Technologies used

* Next.js
* Firebase
* TailwindCSS

## Personal Notes

First and foremost, I would like to express my gratitude to Tapply! for selecting me as a candidate for this incredible opportunity. I apologize for the slight delay in my response to the email, which resulted in a few days being cut short.

I designed the project with a mobile-first approach to ensure responsiveness on desktop as well. My aim was to fulfill all the required features and even went beyond by implementing the bonus goal of allowing users to like and unlike posts!

While I wish I had more time to fine-tune the CSS and overall layout of the project, I believe I managed to infuse it with my own personal touch.

Given more time, I would dedicate a solid day or two to completely refactor my code. I am aware that it is not as optimal as I would have liked. I unintentionally confined myself by having all the user authentication (and other) functions in my AuthContext file and importing them using useContext. Although certain functions are only utilized within specific components, I understand that they should either be separate utilities or contained within the respective components themselves. Some of the changes I would make include creating separate utility functions to handle user-related actions such as creating a new user, signing out, logging in, and managing posts, among others. These are aspects I am actively aware of and will continue to work on and refactor in this project.

As someone who comes from a non-traditional background and is striving to enter the tech industry, I am truly honored to have the opportunity to potentially secure a future internship role. This was my first experience working with Next.js, and I often find myself overly focused on mastering best practices, which, in this case, slowed me down while figuring out the optimal project structure and general optimization. Eventually, I shifted my focus to ensuring the functionality of the project.

