# Browser Technologies @cmda-minor-web 20-21

Bij het van Browser Technologies heb ik geleerd over progressive enhancement en hoe ik een robuuste, toegankelijk website maak. Waarbij de gebruiker de core functies kan doen.

## inhoudsopgave
- [Use Case 🤓](#use-case-)
- [De Demo 🕸](#de-demo---nerdy-shirt-maker-)
    - [Core functionaliteiten 📋](#core-functionaliteiten-)
    - [features in Demo ✨](#features-in-demo-)
    - [Wireflow 💻](#wireflow-)
- [3 lagen 🍰](#de-3-lagen-)
    - [Functional/reliable layer](#functionalreliable-layer)
    - [Usable layer](#usable-layer)
    - [The pleasurable layer](#the-pleasurable-layer)
- [Feature Detection 🕵🏼‍♀️](#feature-detection-%EF%B8%8F)
    - [T-shirt updaten 👚](#t-shirt-updaten-)
    - [LocalStorage 📀](#localstorage-)
- [Conclusie](#conclusie)
- [Testen in browser 🌐](#testen-in-4-browsers-)
- [Tools  🔨](#gebruikte-tools-om-te-testen--)
- [Bronnen 📚](#sources-)

# Use case 🤓: 
**Nerdy T-shirt**

*Ik wil mijn eigen t-shirt-met-nerdy-tekst kunnen ontwerpen, opslaan, bestellen, en een volgende keer dat ik de site bezoek kunnen gebruiken.*

# De demo - Nerdy Shirt maker 👚
[Live demo](https://nerdy-shirt-maker.herokuapp.com/)

![](https://user-images.githubusercontent.com/60745348/113047231-5bbff100-91a1-11eb-9835-24baa17f7770.png)

<!-- [Rubric](https://docs.google.com/spreadsheets/d/1MV3BWwwg_Zz1n-S_qOM4iSm4gA4M6g0xAxGacyaPuac/) -->

## Core-Functionaliteiten 📋
- Shirt kunnen ontwerpen (via form)
- bestellen van ontworpen shirt
- checken of ontworpen shirt goed is

## features in Demo ✨
- Live updaten t-shirt wanneer gebruiker shirt ontwerpt
- Localstorage - bij refreshen of later terug komen form nog steeds ingevuld
- Data opslaan in een JSON file en ophalen op server
- Form validatie
- Afbeeldingen op shirt

## Wireflow 💻
![](https://user-images.githubusercontent.com/60745348/112509718-05ae1080-8d91-11eb-8ca9-c49333c56346.png)

Bekijk [eerste versie](https://github.com/sanneduinkerx/browser-technologies-2021/wiki/Eindopdracht#wireflow)
<!-- versie 1: -->
<!-- ![](https://user-images.githubusercontent.com/60745348/111474931-db26dc80-872c-11eb-9f19-ab32c5bdaf95.png)
![](https://user-images.githubusercontent.com/60745348/111474937-dcf0a000-872c-11eb-9f03-f007e03bcb08.png) -->

# De 3 lagen 🍰

## Functional/reliable layer
Deze laag bevat de core functionaliteiten en moet op alle browsers bereikt kunnen worden. De HTML paginas zijn te serveren op alle browser pagina's. De reliable layer bevat de html forms en de data op de server. De gebruiker kan het formulier invullen en aangeven hoe hij/zij het ontworpen shirt eruit wilt laten zien. Daarna bij de bestelpagina kan de gebruiker dan checken of het shirt goed is en zo niet, kan de gebruiker terug om dit aan te passen. Wanneer gebruiker klaar is met het invullen van een formulier en dit verstuurt wordt de data opgeslagen in een JSON file om later weer te gebruiken bij de bestelpagina. 

Op deze laag kan de gebruiker dus het shirt ontwerpen via een formulier, checken van het shirt en bestellen, de belangrijkste functies. En dit is allemaal mogelijk alleen met html. Waarbij ook wordt aangegeven wanneer iets niet is ingevuld met express-validator op server side.

![](https://user-images.githubusercontent.com/60745348/113032890-aedd7800-9190-11eb-80ef-072da64794f2.png)

## Usable layer
Deze laag verbeterd de gebruikerservaring, maakt het fijner voor de gebruiker om de website te gebruiken en voegt de smaak toe aan de demo.
Bij deze laag is het een stuk beter om naar het ontwerp te kijken. Door styling van het formulier en opfleuren van de webpagine ziet het er minder uit als een formulier, en is het voor de gebruiker fijner te gebruiken. Ik heb goed gedacht aan principle: appearance follows behaviour, bij de buttons. Ook heb ik states toegepast dus als de gebruiker hovert over een afbeelding dan wordt dat groter en als je focust op de input text wordt de border dikker. 

![](https://user-images.githubusercontent.com/60745348/113050361-08e83880-91a5-11eb-86c3-e21366ae3c65.png)

## The pleasurable layer
Dit is de kers op de taart, dit maakt de ervaring een geheel voor de gebruiker. Bij deze laag ziet de gebruiker wanneer hij/zij keuzes maakt over zijn/haar ontwerp meteen de veranderingen bij het shirt. Daarnaast maak ik gebruik van localStorage dus als de gebruiker even weggaat of de pagina refreshed of bijvoorbeeld een stap terug gaat is het formulier nog ingevuld en scheelt dit tijd voor de gebruiker. 

![](https://user-images.githubusercontent.com/60745348/113050366-0ab1fc00-91a5-11eb-855b-c96a9d39167a.png)

# Feature Detection 🕵🏼‍♀️

## T-shirt updaten 👚

Wanneer de Javascript niet werkt of de gebruiker heeft dit zelf uitgezet dan werkt het live updaten niet, wanneer dit gebeurt wordt de svg niet getoont aan de gebruiker waar de updates gebeuren, en ervaart de gebruiker deze pleasurable laag niet. Omdat de svg dan niet getoont wordt weet de gebruiker ook niet wat hij/zij mist en kan daarnaast alsnog de belangrijkste functies behalen. Gebruiker ziet nog steeds bij de bestelpagina hoe zijn ontwerp eruit ziet, maar mist alleen de extra ervaring.

## LocalStorage 📀

Het kan dus zijn dat een gebruiker cookies uit heeft staan dan werkt de localstorage niet.
Voor localstorage heb ik de volgende code gebruikt om te testen of de gebruiker localStorage beschikbaar heeft:
Dit stukje code heb ik gevonden via: [https://stackoverflow.com/questions/16427636/check-if-localstorage-is-available](https://stackoverflow.com/questions/16427636/check-if-localstorage-is-available)
Ik gebruikte namelijk eerst if(typeof(Storage) !== "undefined"), maar dit werktte niet goed.

```
    function localStorageDetection(){
        const test = 'test';
        try {
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch(e) {
            return false;
        } 
    }

    // if localstorage detection is true, from the test above it executes this otherwise it doesnt do anything
    if(localStorageDetection() === true){
        // code om localstorage te gebruiken
    } else {
        //niks doen
    }

```

Wat hierboven gebeurt is een test en gaat kijken of js iets kan toevoegen aan de localstorage zo ja, dan is de test True, als dat niet zo is en het failed dan geeft hij false terug en gaat er niks gebeuren.

![](https://user-images.githubusercontent.com/60745348/113051294-1d790080-91a6-11eb-9bab-6df71bdabf3e.png)

Het is mooi meegenomen als de localstorage bij gebruiker werkt, omdat je dan later terug kan komen of als je per ongeluk refreshed is de data er nog steeds. Staat het wel uit dan mist de gebruiker deze ervaring, maar dat is niet heel erg omdat het geen hele lange formulieren zijn en de gebruiker kan nog steeds ontwerpen en bestellen, want de data wordt ook opgeslagen in een JSON file.

# Testen in 4 browsers 🌐

- Chrome - laptop [zie test](https://github.com/sanneduinkerx/browser-technologies-2021/wiki/Testen-Chrome---Laptop-%7C-macbook-pro)
- firefox - laptop [zie test](https://github.com/sanneduinkerx/browser-technologies-2021/wiki/Testen-firefox---laptop-macbook-pro)
- Chrome - Android telefoon [zie test](https://github.com/sanneduinkerx/browser-technologies-2021/wiki/Testen:-Chrome-Android---Pixel)
- Safari IOS - Iphone 7 [zie test](https://github.com/sanneduinkerx/browser-technologies-2021/wiki/Testen:-safari-IOS---iphone-7)

# Conclusie
Ik heb veel geleerd binnen dit vak over het opbouwen in lagen en de manier van denken. Normaal gesproken begon ik meteen en ik heb meestal alleen chrome open om te checken of het werkt of niet maar nooit veel andere browsers om te testen. Ik ga er zelf vanuit dat iedereen wel chrome gebruikt maar dat is natuurlijk niet zo. Ik ben gewend geraakt goed te checken of iets op een bepaalde browser werkt of niet en met feature detection dus eerst te checken en een fallback als iets niet werkt. Ik checkte dus ook veel met het uitzetten van js of de functies nog werkte en bijvoorbeeld als de afbeeldingen uitstaan dat het wel duidelijk is wat er hoort te staan met alt text. Daarnaast checkte ik dus ook meer met toetsenbord en kwam daar dus ook tegen dingen aan die ik snel fix. 

Deze manier van werken was nieuw voor mij en om een website toegankelijk te maken voor iedereen is dit een fascinerende manier om een website op te bouwen met lagen. Ik bleef ook steeds in mijn hoofd met of de belangrijkste functies werken zodat als iets wegvalt dat nog werkt en dat geeft je wel meer zekerheid binnen een gebouwde website.

## Gebruikte tools om te testen  🔨
- De site [caniuse.com](https://caniuse.com/)
    om te checken wat voor features support zijn op welke browsers
- Web developer via extensions,
    voor het uit en aanzetten van css en js (zie de 3 lagen voor resultaat)
    checken wanneer afbeeldingen uit staan 
    cookies uitzetten 
- [validator w3](validator.w3.or) - HTML validator 

# Sources 📚
- Server side, express node - [Developer Mozilla](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/forms)
- Data in JSON File - [YouTube, The Coding Train](https://www.youtube.com/watch?v=6iZiqQZBQJY)
- Express validator -[Raddy The Brand](https://raddy.co.uk/blog/node-js-form-validation-using-express-validator-and-ejs/)
- Check if localstorage is available - [stackoverflow](https://stackoverflow.com/questions/16427636/check-if-localstorage-is-available)
- How to Structure a web form - [Developer Mozilla](https://developer.mozilla.org/nl/docs/Learn/Forms/How_to_structure_a_web_form)
- How to start a node server? - [stackabuse](https://stackabuse.com/how-to-start-a-node-server-examples-with-the-most-popular-frameworks/?)
- Can i use conditional statements with ejs - [stackoverlow](https://stackoverflow.com/questions/8216918/can-i-use-conditional-statements-with-ejs-templates-in-jmvc)
- How to create html burron that acts like a link[stackoverflow](https://stackoverflow.com/questions/2906582/how-to-create-an-html-button-that-acts-like-a-link)

<!-- Add a link to your live demo in Github Pages 🌐-->

<!-- ☝️ replace this description with a description of your own work -->

<!-- replace the code in the /docs folder with your own, so you can showcase your work with GitHub Pages 🌍 -->

<!-- Add a nice poster image here at the end of the week, showing off your shiny frontend 📸 -->

<!-- Maybe a table of contents here? 📚 -->

<!-- How about a section that describes how to install this project? 🤓 -->

<!-- ...but how does one use this project? What are its features 🤔 -->

<!-- Maybe a checklist of done stuff and stuff still on your wishlist? ✅ -->

<!-- How about a license here? 📜 (or is it a licence?) 🤷 -->
