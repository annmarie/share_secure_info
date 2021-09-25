## ROADMAP

### PRODUCT
* User friendly URLs
* add a "do you want to create another secret?" button to the retrival page.
* Ability to create another secret after the "Your secret is ready to share" confirmation page.
* Support text formatting on the opened URL/shared secret message page (e.g. in instructions if secret creator wrote 1, 2, 3 and pressed enter for it to be read in list format, when the secret message is opened, it can be read in list format)

### TECHNICAL
* Secret keys need to be encrypted before passing to the user.
* Randomize the key names for data storing.
* Add more tests.
* There is an issue in develoment mode where the styles break and you have to restart.
* Upgrade fetch to axios.
* HTML page rendering is a mess.  We render the full page in two different fuctions. MUI is not setup correct.