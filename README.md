# MusicHead

  MusicHead is an application based on youtube iframe api and facebook api wrote in javascript framework Angular JS v. 1.5.3.
Main goal was to create personalized music site with clips requested from Youtube. Application has two approaches, with or without
using Facebook. You can write your favourite artists in input, or log in with Facebook, to get your last 25 music artists that you liked.

[<h2>DEMO</h2>](http://bobicgit.github.io/MusicHead/)

Basically app features are the same for both approaches:
  - clips are selected by shuffle, so there always will be different queue of them,
  - you can only controll youtube iframe player via my html controlls, which are displayed in navbar,
  - dynamically changes progress bar, timer and songs title above player,
  - dynamically created buttons links with artists that you wrote, or your artist from FB,
  - rooting based on what artist you want to listen,
  - under player there is a list of all fetched clips of all artists or specific artist.
  
Only one feature is different and depends on the Facebook login status. If you are not logged, you can create a playlists and add to
them your favourite artists. This feature was written by Beata Wolska.

I didnt provide facebook privacy policy to my application, so i can not fetch logged user likes in order to generate playlist.
Unfortunately no one will be able to use my application via Facebook.
  
To launch MusicHead on local host please use following console commands:

- git clone (+ repository URL),
- npm install,
- bower install,
- gulp serve.

Testing : project contains some unit and e2e tests.

- to start unit tests type in "gulp test",
- to start e2e tests type in "gulp protractor".

	
	
