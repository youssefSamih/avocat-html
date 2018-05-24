# GULP STARTER

A Fleet Management System (FMS)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

*You can avoid installing dependencies and all stuff by going under  ***dist*** folder and open the ***index.html*** file to view content.*

**But if you want to edit files you should follow instructions below**
### Prerequisites

What things you need to install the software and how to install them.

##### 1 - Install Node JS using the link below:
```
 https://www.npmjs.com/get-npm
```
##### 2 - Install Gulp JS using the link below:
```
https://gulpjs.com/
```


### Installing

A step by step series of examples that tell you have to get a development env running

##### 1 - Clone repository using:

```
git clone  https://git.smile.fr/smile-maroc-montage/GulpStarter.git
```

##### 2 - Go to directory path:

```
cd EuroQuity
```

##### 3 - Install dependencies using:

```
npm install
```

##### 4 - Run / Serve App using:

```
gulp
```

## Generating components *(NEW)*
### 1 - JS FILES

## Built With

* [GulpJS](https://gulpjs.com/) - Workflow Automation
    * [GULP TWIG](/) - HTML BUILD
    * [CSS LINTER]() - CSS validator
    * [AUTOP REFIXER]() - Adding prefixes to some CSS attributes (CrossBrowserSupport) 
    * [BROWSER SYNC]() - Auto refresh content while making changes on HTML, CSS, JS files from ***App*** folder
    * [JS HINT]() - JS validator
* [TWIG](https://gulpjs.com/) - Workflow Automation
* [Bootstrap 4](https://getbootstrap.com/docs/4.1/getting-started/introduction/) - Toolkit HTML, CSS, JS developpement based on FlexBox
* [jQuery](https://jquery.com) - Javascript Library
* [jQuery Valdiate](https://jqueryvalidation.org/) - Javascript Form validate Library
* [Fancybox 3](https://www.fancyapps.com/fancybox/3/) - JavaScript lightbox library for presenting various types of media
* [AcimateCSS](https://daneden.github.io/animate.css/) - Animations
* [OwlCarousel 2](https://owlcarousel2.github.io/OwlCarousel2/) - Carousel sliders
* [Scroll reveal](https://scrollrevealjs.org/) - Easy scroll animations for web and mobile browsers.

## How it works
##### 1 - JS FILES
File ***app/js/custom/scripts.js*** is the entry point of all js calls, open file and you can see :
```
 ICN.init.init();
```
*which **ICN** is the namespace used to call all JS customs scripts*

***1.1 - ADD / EDIT***

To **ADD / EDIT** a JS script, go under ***app/js/fragments*** create or edit your scripts

***1.2 - CREATE NEW SCRIPT***

To create a new JS files you mus do as following: 
```
ICN.init = {
  first: function () {
    console.log('first');
  },
  second: function () {
    console.log('second');
  }
};
```

***1.3 - CALLING METHODS***

 To call a created custom script do as following:
```
 Ex : ICN.init.first();
```
##### 2 - SCSS FILES
***2.1 - app/scss/vendor*** :  Contains all third-Party libraries (Bootstrap, fancybox, animate, etc...) Styles.

***2.2 - app/scss/includes/configs*** :  Contains all config files (varibales, mediaqueries, colors, mixins, fonts , etc...) Styles.

***2.3 - app/scss/includes/elements*** :  Contains all default elements (Inputs, Buttons, Texts, checkboxes, etc ...  default styles) Styles.

***2.4 - app/scss/includes/fragments*** :  Contains all custom fragments Styles.

***2.5 - app/scss/includes/lames*** :  Contains all custom lames Styles.

***2.6 - app/scss/includes/layout*** :  Contains footer, header Styles.


##### 3 - HTML FILES
***3.1 - app/views/fragments*** :  Contains all Custom HTML blocks.

***3.2 - app/views/lames*** :  Contains all Custom HTML lames.

***3.3 - app/views/layout*** :  Contains globl pages layout : skeleton, header & footer .

***3.4 - app/views/pages*** :  Contains all pages where we include our custom blocs.

## Authors

* **Tarik HADDADI**  - *FrontEnd Dev* - [TarikHaddadi](https://git.smile.fr/tahad)
* **Mossaab KANZIT** - *FrontEnd Dev* - [MossabKanzit](https://git.smile.fr/mokan)
